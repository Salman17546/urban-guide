from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect,JsonResponse,QueryDict
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime,timedelta
from collections import Counter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view , authentication_classes , permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework import status,generics
from rest_framework.authentication import TokenAuthentication
from .models import *
from django.utils import timezone
from random import randint
from .serial import *
from django.shortcuts import redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str, force_bytes
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.urls import reverse
from dotenv import load_dotenv
from ibizaai import settings
load_dotenv()
from .utility import set_spotify_genres,get_spotify_genres,get_detailed_genres,set_spotify_artists,get_spotify_artists
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')

scope = "user-top-read user-read-email"
def has_spotify_token(request):
    user = request.user
    try:
        spotify_token = SpotifyToken.objects.get(user=user)
        return True
    except SpotifyToken.DoesNotExist:
        return False

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSpotifyUserAuth2(request):
  sp_auth = SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URI,
        show_dialog=True,
        scope=scope)
  if request.method == "GET": 
        if has_spotify_token(request):
            return spotifyAuthCallback(request)
        # This url will prompt you a Spotify login page, then redirect user to your /callback upon authorization
        redirect_url = sp_auth.get_authorize_url() # Note: You should parse this somehow. It may not be in a pretty format.
        return redirect(redirect_url)


#The callback function where user is redirected after authorization
def spotifyAuthCallback(request):
    sp_auth = SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URI,
        show_dialog=True,
        scope=scope
        )
    user = request.user 
    if not has_spotify_token(request):
        print("creating new spotify user model in callback")
        code = request.GET.get("code", "")
        token = sp_auth.get_access_token(code=code)
        access_token = token['access_token']
        refresh_token = token['refresh_token']
        expires_in = token['expires_in']
        spotify_token = SpotifyToken(
                user=user,
                access_token=access_token,
                refresh_token=refresh_token,
                expires_in=expires_in,
                created_at=timezone.now())
        spotify_token.save()
        user = CustomUser.objects.get(username=user)  # Fetch the user instance from the database
        user.spotify_connection = True
        user.save()
        
    else:
        # Refresh the current token
        print("Refreshing Token in callback")
        spotify_token = SpotifyToken.objects.get(user=user)
        created_at = spotify_token.created_at
        expires_in = spotify_token.expires_in
        expires_at = created_at + timedelta(seconds=expires_in)
        print(f"expires at:{expires_at}")
        print(f"time now{timezone.now()}")
        if expires_at < timezone.now():
            spotify_token = SpotifyToken.objects.get(user=request.user)
            token_info = sp_auth.refresh_access_token(spotify_token.refresh_token)
            spotify_token.access_token = token_info['access_token']
            spotify_token.expires_in = token_info['expires_in']
            spotify_token.refresh_token = token_info['refresh_token']
            spotify_token.created_at = timezone.now()
            print(token_info['access_token'],token_info['expires_in'],token_info['refresh_token'])
            spotify_token.save()
            return HttpResponseRedirect("http://localhost:8000/getspotifygenres")
    return HttpResponseRedirect('http://localhost:8000/getspotifygenres')



