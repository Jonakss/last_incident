import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const getDaysCount = (last) =>{
    const difference = new Date().getTime() - new Date(last).getTime();
    return Math.floor(difference / (1000 * 3600 * 24));
  };
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/incidents?limit=10")
    .then(response => response.json())
    .then(incident_list => {
      console.log(incident_list);
      setIncidents(incident_list);
    })
    .catch(error => {
      console.log(error)
    });
    console.log("");
  }, [])

  return (
    <div className="App">
      <h1>Last incident</h1>
      <h2>Days w/o incidents: { incidents.length > 0? getDaysCount(incidents[0].date) : 0 }</h2>
      <div className='incident_list'>
        <ul>
          { 
            incidents.length > 0 ?  
            incidents.map(incident =>{
              return <li key={incident.date} className={incident.impact}>
                <p>{ `${new Date(incident.date).toDateString()} - ${incident.description}` }</p>
                <span>{incident.impact}</span>
              </li>
            })
            : <p>No incidents reported</p>
          }
          <button onClick={() => {console.log("Should retrieve more incidents")}}>Load more...</button>
        </ul>
      </div>
    </div>
  );
}

export default App;
