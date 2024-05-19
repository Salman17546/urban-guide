from .models import  *
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.response import Response
from rest_framework import status
class UserSerializer(serializers.ModelSerializer):
     class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "username","email","spotify_connection"]
#Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs.get('email', None) is None:
            raise serializers.ValidationError({"email": "Email is required"})
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            # first_name=validated_data['first_name'],
            # last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class GenreSerial(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields ='__all__'

class SpotifyTokenSerial(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields ='__all__'

class UserGenreSerial(serializers.ModelSerializer):
    class Meta:
        model = UserGenre
        fields ='__all__'

class ArtistSerial(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields ='__all__'

class GenreAritstSerial(serializers.ModelSerializer):
    class Meta:
        model = GenreArtist
        fields ='__all__'


class PartyArtistSerial(serializers.ModelSerializer):
    class Meta:
        model = PartyArtist
        fields ='__all__'


class VenueSerial(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields ='__all__'


class PartySerializer(serializers.ModelSerializer):
    startTime = serializers.TimeField(format='%H:%M:%S')
    endTime = serializers.TimeField(format='%H:%M:%S', required=False, allow_null=True)
    venue = serializers.SerializerMethodField()

    class Meta:
        model = Party
        fields = ['id', 'name', 'date', 'startTime', 'endTime', 'venue']
    def get_venue(self, obj):
        return {
            'name': obj.venueId.name,

        }
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['date'] = instance.date.strftime('%Y-%m-%d')
        return data
    
class RecomendationSearchPartySerializer(serializers.ModelSerializer):
    party = PartySerializer()

    class Meta:
        model = RecomendationSearchParty
        fields = '__all__'

class RecomendationSearchSerializer(serializers.ModelSerializer):
    parties = serializers.SerializerMethodField()

    class Meta:
        model = RecomendationSearch
        fields = ['id', 'name', 'created', 'parties']

    def get_parties(self, obj):
        parties = RecomendationSearchParty.objects.filter(searchrecomendation=obj)
        return RecomendationSearchPartySerializer(parties, many=True).data
