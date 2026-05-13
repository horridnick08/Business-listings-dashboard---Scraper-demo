"""
Data Validation Utilities
=========================
Reusable validation functions for cleaning and validating
business listing data before database insertion.
"""

import re
from typing import Optional


def validate_phone(phone: Optional[str]) -> Optional[str]:
    """
    Validate and normalize an Indian phone number.

    Accepts formats: +91-XXXXXXXXXX, 91XXXXXXXXXX, XXXXXXXXXX, etc.
    Returns cleaned number or None if invalid.
    """
    if not phone:
        return None

    # Remove all non-digit characters except leading +
    cleaned = re.sub(r"[^\d+]", "", phone)

    # Remove country code prefix
    if cleaned.startswith("+91"):
        cleaned = cleaned[3:]
    elif cleaned.startswith("91") and len(cleaned) == 12:
        cleaned = cleaned[2:]
    elif cleaned.startswith("0"):
        cleaned = cleaned[1:]

    # Validate: must be 10 digits
    if re.match(r"^\d{10}$", cleaned):
        return f"+91-{cleaned}"

    return None


def clean_string(value: str) -> str:
    """
    Clean a string by stripping whitespace and normalizing spaces.

    Args:
        value: Raw string to clean.

    Returns:
        Cleaned string with normalized whitespace.
    """
    if not value:
        return ""
    # Collapse multiple spaces into one and strip
    return re.sub(r"\s+", " ", value.strip())


def remove_duplicates(
    listings: list[dict],
    key_fields: tuple[str, ...] = ("business_name", "city", "phone"),
) -> list[dict]:
    """
    Remove duplicate listings based on a composite key.

    Args:
        listings: List of listing dictionaries.
        key_fields: Tuple of field names to use as the dedup key.

    Returns:
        Deduplicated list of listings.
    """
    seen: set[tuple] = set()
    unique: list[dict] = []

    for listing in listings:
        # Build composite key from specified fields
        key = tuple(
            clean_string(str(listing.get(field, ""))).lower()
            for field in key_fields
        )

        if key not in seen:
            seen.add(key)
            unique.append(listing)

    return unique
