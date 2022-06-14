import Trip from "./Trips";
import Traveler from "./Traveler";
import Destination from "./Destination";
import dayjs from "dayjs";
import { tripsSampleData } from "../test/Sample-trips-data";
import travelerSampleData from "../test/Sample-traveler-data";
import destinationSampleData from "../test/Sample-destination-data";

class DataRepo {
    constructor(data){
        this.travelers = data[0]
        this.trips = data[1]
        this.destinations = data[2]
        this.currentTraveler = new Traveler()
        this.date = dayjs().format('YYYY/MM/DD')
    }
    returnCurrentTravelerById(id){
        let travlerInfo = this.travelers.travelers.find(traveler => id === traveler.id)
        this.currentTraveler.id = travlerInfo.id
        this.currentTraveler.name = travlerInfo.name
        this.currentTraveler.travelerType = travlerInfo.travelerType
        return travlerInfo
    }
    returnCurrentTravelerFirstName() {
        let firstName = this.currentTraveler.name.split(' ')[0]
        return firstName
    }
    returnDestinationById(id){
        let destFilter = this.destinations.destinations.find(dest => {
          return id === dest.id
        }) 
        return destFilter
    }
    returnTripsForCurrentTraveler(id){
        this.trips.trips.forEach(trip => {
        if (trip.userID === id){
             this.currentTraveler.allTrips.push(trip)
        }
        })
        // return this.trips.trips.filter(trip =>  {
        //     if (trip.userID === id){
        //     return this.currentTraveler.allTrips.push(trip)
        //     }
        // });
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
           return this.currentTraveler.pastTrips = pastTrips;
    }
    returnUpcomingTripsForCurrentTraveler(){
        let upcomingTrips = this.currentTraveler.allTrips.filter(trip => {
            if(trip.status === 'approved'){
            return trip.date > this.date
            }
        })
            return this.currentTraveler.upcomingTrips = upcomingTrips;
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
            return this.currentTraveler.currentTrips = currentTrips
    }
    returnPendingTripsForCurrentTraveler(){
        let pendingTrips = this.currentTraveler.allTrips.filter(trip => trip.status === 'pending')
        // console.log(pendingTrips)
            return this.currentTraveler.pendingTrips = pendingTrips;
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
            let destination = this.destinations.destinations.find(destination => {
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