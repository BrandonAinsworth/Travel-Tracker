export function fetchData(type) {
    return fetch(`http://localhost:3001/api/v1/${type}`)
      .then(response => response.json())
      .then(data => 
          console.log(data));
  }

let promise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')]);


export {
    promise
}