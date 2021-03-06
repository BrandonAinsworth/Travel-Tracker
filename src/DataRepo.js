import Traveler from "./Traveler";
import dayjs from "dayjs";

class DataRepo {
    constructor(data) {
        this.travelers = data[0]
        this.trips = data[1]
        this.destinations = data[2]
        this.date = dayjs().format('YYYY/MM/DD')
    }
    returnCurrentTravelerById(id) {
        let travlerInfo = this.travelers.travelers.find(traveler => id === traveler.id)
        const traveler = new Traveler(travlerInfo)
        return traveler
    }
    returnDestinationById(id) {
        let destFilter = this.destinations.destinations.find(dest => {
            return id === dest.id
        })
        return destFilter
    }
    calculateTripCost(trip, destination) {
        let lodging = destination.estimatedLodgingCostPerDay * trip.duration;
        let flight = destination.estimatedFlightCostPerPerson * trip.travelers;
        let tripCost = lodging + flight;
        let totalWithAgentFee = Math.floor(tripCost * 1.10);
        return parseInt(totalWithAgentFee);
    }

    calculateTotalSpentThisYear(traveler) {
        let total = traveler.allTrips.reduce((acc, trip) => {
            if (trip.date.includes('2022')) {
                let destination = this.destinations.destinations.find(destination => {
                    return (trip.destinationID === destination.id)
                })
                acc += this.calculateTripCost(trip, destination)
            }
            return acc
        }, 0)
        traveler.totalSpentForYear = total
        return total
    }
}
export default DataRepo;