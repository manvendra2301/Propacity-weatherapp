import React from 'react'
import './ForecastCard.css'

function ForecastCard({forecastData}) {
  // function to filter forecast data based on the time of the first object
  const filterForecastByFirstObjTime = (forecastData) => {
    if (!forecastData) {
      return [];
    }

    const firstObjTime = forecastData[0].dt_txt.split(" ")[1];
    return forecastData.filter((data) => data.dt_txt.endsWith(firstObjTime));
  };

  const filteredForecast = filterForecastByFirstObjTime(forecastData?.list);
  return (
    <div>
      {/* extended forecastData */}
      <h4 className="extended-forecast-heading">Extended Forecast</h4>
      {filteredForecast.length > 0 ? (
        <div className="extended-forecasts-container">
          {filteredForecast.map((data, index) => {
            const date = new Date(data.dt_txt);
            const day = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return (
              <div className="forecast-box" key={index}>
                <h5>{day}</h5>
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="icon"
                />
                <h5>{data.weather[0].description}</h5>
                <h5 className="min-max-temp">
                  {data.main.temp_max}&deg; / {data.main.temp_min}&deg;
                </h5>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="error-msg">No Data Found</div>
      )}
    </div>
  );
}

export default ForecastCard