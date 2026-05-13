import os
import urllib.request
import zipfile
import sys

NODE_ZIP_URL = "https://nodejs.org/dist/v20.12.2/node-v20.12.2-win-x64.zip"
ZIP_PATH = "node_portable.zip"
EXTRACT_DIR = "node_portable"


def setup_portable_node():
    """Download and extract portable Node runtime."""
    print("Setting up local portable Node.js runtime...")
    if not os.path.exists(EXTRACT_DIR):
        if not os.path.exists(ZIP_PATH):
            print(f"Downloading Node.js standalone binary from {NODE_ZIP_URL}...")
            urllib.request.urlretrieve(NODE_ZIP_URL, ZIP_PATH)
            print("Download complete.")

        print(f"Extracting {ZIP_PATH} to {EXTRACT_DIR}...")
        with zipfile.ZipFile(ZIP_PATH, "r") as zip_ref:
            zip_ref.extractall(EXTRACT_DIR)
        print("Extraction complete.")
    else:
        print("Local portable Node.js runtime already exists.")

    # Locate node.exe
    base_dir = os.path.join(EXTRACT_DIR, "node-v20.12.2-win-x64")
    node_exe = os.path.join(base_dir, "node.exe")
    npm_cmd = os.path.join(base_dir, "npm.cmd")

    if os.path.exists(node_exe) and os.path.exists(npm_cmd):
        print(f"\nSUCCESS: Portable Node.js is ready at:\nNode: {node_exe}\nNPM: {npm_cmd}")
    else:
        print("\nERROR: Could not locate node.exe in extracted folder.")


if __name__ == "__main__":
    setup_portable_node()
