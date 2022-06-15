// import TripsRepo from '../src/TripsRepo'
// import { tripsSampleData } from '../test/Sample-trips-data';

class Destination {
    constructor(data){
        this.destination = data
        this.trips = new TripsRepo([
            tripsSampleData[0],
            tripsSampleData[1],
            tripsSampleData[2],
            tripsSampleData[3]
        ])
    }

    calculateTripCost(trip, destination) {
        let lodging = destination.destination.estimatedLodgingCostPerDay * trip.duration;
        let flight = destination.destination.estimatedFlightCostPerPerson * trip.travelers;
        let tripCost = lodging + flight;
        let totalWithAgentFee = tripCost * 1.10;
        return parseInt(totalWithAgentFee);
        }
}
export default Destination