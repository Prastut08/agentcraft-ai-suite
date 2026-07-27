@echo off
echo VoiceForge AI Backend
echo ======================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH.
    pause
    exit /b 1
)

REM Create virtual environment
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install --upgrade pip
pip install -r requirements.txt

REM Check env file
if not exist ".env" (
    echo .env file not found. Please create it from the provided template.
    pause
    exit /b 1
)

REM Run server
echo.
echo Starting server...
uvicorn main:app --reload --host 0.0.0.0 --port 8000

pause
