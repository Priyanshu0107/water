"use client";

import { useState } from "react";

export default function RainfallRunoff() {
  const [pincode, setPincode] = useState("");
  const [weather, setWeather] = useState<any>(null);

  // Dummy historical data
  const historicalData = [
    { year: "2022", rainfall: "850 mm", runoff: "320 mm" },
    { year: "2023", rainfall: "910 mm", runoff: "340 mm" },
    { year: "2024", rainfall: "870 mm", runoff: "310 mm" },
  ];

  // Fetch current weather by pincode (OpenWeather API example)
  const fetchWeather = async () => {
    try {
      // OpenWeatherMap API (replace YOUR_API_KEY with actual key)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${pincode},IN&appid=YOUR_API_KEY&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌧️ वर्षा और रनऑफ आंकड़े | Rainfall & Runoff</h1>
      <p>
        अपने पिनकोड के आधार पर वर्तमान मौसम देखें और पिछले 2–3 वर्षों का
        वर्षा/रनऑफ डेटा।
      </p>

      {/* Input for pincode */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={fetchWeather} style={{ padding: "8px 12px" }}>
          Check Weather
        </button>
      </div>

      {/* Current Weather Info */}
      {weather && weather.main && (
        <div
          style={{
            margin: "20px 0",
            padding: "15px",
            background: "#e0f7fa",
            borderRadius: "10px",
          }}
        >
          <h2>📍 Current Weather for {weather.name}</h2>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>☁️ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {/* Historical Rainfall Data */}
      <div>
        <h2>📊 Historical Rainfall & Runoff Data</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#90caf9" }}>
              <th style={{ border: "1px solid black", padding: "8px" }}>Year</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Rainfall
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Runoff
              </th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {row.year}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {row.rainfall}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {row.runoff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
