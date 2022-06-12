class Destination {
    constructor(data){
        this.destination = data
    }
    //retreive specific destinations method by id
    calculateTripCost() {
        let lodging = this.destination.estimatedLodgingPerDay * this.duration;
        let flight = this.destination.estimatedFlightCostPerPerson * this.travelers;
        let tripCost = lodging + flight;
        let agentFee = tripCost * 1.10;
            this.cost = agentFee
        return agentFee;
        }
   
}
export default Destination