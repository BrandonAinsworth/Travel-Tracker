import TravelerRepo from "./TravelerRepo";
import Trips from '../src/Trips'
class Traveler {
    constructor(data){
        this.id;
        this.name;
        this.travelerType;
        this.allTrips = [];
        this.pastTrips = [];
        this.currentTrips = [];
        this.upcomingTrips = [];
        this.pendingTrips = [];
        this.totalSpentForYear = 0;
    }
}
export default Traveler;