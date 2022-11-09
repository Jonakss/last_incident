import React, { useState } from 'react'

const Incident = ({incident, onDelete, onEdit}) => {
    const [isEditing, setEditing] = useState(false);
    const handleEdit = (incident) =>{
        setEditing(!isEditing);
        // if(isEditing){
        // }
    }

    return (
        incident?
        <li className={incident.impact }>
            { isEditing? 
                <div className='new_incident'>
                    <input neme={`description-${incident.id}`} type="text" value={ `${incident.description}` } onChange ={()=>{ }} />
                    <input required type="datetime-local" name={`datetime-edit-${incident.id}`} placeholder='Date' value={new Date(incident.date).toISOString().split('Z')[0]} onChange ={()=>{}}/>
                    <label htmlFor="impact"></label>
                    <select required name={`impact-${incident.id}`} placeholder='Impact'>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select> 
                    <button onClick={ () => {handleEdit(incident)} }>Save</button>
                </div>
                    :
                <div>
                    <p>{ `${new Date(incident.date).toDateString()} - ${incident.description}` }</p>
                    <span>{ incident.impact }</span> 
                    <button onClick={ () => onEdit? onEdit(incident) : handleEdit(incident) }>Edit</button>
                </div>
            }
            { new Date(incident.date).getDay() === 5 ? <p>Read only friday!!</p> : "" }
            { onDelete? <button onClick={ () => onDelete(incident.id) }>Delete</button> : "" }
        </li>
        : ""
    );
};

export default Incident;