import Trip from "./Trips";
import Traveler from "./Traveler";
import Destination from "./Destination";
import dayjs from "dayjs";
import { tripsSampleData } from "../test/Sample-trips-data";
import travelerSampleData from "../test/Sample-traveler-data";
import destinationSampleData from "../test/Sample-destination-data";

class DataRepo {
    constructor(data){
        this.travelers = data.travelers
        this.trips = data.trips
        this.destinations = data.destinations
        this.currentTraveler = new Traveler()
        this.date = dayjs().format('YYYY/MM/DD')
    }
    returnCurrentTravelerById(id){
        let travlerInfo = this.travelers.find(traveler => id === traveler.id)
        this.currentTraveler = travlerInfo
        return travlerInfo
    }
    returnCurrentTravelerFirstName() {
        let firstName = this.currentTraveler.name.split(' ')[0]
        return firstName
    }
    returnDestinationById(id){
        let destFilter = this.destinations.find(dest => id === dest.id)
        return destFilter
    }
    returnTripsForCurrentTraveler(id){
        return this.trips.filter(trip =>  {
            if (trip.userID === id){
            return this.currentTraveler.allTrips.push(trip)
            }
        });
    }
    returnPastTripsForCurrentTraveler(){
       let pastTrips = this.currentTraveler.allTrips.filter(trip => {
           let collapseTripDate = parseInt(trip.date.split('/').join(""))
           let addDuration = parseInt(trip.duration) + parseInt(collapseTripDate)
           let collapseTodayDate = parseInt(this.date.split('/').join(""))
             if(addDuration < collapseTodayDate){
                return trip.date < this.date
             }
           })
           return this.currentTraveler.pastTrips.push(pastTrips);
    }
    returnUpcomingTripsForCurrentTraveler(){
        let pastTrips = this.currentTraveler.allTrips.filter(trip => {
            if(trip.status === 'approved'){
            return trip.date > this.date
            }
        })
            return this.currentTraveler.upcomingTrips.push(pastTrips);
    }
    returnCurrentTripsForCurrentTraveler(){
            let currentTrips = this.currentTraveler.allTrips.filter(trip => {
            let collapseTripDate = parseInt(trip.date.split('/').join(""))
            let addDuration = parseInt(collapseTripDate) + parseInt(trip.duration)
            let collapseTodayDate = parseInt(this.date.split('/').join(""))
            if(collapseTripDate < collapseTodayDate && addDuration > collapseTodayDate){
                return trip
            }
        })
            return this.currentTraveler.currentTrips.push(currentTrips);
    }
    returnPendingTripsForCurrentTraveler(){
        let pendingTrips = this.currentTraveler.allTrips.filter(trip => {
            return trip.status === 'pending'
        })
            return this.currentTraveler.pendingTrips.push(pendingTrips);
    }
    calculateTripCost(trip, destination) {
        let lodging = destination.estimatedLodgingCostPerDay * trip.duration;
        let flight = destination.estimatedFlightCostPerPerson * trip.travelers;
        let tripCost = lodging + flight;
        let totalWithAgentFee = Math.floor(tripCost * 1.10);
        return parseInt(totalWithAgentFee);
        }

    calculateTotalSpentThisYear(){
        let total = this.currentTraveler.allTrips.reduce((acc, trip) => {
            if(trip.date.includes('2022')){
            let destination = this.destinations.find(destination => {
               return (trip.destinationID === destination.id)
            })
            acc += this.calculateTripCost(trip, destination)
            }
            return acc
        },0)
        this.currentTraveler.totalSpentForYear = total
        return total
    }
    }
export default DataRepo;