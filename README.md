# GridGuard - AI-Powered Power Outage Prediction

GridGuard is an accessibility-first platform that predicts localized power outage risk before failures occur, helping vulnerable communities prepare for potential power disruptions.

## Problem Statement

Power outages disproportionately harm vulnerable communities—especially in rural or disaster-prone regions where individuals rely on electricity for:
- Medical devices (oxygen concentrators, CPAP machines)
- Mobility support
- Communication and safety
- Income (remote work)

Existing outage notifications are **reactive**, lack precision, and don't provide accessible information, leaving vulnerable users without adequate time to prepare.

## Solution

GridGuard uses **Microsoft AI services** to:
1. **Predict** power outage risk before it happens (not after)
2. **Explain** why the risk is elevated in plain language
3. **Provide** neighborhood-level precision
4. **Support** accessibility through text-to-speech and clear visuals

## Microsoft AI Services Used

1. **Statistical Anomaly Detection** (Custom ML Implementation)
   - Detects abnormal weather patterns that precede outages
   - Uses z-score analysis and statistical modeling

2. **Machine Learning Pattern Recognition**
   - Matches current conditions to historical outage patterns
   - Weighted similarity scoring for predictive accuracy

3. **Predictive Risk Modeling**
   - Multi-factor AI model combining weather, infrastructure, and vulnerability data
   - Real-time risk score calculation (0-100%)

4. **Natural Language Generation** (GitHub Models - Microsoft Azure OpenAI)
   - Converts technical data into accessible explanations
   - Tailored for vulnerable populations

## Features

- **Interactive Map**: Visual neighborhood-level risk assessment
- **Real-time Weather Data**: Integration with weather APIs
- **Risk Explanations**: Plain-language, AI-generated insights
- **Voice Output**: Text-to-speech for accessibility
- **Preparation Tips**: Actionable guidance based on risk level
- **Responsive Design**: Works on mobile and desktop

## Tech Stack

**Frontend:**
- React.js
- Leaflet (interactive maps)
- Axios (API calls)

**Backend:**
- Python Flask
- Custom ML algorithms
- GitHub Models API (Microsoft Azure OpenAI)

**APIs:**
- OpenWeatherMap (weather data)
- GitHub Models (AI text generation)

## Installation

### Prerequisites
- Node.js (v16+)
- Python (3.8+)
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:
```
GITHUB_TOKEN=your-github-token
WEATHER_API_KEY=your-weather-api-key
FLASK_ENV=development
FLASK_DEBUG=True
```

Run backend:
```bash
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Demo

Visit `http://localhost:3000` after starting both servers.

1. View the interactive map with neighborhood markers
2. Click any neighborhood to see risk prediction
3. Read AI-generated explanations
4. Click "Read Aloud" for voice output

## Target Users

- Elderly individuals using medical devices
- People with mobility or vision impairments
- Remote workers in rural areas
- Low-income households with unstable infrastructure
- Disaster-prone communities

## How It Works

1. **Data Collection**: Fetches current weather forecast and historical outage data
2. **Anomaly Detection**: AI identifies unusual weather patterns
3. **Pattern Matching**: ML compares to historical outage conditions
4. **Risk Calculation**: Multi-factor model predicts outage probability
5. **Explanation Generation**: AI creates accessible, plain-language insights
6. **User Interface**: Displays risk on interactive map with voice support

## Future Enhancements

- SMS/Email alerts for high-risk predictions
- User accounts for personalized notifications
- Integration with utility company APIs
- Multi-language support
- Historical risk tracking and reporting
- Community collaboration features

## Microsoft Imagine Cup 2025

Built for the Microsoft Imagine Cup 2025 - demonstrating how AI can help vulnerable communities prepare for and respond to infrastructure challenges.

## License

MIT License

## Team

Monisha Kummari

## Acknowledgments

- Microsoft for GitHub Models and Azure AI services
- OpenWeatherMap for weather data API
- Communities affected by power outages who inspired this project