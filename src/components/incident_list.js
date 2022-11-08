import React from 'react'
import { delete_incident, get_all_incidents, crea } from '../services/incidents'

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
    return(
        <div className='incident_list'>
        <ul>
          { 
            incidents.length > 0 ?  
            incidents.map(incident =>{
              return <li key={incident.id} className={incident.impact }>
                <p>{ `${new Date(incident.date).toDateString()} - ${incident.description}` }</p>
                <span>{ incident.impact }</span>
                { new Date(incident.date).getDay() === 5 ? <p>Read only friday!!</p> : "" }
                <button onClick={ () => handleDelete(incident.id)}>Delete</button>
              </li>
            })
            : <p>No incidents reported</p>
          }
        </ul>
        <button onClick={() => {console.log("Should retrieve more incidents...")}} >Load more...</button>
      </div>
    )
}

export default IncidentsList;