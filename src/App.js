import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const getDaysCount = (last) =>{
    const difference = new Date().getTime() - new Date(last).getTime();
    return Math.floor(difference / (1000 * 3600 * 24));
  };
  const [incidents, setIncidents] = useState([]);
  
  useEffect(() => {
    const port="3001"
    let url = port !== "" ? `http://${window.location.host.split(":")[0]}:${port}/incidents?limit=10` : "/incidents?limit=10";
    fetch(url)
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
              return <li key={incident.date} className={incident.impact }>
                <p>{ `${new Date(incident.date).toDateString()} - ${incident.description}` }</p>
                <span>{ incident.impact }</span>
                { new Date(incident.date).getDay() === 5 ? <p>Read only friday!!</p> : "" }
              </li>
            })
            : <p>No incidents reported</p>
          }
        </ul>
        <button onClick={() => {console.log("Should retrieve more incidents...")}}>Load more...</button>
      </div>
    </div>
  );
}

export default App;
