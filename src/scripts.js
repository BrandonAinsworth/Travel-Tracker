import { expect } from 'chai';
import DataRepo from '../src/DataRepo';
import Destination from '../src/Destination';
import dayjs from "dayjs"
import { promise } from './apiCalls';
import Traveler from './Traveler';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/around-the-world.png'


//GLOBAL VARIABLES

let dataRepo;
let individual;
let newTrip;

//QUERY SELECTORS
const pastButton = document.getElementById('past');
const currentButton = document.getElementById('present');
const upcomingButton = document.getElementById('upcoming');
const pendingButton = document.getElementById('pending');
const saveTripButton = document.getElementById('submit-trip');
const totalYearSpent = document.querySelector('.total-year');
const welcomeUser = document.querySelector('.welcome-user');
const tripCards = document.querySelector('.trips-cards')
const dropDown = document.getElementById('destination')
const form = document.querySelector('.plan-new-trip')
const costs = document.querySelector('.costs')
//EVENT LISTENERS
pastButton.addEventListener('click', () => {
    populatePastTrips()
})
upcomingButton.addEventListener('click', () =>  {
    populateUpcomingTrips()
})
pendingButton.addEventListener('click', () => {
    populatePendingTrips()
})
currentButton.addEventListener('click', () => {
    populateCurrentTrips()
})
//FUNCTIONS
const getRandomID = () => {
    return Math.floor(Math.random() * 50);
  }

const id = 10

getData()

function helloUser(){
    let userName = dataRepo.returnCurrentTravelerFirstName()
    welcomeUser.innerText = `Welcome, ${userName}`
}

function getData(){
    promise.then(data => {
      dataRepo = new DataRepo(data);
      individual = (dataRepo.returnCurrentTravelerById(id));
      populateTravelerTrips()
      getUserTotalSpent()
      helloUser()
      populateDestinationOptions()
    })
    .catch(error => {
      console.log(error)
    //   catchError.innerText = 'We have encountered an error retrieving your data.'
    });
  }

function populateTravelerTrips(){
    // console.log('pending',dataRepo.currentTraveler.allTrips)
    dataRepo.returnTripsForCurrentTraveler(id)
    // console.log('pending2',dataRepo.currentTraveler.allTrips)
    dataRepo.returnPastTripsForCurrentTraveler()
    dataRepo.returnUpcomingTripsForCurrentTraveler()
    dataRepo.returnCurrentTripsForCurrentTraveler()
    dataRepo.returnPendingTripsForCurrentTraveler()
}

