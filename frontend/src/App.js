import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './App.css';

const API_BASE = 'http://localhost:5000';

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function App() {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [mapCenter, setMapCenter] = useState([40.7580, -73.9855]);

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const fetchNeighborhoods = async () => {
    try {
      const response = await axios.get(`${API_BASE}/map-data`);
      setNeighborhoods(response.data);
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
    }
  };

  const fetchRiskData = async (neighborhoodId) => {
    setLoading(true);
    setRiskData(null);
    try {
      const response = await axios.get(`${API_BASE}/risk`, {
        params: { neighborhood_id: neighborhoodId }
      });
      setRiskData(response.data);
    } catch (error) {
      console.error('Error fetching risk data:', error);
      alert('Failed to fetch risk data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNeighborhoodClick = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setMapCenter([neighborhood.lat, neighborhood.lng]);
    fetchRiskData(neighborhood.id);
  };

  const speakExplanation = () => {
    if (!riskData || !riskData.explanation) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(riskData.explanation);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const getRiskColor = (score) => {
    if (score < 40) return '#22c55e'; // Green
    if (score < 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getRiskColorForNeighborhood = (neighborhoodId) => {
    if (riskData && riskData.neighborhood_id === neighborhoodId) {
      return getRiskColor(riskData.risk_score);
    }
    return '#3b82f6'; // Default blue
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>⚡ GridGuard</h1>
        <p>AI-Powered Power Outage Risk Prediction</p>
      </header>

      <div className="main-content">
        <div className="map-section">
          <h2>Neighborhood Map</h2>
          <p className="instruction">Click on any neighborhood to see power outage risk</p>
          <button 
            onClick={() => setMapCenter([40.7580, -73.9855])}
            className="reset-map-button"
          >
            Reset Map View
          </button>
          
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            style={{ height: '500px', width: '100%' }}
            className="map-container"
          >
            <MapController center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {neighborhoods.map((neighborhood) => (
              <CircleMarker
                key={neighborhood.id}
                center={[neighborhood.lat, neighborhood.lng]}
                radius={15}
                fillColor={getRiskColorForNeighborhood(neighborhood.id)}
                fillOpacity={0.7}
                color="#fff"
                weight={2}
                eventHandlers={{
                  click: () => handleNeighborhoodClick(neighborhood)
                }}
              >
                <Popup>
                  <strong>{neighborhood.name}</strong>
                  <br />
                  Population: {neighborhood.population.toLocaleString()}
                  <br />
                  <button 
                    onClick={() => handleNeighborhoodClick(neighborhood)}
                    className="popup-button"
                  >
                    Check Risk
                  </button>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="legend">
            <h3>Risk Levels</h3>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#22c55e' }}></span>
              Low (0-39%)
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#f59e0b' }}></span>
              Moderate (40-69%)
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: '#ef4444' }}></span>
              High (70-100%)
            </div>
          </div>
        </div>

        <div className="info-section">
          <h2>Risk Information</h2>
          
          {!selectedNeighborhood && !riskData && (
            <div className="placeholder">
              <p>Select a neighborhood on the map to see power outage risk prediction</p>
            </div>
          )}

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing weather patterns and outage risk...</p>
            </div>
          )}

          {riskData && !loading && (
            <div className="risk-details">
              <h3>{riskData.neighborhood_name}</h3>
              
              <div 
                className="risk-score-card"
                style={{ borderColor: getRiskColor(riskData.risk_score) }}
              >
                <div className="risk-level" style={{ color: getRiskColor(riskData.risk_score) }}>
                  {riskData.risk_level} Risk
                </div>
                <div className="risk-percentage">
                  {riskData.risk_score}%
                </div>
              </div>

              <div className="weather-info">
                <h4>Current Weather Forecast</h4>
                <div className="weather-grid">
                  <div className="weather-item">
                    <span className="weather-label">Temperature</span>
                    <span className="weather-value">{riskData.weather.temp.toFixed(1)}°C</span>
                  </div>
                  <div className="weather-item">
                    <span className="weather-label">Wind Speed</span>
                    <span className="weather-value">{riskData.weather.wind_speed.toFixed(1)} km/h</span>
                  </div>
                  <div className="weather-item">
                    <span className="weather-label">Precipitation</span>
                    <span className="weather-value">{riskData.weather.precipitation.toFixed(1)} mm</span>
                  </div>
                </div>
              </div>

              <div className="explanation">
                <h4>What This Means</h4>
                <p>{riskData.explanation}</p>
                
                <button 
                  onClick={speakExplanation}
                  className={`voice-button ${speaking ? 'speaking' : ''}`}
                  aria-label={speaking ? 'Stop reading' : 'Read explanation aloud'}
                >
                  {speaking ? '🔊 Stop' : '🔊 Read Aloud'}
                </button>
              </div>

              <div className="preparation-tips">
                <h4>Preparation Checklist</h4>
                <ul>
                  <li>Charge all essential devices (phones, medical equipment)</li>
                  <li>Have flashlights and batteries ready</li>
                  <li>Keep emergency contacts accessible</li>
                  <li>Store water and non-perishable food</li>
                  {riskData.risk_score > 70 && (
                    <li><strong>Consider backup power for medical devices</strong></li>
                  )}
                </ul>
              </div>

              <div className="timestamp">
                Last updated: {new Date(riskData.timestamp).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>GridGuard is designed to help vulnerable communities prepare for power outages</p>
        <p>Built with Azure AI • Microsoft Imagine Cup 2025</p>
      </footer>
    </div>
  );
}

export default App;