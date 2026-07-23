#!/bin/bash
set -e

echo "VoiceForge AI Backend"
echo "======================"
echo ""

if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 is not installed."
    exit 1
fi

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo ".env file not found. Please create it from the provided template."
    exit 1
fi

echo ""
echo "Starting server..."
uvicorn main:app --reload --host 0.0.0.0 --port 8000
