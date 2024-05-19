import csv
from datetime import datetime
from home.models import Artist, Genre, GenreArtist
def import_genres(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            artist_id = int(row['artistId'])  # Assuming artistId is an integer
            artist = Artist.objects.get(pk=artist_id)  # Retrieve Artist instance
            genre_id = int(row['genreId'])  # Assuming genreId is an integer
            genre = Genre.objects.get(pk=genre_id)  # Retrieve Genre instance
            GenreArtist.objects.create(
                artistId=artist,
                genreId = genre,
            )
def run():
    print("Running the importer")
csv_file_path = "D:\C Drive Folders\Desktop\Salman Files\Software Freelancing\Fiverr Django Project\Backend\V1\ibizaai\GenreArtist.csv"  # Replace with your actual file path
import_genres(csv_file_path)
run()


#  