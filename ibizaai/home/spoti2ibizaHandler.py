import pandas as pd
from collections import Counter

# Load and preprocess data
parties = pd.read_csv('Input Files/V2/IBIZA_Season_2024-v3.csv')
parties['genres'] = parties['genres'].fillna('')
parties['genres'] = parties['genres'].apply(lambda x: x.split(';'))
parties['Artists__c'] = parties['Artists__c'].fillna('')
parties['Artists__c'] = parties['Artists__c'].apply(lambda x: x.split(';'))


# Define the range of dates
start_date = '01/04/2024'
end_date = '30/10/2024'

# Convert the 'date' column to datetime format using the appropriate format
parties['Date'] = pd.to_datetime(parties['Date'], format='%Y/%m/%d')

# Filter the DataFrame by rows within the specified date range
parties = parties[(parties['Date'] >= start_date) & (parties['Date'] < end_date)]

artistCoefficient = 5
userGenreCoefficient = 2

# This is a mock function, replace this with actual call to Spotify API
def get_user_top_artists(user):
    return ['James Hype', 'Sam Divine', 'ARTBAT', 'CAMELPHAT', 'Black Coffee', 'Eric Prydz']

# Create a mapping of comprehensive genres to detailed genres
genre_mapping = {
    'pop': ['pop', 'dance pop', 'pop dance'],
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


# Modify the get_user_top_genres function to return detailed genres
def get_spotify_genres(user):
    user_genres = ['ukrainian electronic', 'uk house', 'deep groove house', 'house', 'pop dance', 'uk dance'
                   ,'south african house', 'south african pop', 'south african pop dance']
    return user_genres

def get_user_input_genres(user):
    user_genres = ['afro house', 'tech house', 'techno', 'house']  # replace this with actual user input
    detailed_genres = []
    for genre in user_genres:
        if genre in genre_mapping:
            detailed_genres.extend(genre_mapping[genre])
        else:
            detailed_genres.append(genre)
    return detailed_genres

# Calculate similarity scores
def calculate_similarity_score(spotify_genres, user_input_genres, user_artists, party_genres, party_artists):
    common_genres_spotify = Counter(spotify_genres) & Counter(party_genres)
    common_genres_user = Counter(user_input_genres) & Counter(party_genres)
    common_artists = Counter(user_artists) & Counter(party_artists)
    return sum(common_genres_spotify.values()) + artistCoefficient * sum(common_artists.values()) + userGenreCoefficient * sum(common_genres_user.values())  # Give twice importance to artists

# Get user's top genres
user = 'viteza'
spotify_genres = get_spotify_genres(user)
user_input_genres = get_user_input_genres(user)
user_artists = get_user_top_artists(user)
print(spotify_genres) 

# Calculate similarity score for each party
parties['similarity_score'] = parties.apply(lambda x: calculate_similarity_score(spotify_genres, user_input_genres, user_artists, x['genres'], x['Artists__c']), axis=1)

# Recommend top 5 parties
recommended_parties = parties.nlargest(10, 'similarity_score')

print(recommended_parties)

# Save the modified DataFrame back to Excel
recommended_parties.to_excel('Input Files/V2/IBIZA_Season_2024-v5-viteza.xlsx', index=False)
