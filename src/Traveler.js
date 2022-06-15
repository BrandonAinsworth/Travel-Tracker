import DataRepo from "./DataRepo";
class Traveler {
    constructor(traveler) {
        this.id = traveler.id
        this.name = traveler.name
        this.travelerType = traveler.travelerType
        this.allTrips = [];
        this.pastTrips = [];
        this.currentTrips = [];
        this.upcomingTrips = [];
        this.pendingTrips = [];
        this.totalSpentForYear;
    }

    returnCurrentTravelerFirstName() {
        let firstName = this.name.split(' ')[0]
        return firstName
    }
    returnTripsForCurrentTraveler(trips) {
        trips.forEach(trip => {
            if (trip.userID === this.id) {
                this.allTrips.push(trip)
            }
        })
    }
    returnPastTripsForCurrentTraveler(date) {
        let pastTrips = this.allTrips.filter(trip => {
            let collapseTripDate = parseInt(trip.date.split('/').join(""))
            let addDuration = parseInt(trip.duration) + parseInt(collapseTripDate)
            let collapseTodayDate = parseInt(date.split('/').join(""))
            if (addDuration < collapseTodayDate) {
                return trip.date < date
            }
        })
        return this.pastTrips = pastTrips;
    }
    returnUpcomingTripsForCurrentTraveler(date) {
        let upcomingTrips = this.allTrips.filter(trip => {
            if (trip.status === 'approved') {
                return trip.date > date
            }
        })
        return this.upcomingTrips = upcomingTrips;
    }
    returnCurrentTripsForCurrentTraveler(date) {
        let currentTrips = this.allTrips.filter(trip => {
            let collapseTripDate = parseInt(trip.date.split('/').join(""))
            let addDuration = parseInt(collapseTripDate) + parseInt(trip.duration)
            let collapseTodayDate = parseInt(date.split('/').join(""))
            if (collapseTripDate < collapseTodayDate && addDuration > collapseTodayDate) {
                return trip
            }
        })
        return this.currentTrips = currentTrips
    }
    returnPendingTripsForCurrentTraveler() {
        let pendingTrips = this.allTrips.filter(trip => trip.status === 'pending')
        return this.pendingTrips = pendingTrips;
    }

    // calculateTotalSpentThisYear(traveler){
    //     let dataRepo = new DataRepo('')
    //     console.log('consoleDataREPo',dataRepo)
    //     let total = traveler.allTrips.reduce((acc, trip) => {
    //         if(trip.date.includes('2022')){
    //         let destination = dataRepo.destinations.destinations.find(destination => {
    //            return (trip.destinationID === destination.id)
    //         })
            
    //         acc += dataRepo.calculateTripCost(trip, destination)
    //         }
    //         return acc
    //     },0)
    //     traveler.totalSpentForYear = total
    //     return total
    // }

}
export default Traveler;