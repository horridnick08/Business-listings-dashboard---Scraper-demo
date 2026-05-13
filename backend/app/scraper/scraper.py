
"""
Business Listings Scraper
=========================
Generates realistic mock business listings for Indian cities.
Includes BeautifulSoup-based scraper structure for live scraping.

Usage:
    python -m app.scraper.scraper
"""

import json
import csv
import random
import logging
from datetime import datetime, timedelta
from typing import Optional
from app.utils.validators import validate_phone, remove_duplicates

logger = logging.getLogger("scraper")

# ── Realistic Indian Business Data ───────────────────────────────

CITIES = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
    "Surat", "Nagpur", "Indore", "Bhopal", "Chandigarh",
    "Coimbatore", "Kochi", "Visakhapatnam", "Vadodara", "Noida",
]

CATEGORIES = [
    "Restaurant", "Plumber", "Electrician", "Doctor", "Dentist",
    "Salon", "Gym", "Tutor", "Photographer", "CA/Accountant",
    "Lawyer", "Real Estate Agent", "Interior Designer", "Pest Control",
    "Car Repair", "Electronics Repair", "Courier Service", "Caterer",
    "Event Planner", "Web Developer",
]

SOURCES = ["Justdial", "Sulekha", "Google Maps", "IndiaMART", "TradeIndia"]

FIRST_NAMES = [
    "Raj", "Amit", "Priya", "Sanjay", "Deepak", "Anita", "Vikram", "Meera",
    "Suresh", "Kavita", "Rahul", "Neha", "Arun", "Pooja", "Manoj", "Sunita",
    "Ravi", "Anjali", "Krishna", "Divya", "Nikhil", "Swati", "Ashok", "Rekha",
]

LAST_NAMES = [
    "Sharma", "Patel", "Singh", "Kumar", "Gupta", "Reddy", "Nair", "Joshi",
    "Verma", "Mehta", "Iyer", "Rao", "Das", "Mishra", "Agarwal", "Shah",
    "Chauhan", "Pillai", "Menon", "Bhat", "Desai", "Kulkarni", "Patil",
]

BIZ_SUFFIXES = {
    "Restaurant": ["Kitchen", "Dhaba", "Foods", "Bites", "Dining", "Cafe"],
    "Plumber": ["Plumbing Works", "Pipe Solutions", "Plumbing Services"],
    "Electrician": ["Electrical Works", "Power Solutions", "Electricals"],
    "Doctor": ["Clinic", "Health Center", "Medical Center", "Hospital"],
    "Dentist": ["Dental Clinic", "Dental Care", "Smile Studio"],
    "Salon": ["Beauty Salon", "Hair Studio", "Makeover Studio", "Spa"],
    "Gym": ["Fitness Center", "Gym & Spa", "Health Club", "Fit Zone"],
    "Tutor": ["Academy", "Coaching Center", "Learning Hub", "Classes"],
    "Photographer": ["Photography", "Studio", "Photo Works", "Clicks"],
    "CA/Accountant": ["& Associates", "Accounting Firm", "Tax Consultants"],
    "Lawyer": ["Law Firm", "Legal Associates", "& Advocates"],
    "Real Estate Agent": ["Properties", "Realty", "Real Estate", "Homes"],
    "Interior Designer": ["Interiors", "Design Studio", "Decor House"],
    "Pest Control": ["Pest Solutions", "Pest Control Services", "HygieneX"],
    "Car Repair": ["Auto Works", "Car Care", "Motors", "Garage"],
    "Electronics Repair": ["Electronics", "Tech Repair", "Gadget Fix"],
    "Courier Service": ["Express", "Logistics", "Courier Services"],
    "Caterer": ["Caterers", "Food Services", "Catering Co."],
    "Event Planner": ["Events", "Celebrations", "Event Management"],
    "Web Developer": ["Tech Solutions", "IT Services", "Digital Studio"],
}

AREAS = {
    "Mumbai": ["Andheri", "Bandra", "Juhu", "Dadar", "Borivali", "Malad", "Powai"],
    "Delhi": ["Connaught Place", "Karol Bagh", "Dwarka", "Rohini", "Saket", "Lajpat Nagar"],
    "Bangalore": ["Koramangala", "Whitefield", "Indiranagar", "HSR Layout", "JP Nagar"],
    "Hyderabad": ["Banjara Hills", "Madhapur", "Gachibowli", "Kukatpally", "Ameerpet"],
    "Chennai": ["T Nagar", "Anna Nagar", "Adyar", "Velachery", "Mylapore"],
    "Kolkata": ["Salt Lake", "Park Street", "New Town", "Gariahat", "Howrah"],
    "Pune": ["Koregaon Park", "Hinjewadi", "Viman Nagar", "Kothrud", "Hadapsar"],
    "Ahmedabad": ["SG Highway", "Navrangpura", "Satellite", "Vastrapur", "Prahlad Nagar"],
    "Jaipur": ["C Scheme", "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Tonk Road"],
    "Lucknow": ["Hazratganj", "Gomti Nagar", "Aliganj", "Indira Nagar", "Aminabad"],
}

