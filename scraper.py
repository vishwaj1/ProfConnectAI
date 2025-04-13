import requests
from bs4 import BeautifulSoup
import csv
faculty_data = []
for i in range(1,7):
# URL of the faculty listing page (adjust for pagination if needed)
    if i==1:
        URL = f"https://www.khoury.northeastern.edu/people/?filters%5B%5D=locations%7C1072&filters%5B%5D=people_roles%7C928#meet-the-people"
    else:
        URL = f"https://www.khoury.northeastern.edu/people/page/{i}/?filters%5B%5D=locations%7C1072&filters%5B%5D=people_roles%7C928#meet-the-people"

    # Fetch and parse the page
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all person cards
    people = soup.find_all('li', class_='khoury-archive__card-list-item')

    # Prepare a list to hold extracted data
    

    # Loop through each person card
    for person in people:
        try:
            article = person.find('article')
            name_tag = article.find('h3').find('a')
            name = name_tag.text.strip()
            bio_url = name_tag['href']

            title = article.find('p', class_='standard-card__titles').text.strip()

            img_tag = article.find('img')
            image_url = img_tag['src'] if img_tag else None

            location_block = article.find('div', class_='toggle-dropdown__popup')
            location = location_block.find('li').text.strip() if location_block else "N/A"

            faculty_data.append({
                'Name': name,
                'Title': title,
                'Bio URL': bio_url,
                'Campus': location,
                'Image URL': image_url
            })
        except Exception as e:
            print(f"Error processing a card: {e}")

# Save to CSV
with open('khoury_faculty.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=faculty_data[0].keys())
    writer.writeheader()
    writer.writerows(faculty_data)
print(faculty_data)

print("Scraping complete. Data saved to 'khoury_faculty.csv'.")
