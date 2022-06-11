class Traveler {
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.travelerType = data.travelerType
        this.pastTrips = [];
        this.currentTrips = [];
        this.upcomingTrips = [];
        this.pendingTrips = [];
        this.totalSpent = 0;
    }
  
}
export default Traveler;