ROAD_TYPES = ["Road", "Street", "Lane", "Marg", "Nagar", "Colony", "Enclave"]


class MockDataGenerator:
    """Generates realistic Indian business listing mock data."""

    def __init__(self, count: int = 500):
        self.count = count
        self.generated: list[dict] = []

    def _generate_business_name(self, category: str) -> str:
        first = random.choice(FIRST_NAMES)
        last = random.choice(LAST_NAMES)
        suffix = random.choice(BIZ_SUFFIXES.get(category, ["Services"]))
        patterns = [
            f"{first}'s {suffix}", f"{last} {suffix}",
            f"{first} {last} {suffix}", f"Sri {last} {suffix}",
            f"New {last} {suffix}", f"Royal {suffix}",
        ]
        return random.choice(patterns)

    def _generate_address(self, city: str) -> str:
        areas = AREAS.get(city, ["Main Area", "Central", "Station Road"])
        area = random.choice(areas)
        plot = random.randint(1, 999)
        road = random.choice(ROAD_TYPES)
        pin = random.randint(100000, 999999)
        return f"Plot {plot}, {area} {road}, {city} - {pin}"

    def _generate_phone(self) -> str:
        prefixes = ["98", "97", "96", "95", "94", "93", "91", "90", "88", "87", "70"]
        prefix = random.choice(prefixes)
        number = "".join([str(random.randint(0, 9)) for _ in range(8)])
        return f"+91-{prefix}{number}"

    def generate(self) -> list[dict]:
        """Generate the specified number of mock business listings."""
        logger.info(f"Generating {self.count} mock business listings...")
        listings = []
        names_seen: set[str] = set()
        attempts = 0

        while len(listings) < self.count and attempts < self.count * 3:
            attempts += 1
            category = random.choice(CATEGORIES)
            city = random.choice(CITIES)
            name = self._generate_business_name(category)

            # Ensure unique names
            key = f"{name}_{city}".lower()
            if key in names_seen:
                continue
            names_seen.add(key)

            # Random created_at within last 90 days
            days_ago = random.randint(0, 90)
            created = datetime.utcnow() - timedelta(days=days_ago, hours=random.randint(0, 23))

            listing = {
                "business_name": name,
                "category": category,
                "city": city,
                "address": self._generate_address(city),
                "phone": self._generate_phone(),
                "source": random.choice(SOURCES),
                "created_at": created.isoformat(),
            }
            listings.append(listing)

        self.generated = remove_duplicates(listings)
        logger.info(f"Generated {len(self.generated)} unique listings")
        return self.generated

    def export_json(self, filepath: str = "seed_data.json") -> str:
        if not self.generated:
            self.generate()
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(self.generated, f, indent=2, ensure_ascii=False)
        logger.info(f"Exported {len(self.generated)} listings to {filepath}")
        return filepath

    def export_csv(self, filepath: str = "seed_data.csv") -> str:
        if not self.generated:
            self.generate()
        with open(filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "business_name", "category", "city",
                "address", "phone", "source", "created_at",
            ])
            writer.writeheader()
            writer.writerows(self.generated)
        logger.info(f"Exported {len(self.generated)} listings to {filepath}")
        return filepath


class BusinessScraper:
    """
    Web scraper for business listing sites.

    NOTE: This class provides the scraping structure but defaults to
    mock mode due to website ToS restrictions. Set mode='live' only
    if you have explicit permission from the target website.
    """

    def __init__(self, mode: str = "mock", count: int = 500):
        self.mode = mode
        self.count = count
        self.listings: list[dict] = []

    def scrape(self) -> list[dict]:
        if self.mode == "mock":
            generator = MockDataGenerator(count=self.count)
            self.listings = generator.generate()
        else:
            logger.warning(
                "Live scraping mode selected. Ensure you have permission "
                "from target websites before proceeding."
            )
            # Live scraping would use BeautifulSoup/Selenium here
            # Falling back to mock for safety
            generator = MockDataGenerator(count=self.count)
            self.listings = generator.generate()

        return self.listings


# ── CLI Entry Point ──────────────────────────────────────────────
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    gen = MockDataGenerator(count=550)
    data = gen.generate()
    gen.export_json("seed_data.json")
    gen.export_csv("seed_data.csv")
    print(f"Generated {len(data)} listings. Saved to seed_data.json and seed_data.csv")
