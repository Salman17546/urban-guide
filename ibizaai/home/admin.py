from django.contrib.auth.admin import UserAdmin
from .models import *
from django.contrib import admin
admin.site.register((
    # SpotifyToken,
                    Genre,
                    UserGenre,
                    FavoriteArtist,
                    Artist,
                    GenreArtist,
                    Venue,
                    Party,
                    PartyArtist,
                    RecomendationSearch,
                    RecomendationSearchParty,
                    SpotifyToken
                    ))


class CustomUserAdmin(UserAdmin):
    list_display = (
        'username', 'email', 'first_name', 'last_name', 'is_staff'
    )
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        })
    )

    add_fieldsets = (
        (None, {
            'fields': ('username', 'password1', 'password2')
        }),
        ('Personal info', {
            'fields': ('first_name', 'last_name', 'email')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined')
        })
    )

# Register the CustomUserAdmin
# admin.site.register(CustomUserAdmin)
admin.site.register(CustomUser, CustomUserAdmin)