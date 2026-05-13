"""
Database Initialization Utility Script
======================================
Standalone test script to verify SQLAlchemy database connection,
table creation, and seed data population independent of the uvicorn server.
"""

import os
import json
from app.database.connection import engine, Base, SessionLocal
from app.models.listing import ListingMaster


def verify_database():
    """Verify tables and seeding."""
    print("Verifying database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables verified successfully.")

    db = SessionLocal()
    try:
        count = db.query(ListingMaster).count()
        print(f"Current listing count in database: {count}")

        if count == 0:
            seed_path = os.path.join(os.path.dirname(__file__), "seed_data.json")
            if os.path.exists(seed_path):
                print(f"Database is empty. Seeding data from {seed_path}...")
                with open(seed_path, "r", encoding="utf-8") as f:
                    seed_data = json.load(f)

                for item in seed_data:
                    listing = ListingMaster(
                        business_name=item["business_name"],
                        category=item["category"],
                        city=item["city"],
                        address=item["address"],
                        phone=item.get("phone"),
                        source=item["source"],
                    )
                    db.add(listing)

                db.commit()
                print(f"Successfully seeded {len(seed_data)} listings into database.")
            else:
                print("No seed_data.json found to seed.")
    finally:
        db.close()


if __name__ == "__main__":
    verify_database()
