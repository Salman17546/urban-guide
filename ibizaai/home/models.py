from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import  AbstractUser
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# class CustomUser(AbstractUser):
class CustomUser(AbstractUser):
    email                   = models.EmailField(max_length = 254,unique=True,blank=False,null=False)
    spotify_connection = models.BooleanField(default=False)
    first_name              = models.CharField(max_length=100,blank=True,null=True)
    last_name               = models.CharField(max_length=100,blank=True,null=True)

class SpotifyToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=500,default='')
    refresh_token = models.CharField(max_length=500, null=True, blank=True)
    expires_in = models.IntegerField(default=3600)
    created_at = models.DateTimeField()
    def __str__(self) -> str:
         return f"{self.id} ---- Token: {self.access_token} ---- User: {self.user}"
class Genre(models.Model):
    name                    = models.CharField(max_length=300)
    def __str__(self) -> str:
        return f"{self.id} ---- Name: {self.name}"
class UserGenre(models.Model):
    userId                    = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    genreId                   = models.ForeignKey("Genre",on_delete=models.CASCADE)
    def __str__(self) -> str:
        return f"{self.id} ---- User: {self.userId} ---- Genre: ( {self.genreId} )"
class FavoriteArtist(models.Model):
    userId                    = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    artistId                   = models.ForeignKey("Artist",on_delete=models.CASCADE)
    def __str__(self) -> str:
        return f"{self.id} ---- User: {self.userId} ---- Artist: ( {self.artistId} )"
class Artist(models.Model):
    name                    = models.CharField(max_length=300)
    nameraw                 = models.CharField(max_length=300, blank=True)
    created                 = models.DateTimeField(default=now)
    def __str__(self) -> str:
        return f"{self.id} ---- Name: {self.name}"
    

class GenreArtist(models.Model):
    genreId                   = models.ForeignKey("Genre",on_delete= models.CASCADE)
    artistId                  = models.ForeignKey("Artist",on_delete=models.CASCADE)
    def __str__(self) -> str:
        return f"{self.id} ---- Genre: {self.genreId} ---- Artist: {self.artistId}"

class Venue(models.Model):
    name                    = models.CharField(max_length=300)

    def __str__(self) -> str:
        return f"{self.id} ---- Venue Name: {self.name}"

class Party(models.Model):
    name                    = models.CharField(max_length=300)
    date                    = models.DateField(default=now)
    startTime               = models.TimeField()
    endTime                 = models.TimeField(null=True,default=None)
    venueId                 = models.ForeignKey("Venue",on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.id} ---- Party Name: {self.name} ---- Venue: {self.venueId} ---- Date: {self.date}"

class PartyArtist(models.Model):
    partyId                   = models.ForeignKey("Party",on_delete=models.CASCADE)
    artistId                  = models.ForeignKey("Artist",on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.id} ---- Party: {self.partyId} ---- Artist: {self.artistId}"

class RecomendationSearch(models.Model):
    user                    = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    name                    = models.CharField(max_length=300,default=None)
    created                 = models.DateTimeField(default=now)

    def __str__(self) -> str:
        return f"{self.id} ---- User: {self.user}"

class RecomendationSearchParty(models.Model):
    party                   = models.ForeignKey("Party",on_delete=models.CASCADE)
    searchrecomendation     = models.ForeignKey("RecomendationSearch",on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.id} ---- Party: {self.party} ---- SearchRecomendation: {self.searchrecomendation}"

