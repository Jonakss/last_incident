import React from 'react'
import { create_new_incident } from '../services/incidents';

const NewIncident = ({onNewIncident}) => {
    const handleNewIncident = (e)=>{
        e.preventDefault();

        let data = {
            "description": e.target.description.value,
            "date": new Date(e.target.datetime.value).toUTCString(),
            "impact": e.target.impact.value
        }

        console.log(data);

        if(!data.description || ! data.date || ! data.impact){
            console.log("Falta info...")
            return ;
        }

        create_new_incident(data, (new_incident) => {
            onNewIncident(new_incident);
            e.target.reset();
        }, () => {onNewIncident(undefined);})
    }
    return(
        <div className='new_incident'>
            <h2>New incident</h2>
            <form onSubmit={ (e) => { handleNewIncident(e) }}>
                <textarea required name='description' placeholder='Description'/>
                <label htmlFor="datetime-local">Fecha del incidente</label>
                <input required type="datetime-local" name='datetime' placeholder='Date' />
                <label htmlFor="impact">Choose an impact</label>
                <select required name='impact' placeholder='Impact'>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input type="submit" value="Add new incident..." />
            </form>
        </div>
    )
};

export default NewIncident;