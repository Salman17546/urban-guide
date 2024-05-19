import csv
from datetime import datetime
from home.models import Genre
def import_genres(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            Genre.objects.create(
                name=row['name'],
            )
def run():
    print("Running the importer")
csv_file_path = "D:\C Drive Folders\Desktop\Salman Files\Software Freelancing\Fiverr Django Project\Backend\V1\ibizaai\Genres.csv"  # Replace with your actual file path
import_genres(csv_file_path)
run()


#  