import csv
import requests
from bs4 import BeautifulSoup
import time

# Load CSV
faculty_data = []
with open('khoury_faculty.csv', newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        faculty_data.append(row)

# Add email field by scraping Bio URL
for faculty in faculty_data:
    try:
        bio_url = faculty['Bio URL']
        response = requests.get(bio_url)
        if response.status_code != 200:
            print(f"Failed to load {bio_url}")
            continue

        soup = BeautifulSoup(response.text, 'html.parser')
        email_tag = soup.find('a', href=lambda x: x and x.startswith('mailto:'))

        email = email_tag.text.strip() if email_tag else "N/A"
        faculty['Email'] = email
        print(f"{faculty['Name']} -> {email}")

        time.sleep(1)  # Be polite: 1 second delay between requests
    except Exception as e:
        print(f"Error processing {faculty['Name']}: {e}")
        faculty['Email'] = "Error"

# Save updated CSV
with open('khoury_faculty_with_email.csv', 'w', newline='', encoding='utf-8') as f:
    fieldnames = list(faculty_data[0].keys())
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(faculty_data)

print("Updated CSV with emails saved as 'khoury_faculty_with_email.csv'.")
