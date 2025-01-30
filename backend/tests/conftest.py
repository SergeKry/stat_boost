import sys
import os
from pathlib import Path

# Ensure that src/ is in Python's path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

print(f"PYTHONPATH set to: {sys.path[0]}")  # Debugging
print('Conftest is running')