# Setup Guide for GridGuard

## Quick Start

### 1. Get API Keys

**GitHub Token (Free):**
- Visit: https://github.com/settings/tokens
- Generate new token (classic)
- Check `repo` scope
- Copy token

**Weather API Key (Free):**
- Visit: https://openweathermap.org/api
- Sign up for free account
- Copy API key from dashboard

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

Create `backend/.env`:
```
GITHUB_TOKEN=your-token-here
WEATHER_API_KEY=your-key-here
FLASK_ENV=development
FLASK_DEBUG=True
```

Run: `python app.py`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Troubleshooting

**Backend won't start:**
- Check virtual environment is activated
- Verify .env file exists with correct keys

**Frontend errors:**
- Run `npm install` again
- Check backend is running on port 5000

**No circles on map:**
- Click "Reset Map View" button
- Refresh browser (F5)