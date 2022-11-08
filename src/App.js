import './App.css';
import React, { useState, useEffect } from 'react';
import IncidentsList from './components/incident_list';
import NewIncident from './components/new_incident';
import { get_all_incidents } from './services/incidents';


function App() {
  const getDaysCount = (last) =>{
    const difference = new Date().getTime() - new Date(last).getTime();
    return Math.floor(difference / (1000 * 3600 * 24));
  };
  const [incidents, setIncidents] = useState([]);

  const handleRemoveIncident = (id) =>{
    let new_incidents = Array.from(incidents)
    new_incidents.splice(new_incidents.findIndex(obj => obj.id === id), 1)
    setIncidents(new_incidents)
  }
  
  const handleNewIncident = (new_incident) => {
    if(new_incident){
      console.log(new_incident);
      setIncidents([new_incident, ...incidents])
    }else{
      console.log("Error while creating a new incident")
    }
  }

  useEffect(() => {
    get_all_incidents(incident_list => {
      console.log(incident_list);
      setIncidents(incident_list);
    });
  }, [])

  return (
    <div className="App">
      <h1>Last incident</h1>
      <h2>Days w/o incidents: { incidents.length > 0? getDaysCount(new Date(incidents[0].date).toDateString()) : 0 }</h2>
      <IncidentsList incidents={incidents} handleRemoveIncident = { handleRemoveIncident }></IncidentsList>
      <NewIncident onNewIncident={(new_incident) => handleNewIncident(new_incident) }></NewIncident>
    </div>
  );
}

export default App;
