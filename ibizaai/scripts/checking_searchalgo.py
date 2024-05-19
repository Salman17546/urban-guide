from home.models import *
from datetime import datetime
from collections import Counter

user = {
    'start_date': '2024-04-04',
    'end_date': '2024-05-23'
}
similarity_scores = {}
artistCoefficient = 5
userGenreCoefficient = 2


def party_recommendation(user):
    start_date = user['start_date']
    end_date = user['end_date']
    selected_artists = {'Groove Armada', 'DJ Policy', 'Ayrton Da Silva', 'Francis Mercier'}
    selected_genres = {'latin tech house', 'destroy techno', 'bristol electronic', 'classic progressive house'}
    # response = getUserSpotifyTopItems(token, type='artists', time_range='medium_term', limit=20)
    # topArtists = response.artists[]
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    end_date = datetime.strptime(end_date, '%Y-%m-%d')

    parties = Party.objects.filter(date__range=(start_date, end_date))

    party_artists = {}
    party_genres = {}
    for party in parties:
        party_artists[party.id] = set(PartyArtist.objects.filter(partyId=party.id).values_list('artistId', flat=True))
        party_genres[party.id] = set(GenreArtist.objects.filter(artistId__in=party_artists[party.id]).values_list('genreId', flat=True))

    for party in parties:
        #print(party_genres[party.id])
        common_genres_user = Counter(selected_genres) & Counter(Genre.objects.filter(id__in=party_genres[party.id]).values_list('name', flat=True))
        common_artists = Counter(selected_artists) & Counter(Artist.objects.filter(id__in=party_artists[party.id]).values_list('name', flat=True))
        similarity_scores[party.id] = artistCoefficient * sum(common_artists.values()) + userGenreCoefficient * sum(common_genres_user.values())

    sorted_parties = sorted(parties, key=lambda x: similarity_scores.get(x.id), reverse=True)
    return sorted_parties
def run():
     print("SearchAlgo")
run()
print(party_recommendation(user))
