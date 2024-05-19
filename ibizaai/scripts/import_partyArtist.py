import csv
from datetime import datetime
from home.models import Artist, Party, PartyArtist
def import_genres(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            artist_id = int(row['artistId_id'])  # Assuming artistId is an integer
            artist = Artist.objects.get(pk=artist_id)  # Retrieve Artist instance
            party_id = int(row['partyId_id'])  # Assuming partyId is an integer
            party = Party.objects.get(pk=party_id)  # Retrieve Party instance
            PartyArtist.objects.create(
                partyId = party,
                artistId=artist,
                
            )
def run():
    print("Running the importer")
csv_file_path = "D:\C Drive Folders\Desktop\Salman Files\Software Freelancing\Fiverr Django Project\Backend\V1\ibizaai\PartyArtists.csv"  # Replace with your actual file path
import_genres(csv_file_path)
run()


#  