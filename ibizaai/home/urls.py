from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path("get-details",views.UserDetailAPI.as_view()),
    path('register',views.RegisterUserAPIView.as_view()),
    path('delete-user/', views.DeleteUserView.as_view(), name='delete_user'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    path('password-reset/', views.password_reset_request, name='password_reset_request'),
    path('password-reset-confirm/<str:uidb64>/<str:token>/', views.password_reset_confirm, name='password_reset_confirm'),
    path('spotifyauth/', views.getSpotifyUserAuth2),
    path('callbackSpotifyAuth/', views.spotifyAuthCallback),
    path("getspotifygenres/",views.getSpotifyGenres),
    path('party-recommendation/', views.party_recommendation_view, name='party_recommendation'),
    path('save-search/', views.save_search_view, name='save_search'),
    path('get-save-search/', views.get_saved_searches_view, name='get_save_search'),
    path('artists/',views.artists_all),
    path('genres/',views.genre_all),
]
