import React from 'react'
import { delete_incident, get_all_incidents, crea } from '../services/incidents'
import Incident from './incident_item'

const IncidentsList = ({incidents, handleRemoveIncident}) => {
    const handleDelete = (id) => {
        delete_incident(id, (response) => {
          console.log(response)
          if(response.status === 200){
              handleRemoveIncident(id)
          }
          return response.json()
        })
    }
    const handleEdit = incident => {
      
    };
    return(
        <div className='incident_list'>
        <ul>
          { 
            incidents.length > 0 ?  
            incidents.map(incident =>{
              return (
                <Incident key={incident.id} incident={incident} onDelete={() => {handleDelete(incident.id)}}></Incident>
              )
            })
            : <p>No incidents reported</p>
          }
        </ul>
        <button onClick={() => {console.log("Should retrieve more incidents...")}} >Load more...</button>
      </div>
    )
}

export default IncidentsList;