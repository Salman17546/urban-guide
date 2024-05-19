import csv
from datetime import datetime
from home.models import Party, Venue
def import_genres(file_path):
    with open(file_path, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            venue_id = int(row['venueId'])  # Assuming venueId is an integer
            venue = Venue.objects.get(pk=venue_id)  # Retrieve Venue instance
            end_time_str = row['endTime']
            end_time = datetime.strptime(end_time_str, "%H:%M").time() if end_time_str else None
            Party.objects.create(
                name=row['name'],
                date=datetime.strptime(row['date'], "%m/%d/%Y").date(),
                startTime=datetime.strptime(row['startTime'], "%H:%M").time(),
                endTime=end_time,
                venueId=venue,
            )
def run():
    print("Running the importer")
csv_file_path = "D:\C Drive Folders\Desktop\Salman Files\Software Freelancing\Fiverr Django Project\Backend\V1\ibizaai\Parties.csv"  # Replace with your actual file path
import_genres(csv_file_path)
run()


#  