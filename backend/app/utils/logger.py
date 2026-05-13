"""
Logging Configuration
=====================
Provides a centralized, reusable logger for the entire application.
Uses structured formatting with timestamps and module context.
"""

import logging
import sys


def get_logger(name: str = "business_listings") -> logging.Logger:
    """
    Create and return a configured logger instance.

    Args:
        name: Logger name (typically the module name).

    Returns:
        Configured logging.Logger instance.
    """
    logger = logging.getLogger(name)

    if not logger.handlers:
        logger.setLevel(logging.DEBUG)

        # ── Console Handler ──────────────────────────────────────
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)

        formatter = logging.Formatter(
            fmt="%(asctime)s │ %(levelname)-8s │ %(name)s │ %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

    return logger
