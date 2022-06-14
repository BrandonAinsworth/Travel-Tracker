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
const wecomeUserLogIn = document.querySelector('.welcome-user-login')
const tripCards = document.querySelector('.trips-cards');
const dropDown = document.getElementById('destination');
const form = document.querySelector('.plan-new-trip');
const costs = document.querySelector('.costs');
const catchError = document.querySelector('.catch-error');
const logInButton = document.querySelector('.log-in-button');
// const travelerUserName = document.querySelector('.username');
// const password = document.querySelector('.password');
const bodyWrapper = document.querySelector('.body-wrapper');
const logInWrapper = document.querySelector('.log-in')
const userValidate = document.querySelector('.user-validate')
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

logInButton.addEventListener('click', (event) => {
    event.preventDefault()
    logIn()
})
//FUNCTIONS
const getRandomID = () => {
    return Math.floor(Math.random() * 50);
  }

let id;



function logIn() {
const travelerUserName = document.querySelector('.username');
const password = document.querySelector('.password');
if(travelerUserName.value && password.value && password.value === 'travel' && travelerUserName.value.includes('traveler')){
    id = parseInt(travelerUserName.value.slice(8))
    logInWrapper.classList.add('hidden')
    bodyWrapper.classList.remove('hidden')
    getData()
} else {
   const reAssign = () => {
        return userValidate.innerText = "Incorrect username or password"
    }
    let thisTimeout = setTimeout(reAssign, 5000)
    return thisTimeout;
}

}




function helloUser(){
    let usersName = dataRepo.returnCurrentTravelerFirstName()
    wecomeUserLogIn.innerText = `Welcome, ${usersName}`
    welcomeUser.innerText = `Welcome, ${usersName}`
}

function getData(){
    promise.then(data => {
      dataRepo = new DataRepo(data);
      individual = dataRepo.returnCurrentTravelerById(id)
      populateTravelerTrips()
      getUserTotalSpent()
      helloUser()
      populateDestinationOptions()
    })
    .catch(error => {
      console.log(error)
      catchError.innerText = 'We have encountered an error retrieving your data.'
    });
  }

function populateTravelerTrips(){
    dataRepo.returnTripsForCurrentTraveler(id)
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
        <article tabindex="0 class="trip-cards">
        <h4 tabindex="0 class="trip-destination">${destination.destination}</h4>
        <p tabindex="0 class="trip-status">Hope you had fun!</p>
        <img tabindex="0 class="trip-image" src="${destination.image}" alt="alt-text">
        <p tabindex="0 class="trip-date">Departure Date: ${trip.date}</p>
        <p tabindex="0 class="trip-duration">Travelers: ${trip.travelers}</p>
        <p tabindex="0 class="trip-duration">Nights: ${trip.duration}</p>
        <p tabindex="0 class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
        <p tabindex="0 class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
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
           <article tabindex="0 class="trip-cards">
           <h4 tabindex="0 class="trip-destination" >${destination.destination}</h4>
           <p tabindex="0 class="trip-status">Your trip is currently ${trip.status}!</p>
           <img tabindex="0 class="trip-image" src="${destination.image}" alt="alt-text">
           <p tabindex="0 class="trip-date">Departure Date: ${trip.date}</p>
           <p tabindex="0 class="trip-duration">Travelers: ${trip.travelers}</p>
           <p tabindex="0 class="trip-duration">Nights: ${trip.duration}</p>
           <p tabindex="0 class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
           <p tabindex="0 class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
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
           <article tabindex="0 class="trip-cards">
           <h4 tabindex="0 class="trip-destination">${destination.destination}</h4>
           <p tabindex="0 class="trip-status">Your trip is currently pending.</p>
           <img tabindex="0 class="trip-image" src="${destination.image}" alt="alt-text">
           <p tabindex="0 class="trip-date">Requested Departure Date: ${trip.date}</p>
           <p tabindex="0 class="trip-duration">Travelers: ${trip.travelers}</p>
           <p tabindex="0 class="trip-duration">Nights Requested: ${trip.duration}</p>
           <p tabindex="0 class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
           <p tabindex="0 class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
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
           <article tabindex="0 class="trip-cards">
           <h4 tabindex="0 class="trip-destination">${destination.destination}</h4>
           <p tabindex="0 class="trip-status">Your trip is currently underway!</p>
           <img tabindex="0 class="trip-image" src="${destination.image}" alt="alt-text">
           <p tabindex="0 class="trip-date">Departure Date: ${trip.date}</p>
           <p tabindex="0 class="trip-duration">Travelers: ${trip.travelers}</p>
           <p tabindex="0 class="trip-duration">Nights requested: ${trip.duration}</p>
           <p tabindex="0 class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
           <p tabindex="0 class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
         </article>
         <hr class="line">`
           }
       })
       tripCards.innerHTML = currentTripTemplate
   }

function populateDestinationOptions() {
    dataRepo.destinations.destinations.forEach(destination => {
        dropDown.innerHTML += `
        <option tabindex="0" name='destinationID' value="${destination.id}">${destination.destination}</option>
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
 


