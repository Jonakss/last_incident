const port = undefined; //process.env.PORT || "3000";

export const get_all_incidents = (callback) => {
    let url = `http://${window.location.host.split(":")[0]}:${port ? port: window.location.host.split(":")[1]}/incidents?_sort=id&_order=desc&limit=10`;
    fetch(url)
    .then(response => response.json())
    .then(incident_list => {
      callback(incident_list)
    })
    .catch(error => {
      console.log(error)
    });
};

export const create_new_incident = ({description, impact, date}, callback, error) => {
    let data = {
        "description": description,
        "date": date,
        "impact": impact
    }
    fetch(`http://${window.location.host.split(":")[0]}:${port ? port: window.location.host.split(":")[1]}/incidents`, {
        "method": 'POST',
        "headers": {
          'Content-Type': 'application/json'
        },
        "body": JSON.stringify(data) 
      }).then(response => response.json())
      .then(new_incident => {
        callback(new_incident)
      }).catch(error => {
          console.log(error);
      })
};

export const delete_incident = (id, callback) => {
    fetch(`http://${window.location.host.split(":")[0]}:${port ? port: window.location.host.split(":")[1]}/incidents/${id}`, {
        "method": 'DELETE',
        "headers": {
        'Content-Type': 'application/json'
    }
    }).then(response => {
        callback(response)
    })
};

