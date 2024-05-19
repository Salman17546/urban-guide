def set_spotify_genres(request, genres):
    request.session['genres'] = list(genres)

def get_spotify_genres(request):
    return request.session.get('genres', [])

def get_detailed_genres(genres):
    genre_mapping = {'pop': ['pop', 'dance pop', 'pop dance'],
    'house': ['house', 'uk house', 'deep groove house', 'disco house'],
    'disco': ['nu disco', 'uk dance', 'classic house', 'disco house','vocal house'],
    'edm': ['edm', 'electro house', 'progressive house', 'big room','pop dance','dance pop'],
    'afro house' : ['afro house', 'south african house', 'south african pop'  'south african pop dance'],
    'tech house': ['tech house'],
    'techno': ['techno', 'minimal techno','acid techno',
            'belgian techno', 'dark techno', 'electra',
            'italian techno', 'raw techno', 'german techno',
            'danish techno', 'french techno', 'spanish techno',
            'hardcore techno'],
    
# Add more mappings here
}   
    detailed_genres = []
    for genre in genres:
        if genre in genre_mapping:
            detailed_genres.extend(genre_mapping[genre])
        else:
            detailed_genres.append(genre)
    return detailed_genres

def set_spotify_artists(request, artists):
    request.session['artists'] = artists

def get_spotify_artists(request):
    return request.session.get('artists', [])