function getUserTotalSpent() {
    let totalSpent = dataRepo.calculateTotalSpentThisYear()
    if(totalSpent === 0){
        totalYearSpent.innerText = "No trips this year"
    } else {
    totalYearSpent.innerText = `$${totalSpent}`
    }
}
function populatePastTrips() {
 const pastTripTemplate = dataRepo.currentTraveler.pastTrips.map(trip => {
        let destination = dataRepo.returnDestinationById(trip.destinationID)
        if(!destination) {
            return tripCards.innerText = 'No Current Trips';
        } else {
        return `
        <article class="card">
        <h4 class="card-destination">${destination.destination}</h4>
        <p class="card-status">Hope you had fun!</p>
        <img class="card-image" src="${destination.image}" alt="alt-text">
        <p class="card-date">Departure date requested: ${trip.date}</p>
        <p class="card-duration">Travelers: ${trip.travelers}</p>
        <p class="card-duration">Nights requested: ${trip.duration}</p>
        <p class="card-lodging">Nightly cost: $${destination.estimatedLodgingCostPerDay}</p>
        <p class="card-flights">Estimated flight cost per person: $${destination.estimatedFlightCostPerPerson}</p>
      </article>
      <hr class="line">`
    }
    })
    tripCards.innerHTML = pastTripTemplate
}
function populateUpcomingTrips() {
    const upcomingTripTemplate = dataRepo.currentTraveler.upcomingTrips.map(trip => {
           let destination = dataRepo.returnDestinationById(trip.destinationID)
        //    console.log(destination)
           if(!destination) {
            // console.log(destination)
               return tripCards.innerText = 'No Current Trips';
           } else {
           return `
           <article class="card">
           <h4 class="card-destination">${destination.destination}</h4>
           <p class="card-status">Your trip is currently ${trip.status}.</p>
           <img class="card-image" src="${destination.image}" alt="alt-text">
           <p class="card-date">Departure date requested: ${trip.date}</p>
           <p class="card-duration">Travelers: ${trip.travelers}</p>
           <p class="card-duration">Nights requested: ${trip.duration}</p>
           <p class="card-lodging">Nightly cost: $${destination.estimatedLodgingCostPerDay}</p>
           <p class="card-flights">Estimated flight cost per person: $${destination.estimatedFlightCostPerPerson}</p>
         </article>
         <hr class="line">`
        }
       })
       tripCards.innerHTML = upcomingTripTemplate
   }
   
   function populatePendingTrips() {
       console.log('hello')
    const pendingTripTemplate = dataRepo.currentTraveler.pendingTrips.map(trip => {
           let destination = dataRepo.returnDestinationById(trip.destinationID)
        //    console.log(destination)
           if(!destination){
            // console.log(destination)
           return tripCards.innerText = 'No Current Trips';
           } else {
           return `
           <article class="card">
           <h4 class="card-destination">${destination.destination}</h4>
           <p class="card-status">Your trip is currently ${trip.status}.</p>
           <img class="card-image" src="${destination.image}" alt="alt-text">
           <p class="card-date">Departure date requested: ${trip.date}</p>
           <p class="card-duration">Travelers: ${trip.travelers}</p>
           <p class="card-duration">Nights requested: ${trip.duration}</p>
           <p class="card-lodging">Nightly cost: $${destination.estimatedLodgingCostPerDay}</p>
           <p class="card-flights">Estimated flight cost per person: $${destination.estimatedFlightCostPerPerson}</p>
         </article>
         <hr class="line">`
           }
       })
       tripCards.innerHTML = pendingTripTemplate
   }

   function populateCurrentTrips() {
    const currentTripTemplate = dataRepo.currentTraveler.currentTrips.map(trip => {
           let destination = dataRepo.returnDestinationById(trip.destinationID)
        //    console.log(destination)
           if(!destination) {
            // console.log(destination)
               return tripCards.innerText = 'No Current Trips';
           } else {
           return `
           <article class="card">
           <h4 class="card-destination">${destination.destination}</h4>
           <p class="card-status">Your trip is currently underway!</p>
           <img class="card-image" src="${destination.image}" alt="alt-text">
           <p class="card-date">Departure date requested: ${trip.date}</p>
           <p class="card-duration">Travelers: ${trip.travelers}</p>
           <p class="card-duration">Nights requested: ${trip.duration}</p>
           <p class="card-lodging">Nightly cost: $${destination.estimatedLodgingCostPerDay}</p>
           <p class="card-flights">Estimated flight cost per person: $${destination.estimatedFlightCostPerPerson}</p>
         </article>
         <hr class="line">`
           }
       })
       tripCards.innerHTML = currentTripTemplate
   }

function populateDestinationOptions() {
    dataRepo.destinations.destinations.forEach(destination => {
        dropDown.innerHTML += `
        <option name='destinationID' value="${destination.id}">${destination.destination}</option>
        `
    })
}

function postNewTrip(newTrip){
    // console.log(newTrip)
    return fetch('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      body: JSON.stringify(newTrip),
      headers: {'Content-Type': 'application/json'}
})
      .then(response => response.json())
      .catch(error => console.log('Error'))
}




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
      newTrip = {
      id: dataRepo.trips.trips.length + 1,
      userID: dataRepo.currentTraveler.id ,
      destinationID: parseInt(formData.get('destinate')),
      travelers: parseInt(formData.get('travelers')),
      date: formData.get('date').split('-').join('/'),
      duration: parseInt(formData.get('duration')),
      status: 'pending' ,
      suggestedActivities: []
    };
    e.target.reset();
    postNewTrip(newTrip).then(data => {
        // console.log(data)
        dataRepo.trips.trips.push(data.newTrip)
        populateTravelerTrips()
        renderTripCost()
        getUserTotalSpent()
    })
    // promise.then(data => {
    //     console.log('hummingbrid')
    //     console.log('data',data)
    //     dataRepo = new DataRepo(data);
    //     individual = (dataRepo.returnCurrentTravelerById(id));
    //     populateTravelerTrips()
    //     getUserTotalSpent()
    //     helloUser()
    //     populateDestinationOptions()
    //   })
    // promise.then(data => {
    //     getData()
    //     renderTripCost()
    //     dataRepo = new DataRepo(data);
    //     dataRepo.currentTraveler.pendingTrips.push(newTrip)
    //     dataRepo.returnTripsForCurrentTraveler()
    //     dataRepo.returnPendingTripsForCurrentTraveler()
    //     individual = (dataRepo.returnCurrentTravelerById(id));
    //     populateTravelerTrips()
    //     getUserTotalSpent()
    //     populatePendingTrips()
    // });
  });

  function renderTripCost() {
     let newDestination = dataRepo.returnDestinationById(newTrip.destinationID)
      costs.innerText += ` $${dataRepo.calculateTripCost(newTrip, newDestination)}`
  }
 