#Get User's Spotify Favorite Artists and Genres
@api_view(['GET'])
def getSpotifyGenres(request):
    sp_auth = SpotifyOAuth(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirect_uri=REDIRECT_URI,
        show_dialog=True,
        scope=scope
        )
    sp = spotipy.Spotify(auth_manager=sp_auth)
    try:
        top_artists = sp.current_user_top_artists(limit=20, offset=0, time_range='long_term')
        genres = set()
        artists = []
        for artist in top_artists['items']:
            genres.update(artist['genres'])
            artists.append(artist['name'])
        print("User's favorite genres:")
        for genre in genres:
            print(genre)
        print("User's favorite artists:")
        for artist in artists:
            print(artist)    
        set_spotify_genres(request, genres)
        set_spotify_artists(request, artists)
        return JsonResponse({
            'genres': list(genres),
            'artists': artists
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Pagination Classes
class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 1000  # Maximum number of items per page

class ArtistsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class GenresPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100



#Artist and Genre views
@api_view(['GET'])
def artists_all(request):
    search_query = request.query_params.get('search', '')
    snippet = Artist.objects.filter(Q(name__icontains=search_query))
    paginator = ArtistsPagination()
    result_page = paginator.paginate_queryset(snippet, request)
    serializer =  ArtistSerial(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
def genre_all(request):
    search_query = request.query_params.get('search', '')
    snippet = Genre.objects.filter(Q(name__icontains=search_query))
    paginator = GenresPagination()
    result_page = paginator.paginate_queryset(snippet, request)
    serializer =  GenreSerial(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)




#Main Heart of the App the Party Recommendation
@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def party_recommendation_view(request):
    data = json.loads(request.body)
    spotify_genres = get_spotify_genres(request)
    print(spotify_genres)
    selected_artists = data.get('selected_artists', [])
    selected_genres = data.get('selected_genres', [])
    # Extract IDs from selected artists
    selected_artist_ids = [artist['id'] for artist in selected_artists]
    # Extract IDs from selected genres
    selected_genre_ids = [genre['id'] for genre in selected_genres]
    # Extract Names from selected artists
    selected_artist_names = [artist['name'] for artist in selected_artists]
    # Extract Names from selected genres
    selected_genre_names = [genre['name'] for genre in selected_genres]
    detailed_genres = get_detailed_genres(selected_genre_names)
    detailed_genres_spotify = get_detailed_genres(spotify_genres)
    start_date = data.get('start_date', None)
    end_date = data.get('end_date', None)

    if start_date and end_date:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')

        parties = Party.objects.filter(date__range=(start_date, end_date))

        party_artists = {}
        party_genres = {}
        for party in parties:
            party_artists[party.id] = set(PartyArtist.objects.filter(partyId=party.id).values_list('artistId', flat=True))
            party_genres[party.id] = set(GenreArtist.objects.filter(artistId__in=party_artists[party.id]).values_list('genreId', flat=True))

        similarity_scores = {}
        artistCoefficient = 5
        userGenreCoefficient = 2
        for party in parties:
            party_genres_name = Genre.objects.filter(id__in=party_genres[party.id]).values_list('name', flat=True)
            common_genres_spotify = Counter(detailed_genres_spotify) & Counter(party_genres_name)
            common_genres_user = Counter(detailed_genres) & Counter(party_genres_name)
            common_artists = Counter(selected_artist_names) & Counter(Artist.objects.filter(id__in=party_artists[party.id]).values_list('name', flat=True))
            similarity_scores[party.id] = sum(common_genres_spotify.values()) + artistCoefficient * sum(common_artists.values()) + userGenreCoefficient * sum(common_genres_user.values())

        sorted_parties = sorted(parties, key=lambda x: similarity_scores.get(x.id, 0), reverse=True)
        party_serializer = PartySerializer(sorted_parties, many=True)
        # Store selected genres and artists in database
        user = request.user
        for genre_id in selected_genre_ids:
            genre = Genre.objects.get(id=genre_id)
            UserGenre.objects.get_or_create(userId=user, genreId=genre)

        for artist_id in selected_artist_ids:
            artist = Artist.objects.get(id=artist_id)
            FavoriteArtist.objects.get_or_create(userId=user, artistId=artist)
        
        return JsonResponse(party_serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid date range'}, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_search_view(request):
    user = request.user
    data = json.loads(request.body)
    search_name = data.get('search_name')
    selected_party_ids = data.get('selected_party_ids', [])

    if not search_name:
        return JsonResponse({'error': 'Search name is required'}, status=status.HTTP_400_BAD_REQUEST)

    recommendation_search = RecomendationSearch.objects.create(user=user,name=search_name,created=now())
    for party_id in selected_party_ids:
        party = Party.objects.get(id=party_id)
        RecomendationSearchParty.objects.create(party=party, searchrecomendation=recommendation_search)

    return JsonResponse({'message': 'Search saved successfully'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_saved_searches_view(request):
    user = request.user
    saved_searches = RecomendationSearch.objects.filter(user=user)
    serializer = RecomendationSearchSerializer(saved_searches, many=True)
    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

# Class based view to Get User Details using Token Authentication

class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request,*args,**kwargs):
        user = request.user
        serializer = UserSerializer(user)

        # Get Spotify genres from session
        spotify_genres = get_spotify_genres(request)
        spotify_artists = get_spotify_artists(request)
        # Add Spotify genres to the serializer data
        serializer_data = serializer.data
        serializer_data['spotify_genres'] = spotify_genres
        serializer_data['spotify_artists'] = spotify_artists

        return Response(serializer_data)


#Class based view to register user
class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = (AllowAny,)
  serializer_class = RegisterSerializer



#Reset Password Views
@api_view(['POST'])
def password_reset_request(request):
    email = request.data.get('email')
    user = CustomUser.objects.get(email=email)
    if user is not None:
        uid = urlsafe_base64_encode(force_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        # reset_link = request.build_absolute_uri(reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token}))
        reset_link = f"{settings.FRONTEND_URL}/reset-newpass/{uid}/{token}"
        mail_subject = 'Reset your password'
        message = render_to_string('reset_password_email.txt', {
            'user': user,
            'reset_link': reset_link,
        })
        send_mail(mail_subject, message, 'salman17546@gmail.com', [email])
        return JsonResponse({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
    else:
       return JsonResponse({'error': 'User Does Not Exist'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def password_reset_confirm(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        user = None

    if user is not None and PasswordResetTokenGenerator().check_token(user, token):
        new_password = request.data.get('new_password')
        user.set_password(new_password)
        user.save()
        return JsonResponse({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)




#Login View
class LoginAPIView(APIView):
    def post(self, request):
        username_or_email = request.data.get('username_or_email')
        password = request.data.get('password')
        user = authenticate(request, username=username_or_email, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': token.key})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


#Delete User Button
class DeleteUserView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        user = request.user
        password = request.data.get('password')

        if not password:
            return JsonResponse({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user with the provided password
        user = authenticate(username=user.username, password=password)

        if user is not None:
            try:
                custom_user = CustomUser.objects.get(username=user.username)
                custom_user.delete()
                return JsonResponse({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except CustomUser.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return JsonResponse({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)



#Change Password Button
class ChangePasswordView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        user = CustomUser.objects.get(username=request.user)
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        confirm_new_password = request.data.get('confirm_new_password')

        if not user.check_password(old_password):
            return JsonResponse({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_new_password:
            return JsonResponse({"error": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        if old_password == new_password:
            return JsonResponse({"error": "New password cannot be the same as the old password"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
