class Trip {
    constructor(data){
        this.trips = data.trips
        this.id = data.id
        this.userID = data.userID
        this.destinationID = data.destinationID
        this.travelers = data.travelers
        this.date = data.date
        this.duration = data.duration
        this.status = data.status
        this.suggestedActivites = data.suggestedActivites
        this.destination = destination
        this.cost;
    }
    calculateTripCost() {
        let lodging = this.destination.estimatedLodgingPerDay * this.duration;
        let flight = this.destination.estimatedFlightCostPerPerson * this.travelers;
        let tripCost = lodging + flight;
        let agentFee = tripCost * 1.10;
            this.cost = agentFee
        return agentFee;
        }
    //method to return specific user id push to relevant array 
    //new Date() W3 /MDN 
    //method calculate the cost of the trip 
    //method to add agent fee
    //method to retrieve trips from a certain frame
    //method to POST new trip to database and add to pending trips
    
}
export default Trip