
export function fetchData(type) {
    return fetch(`http://localhost:3001/api/v1/${type}`)
      .then(response => response.json())
  }

let promise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')]);


export function postNewTrip(){
  return fetch('http://localhost:3001/api/v1/trips') , {
    method: 'POST',
    body: JSON.stringify({
      id: dataRepo.trips.trips + 1,
      userID: dataRepo.currentTraveler.id ,
      travelers: formData.get('travelers'),
      date: formData.get('date'),
      duration: formData.get('duration'),
      status: 'pending'
    }),
    headers: {'Content-Type': 'application/json'}
  
    .then(response => response.json())

    .catch(error => console.log('Error'))
}
}


export {
    promise
}