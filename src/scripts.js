import DataRepo from '../src/DataRepo';
import {promise} from './apiCalls';
import Traveler from './Traveler';
import './css/styles.css';
import './images/turing-logo.png'
import './images/around-the-world.png'

//GLOBAL VARIABLES

let dataRepo;
let individual;
let newTrip;
let currentTraveler;

//QUERY SELECTORS
const pastButton = document.getElementById('past');
const currentButton = document.getElementById('present');
const upcomingButton = document.getElementById('upcoming');
const pendingButton = document.getElementById('pending');
const saveTripButton = document.getElementById('submit-trip');
const totalYearSpent = document.querySelector('.total-year');
const welcomeUser = document.querySelector('.welcome-user');
const tripCards = document.querySelector('.trips-cards');
const dropDown = document.getElementById('destination');
const form = document.querySelector('.plan-new-trip');
const costs = document.querySelector('.costs');
const catchError = document.querySelector('.catch-error');

//EVENT LISTENERS
pastButton.addEventListener('click', () => {
    populatePastTrips()
})
upcomingButton.addEventListener('click', () => {
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

const id = getRandomID()

getData()

function helloUser() {
    let userName = currentTraveler.returnCurrentTravelerFirstName()
    welcomeUser.innerText = `Welcome, ${userName}`
}

function getData() {
    promise.then(data => {
            dataRepo = new DataRepo(data);
            individual = (dataRepo.returnCurrentTravelerById(id));
            currentTraveler = new Traveler(individual)
            helloUser()
            populateTravelerTrips()
            getUserTotalSpent()
            populateDestinationOptions()
        })
        .catch(error => {
            console.log(error)
            catchError.innerText = 'We have encountered an error retrieving your data.'
        });
}

function populateTravelerTrips() {
    let userTrips = dataRepo.trips.trips
    currentTraveler.returnTripsForCurrentTraveler(userTrips)
    let dateOfToday = dataRepo.date
    currentTraveler.returnPastTripsForCurrentTraveler(dateOfToday)
    currentTraveler.returnUpcomingTripsForCurrentTraveler(dateOfToday)
    currentTraveler.returnCurrentTripsForCurrentTraveler(dateOfToday)
    currentTraveler.returnPendingTripsForCurrentTraveler(dateOfToday)
}

function getUserTotalSpent() {
    let totalSpent = dataRepo.calculateTotalSpentThisYear(currentTraveler)
    if (totalSpent === 0) {
        totalYearSpent.innerText = "No trips this year"
    } else {
        totalYearSpent.innerText = `$${totalSpent}`
    }
}

function populatePastTrips() {
    const pastTripTemplate = currentTraveler.pastTrips.map(trip => {
        let destination = dataRepo.returnDestinationById(trip.destinationID)
        if (!destination) {
            return tripCards.innerText = 'No Current Trips';
        } else {
            return `
        <article tabindex="0" class="trip-cards">
        <h4 tabindex="0" class="trip-destination">${destination.destination}</h4>
        <p tabindex="0" class="trip-status">Hope you had fun!</p>
        <img tabindex="0" class="trip-image" src="${destination.image}" alt="alt-text">
        <p tabindex="0" class="trip-date">Departure Date: ${trip.date}</p>
        <p tabindex="0" class="trip-duration">Travelers: ${trip.travelers}</p>
        <p tabindex="0" class="trip-duration">Nights: ${trip.duration}</p>
        <p tabindex="0" class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
        <p tabindex="0" class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
      </article>
      <hr class="line">`
        }
    })
    tripCards.innerHTML = pastTripTemplate
}

function populateUpcomingTrips() {
    const upcomingTripTemplate = currentTraveler.upcomingTrips.map(trip => {
        let destination = dataRepo.returnDestinationById(trip.destinationID)
        if (!destination) {
            return tripCards.innerText = 'No Current Trips';
        } else {
            return `
           <article tabindex="0" class="trip-cards">
           <h4 tabindex="0" class="trip-destination" >${destination.destination}</h4>
           <p tabindex="0" class="trip-status">Your trip is currently ${trip.status}!</p>
           <img tabindex="0" class="trip-image" src="${destination.image}" alt="alt-text">
           <p tabindex="0" class="trip-date">Departure Date: ${trip.date}</p>
           <p tabindex="0" class="trip-duration">Travelers: ${trip.travelers}</p>
           <p tabindex="0" class="trip-duration">Nights: ${trip.duration}</p>
           <p tabindex="0" class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
           <p tabindex="0" class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
         </article>
         <hr class="line">`
        }
    })
    tripCards.innerHTML = upcomingTripTemplate
}

function populatePendingTrips() {
    const pendingTripTemplate = currentTraveler.pendingTrips.map(trip => {
        let destination = dataRepo.returnDestinationById(trip.destinationID)
        if (!destination) {
            return tripCards.innerText = 'No Current Trips';
        } else {
            return `
           <article tabindex="0" class="trip-cards">
           <h4 tabindex="0" class="trip-destination">${destination.destination}</h4>
           <p tabindex="0" class="trip-status">Your trip is currently pending.</p>
           <img tabindex="0" class="trip-image" src="${destination.image}" alt="alt-text">
           <p tabindex="0" class="trip-date">Requested Departure Date: ${trip.date}</p>
           <p tabindex="0" class="trip-duration">Travelers: ${trip.travelers}</p>
           <p tabindex="0" class="trip-duration">Nights Requested: ${trip.duration}</p>
           <p tabindex="0" class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
           <p tabindex="0" class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
         </article>
         <hr class="line">`
        }
    })
    tripCards.innerHTML = pendingTripTemplate
}

function populateCurrentTrips() {
    const currentTripTemplate = currentTraveler.currentTrips.map(trip => {
        let destination = dataRepo.returnDestinationById(trip.destinationID)
        if (!destination) {
            return tripCards.innerText = 'No Current Trips';
        } else {
            return `
           <article tabindex="0" class="trip-cards">
           <h4 tabindex="0" class="trip-destination">${destination.destination}</h4>
           <p tabindex="0" class="trip-status">Your trip is currently underway!</p>
           <img tabindex="0" class="trip-image" src="${destination.image}" alt="alt-text">
           <p tabindex="0" class="trip-date">Departure Date: ${trip.date}</p>
           <p tabindex="0" class="trip-duration">Travelers: ${trip.travelers}</p>
           <p tabindex="0" class="trip-duration">Nights requested: ${trip.duration}</p>
           <p tabindex="0" class="trip-lodging">Cost per Night: $${destination.estimatedLodgingCostPerDay}</p>
           <p tabindex="0" class="trip-flights">Flight Cost per Person: $${destination.estimatedFlightCostPerPerson}</p>
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

function postNewTrip(newTrip) {
    return fetch('http://localhost:3001/api/v1/trips', {
            method: 'POST',
            body: JSON.stringify(newTrip),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log('Error'))
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    newTrip = {
        id: dataRepo.trips.trips.length + 1,
        userID: currentTraveler.id,
        destinationID: parseInt(formData.get('destinate')),
        travelers: parseInt(formData.get('travelers')),
        date: formData.get('date').split('-').join('/'),
        duration: parseInt(formData.get('duration')),
        status: 'pending',
        suggestedActivities: []
    };
    e.target.reset();
    postNewTrip(newTrip).then(data => {
        dataRepo.trips.trips.push(data.newTrip)
        populateTravelerTrips()
        renderTripCost()
        getUserTotalSpent()
    })
});

function renderTripCost() {
    let newDestination = dataRepo.returnDestinationById(newTrip.destinationID)
    costs.innerText += ` $${dataRepo.calculateTripCost(newTrip, newDestination)}`
}