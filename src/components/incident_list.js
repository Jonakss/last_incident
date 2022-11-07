import React from 'react'

const IncidentsList = ({incidents, handleRemoveIncident}) => {
    const handleDelete = (id) => {
        const port = "3000"
        fetch(`http://${window.location.host.split(":")[0]}:${port}/incidents/${id}`, {
        "method": 'DELETE',
        "headers": {
            'Content-Type': 'application/json'
        }
        }).then(response => {
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