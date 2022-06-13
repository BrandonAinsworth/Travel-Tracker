import { expect } from 'chai';
import DataRepo from '../src/DataRepo';
import { tripsSampleData , tripsForOneUserSample } from './Sample-trips-data'
import Destination from '../src/Destination';
import destinationSampleData from './Sample-destination-data';
import travelerSampleData from './Sample-traveler-data'
import dayjs from "dayjs"

describe ('DataRepo', () => {

    let dataRepo;
    let tripsForOneUser;
    let travelersSample;
    let currentUser;
    let tripsForSampleUser;
    let pastTripsForSampleUser;
    let upcomingTripsForSampleUser;
    let currentTripsForSampleUser;
    let pendingTripsForSampleUser;
    let destination1;
    let destination2;
    let trip1;
    let trip2;
    let totalSpentForYearSample;

    beforeEach(() => {
      dataRepo = new DataRepo({
          'travelers': travelerSampleData,
          'destinations' : destinationSampleData,
          'trips' : tripsSampleData
      })
      tripsForOneUser = tripsForOneUserSample;
      travelersSample = travelerSampleData
      currentUser = dataRepo.currentTraveler    
      tripsForSampleUser = dataRepo.returnTripsForCurrentTraveler(29)
      pastTripsForSampleUser = dataRepo.returnPastTripsForCurrentTraveler()
      upcomingTripsForSampleUser = dataRepo.returnUpcomingTripsForCurrentTraveler()
      currentTripsForSampleUser = dataRepo.returnCurrentTripsForCurrentTraveler()
      pendingTripsForSampleUser = dataRepo.returnPendingTripsForCurrentTraveler()
      destination1 = dataRepo.destinations[0]
      destination2 = dataRepo.destinations[1]
      trip1 = dataRepo.trips[0]
      trip2 = dataRepo.trips[1]
      totalSpentForYearSample = dataRepo.calculateTotalSpentThisYear()

    });
  
    it('should be a function', function () {
      expect(DataRepo).to.be.a('function');
    });

    it(`should be an instance of Traveler`, () => {
      expect(dataRepo).to.be.instanceOf(DataRepo);
    });
    
    it('should return all trips for a specific user', () => {
        expect(currentUser.allTrips).to.deep.equal(tripsForOneUser)
        // expect(dataRepo.returnTripsForCurrentTraveler(1000)).to.deep.equal("You don't have any trips! But worry not, you're in the right place!")
    });

    it('should return a specific user by id', () => {
        expect(dataRepo.returnCurrentTravelerById(6)).to.be.equal(travelersSample[5])
    })

    it('should return specific destinations by id', () => {
        expect(dataRepo.returnDestinationById(2)).to.be.equal(destinationSampleData[1]);
    });

    it('should return past trips for a user', () => {
        let userPast = [
            [{
            "id": 40,
            "userID": 29,
            "destinationID": 50,
            "travelers": 3,
            "date": "2020/10/31",
            "duration": 13,
            "status": "approved",
            "suggestedActivities": []
            }, 
            {
            "id": 192,
            "userID": 29,
            "destinationID": 48,
            "travelers": 5,
            "date": "2019/09/24",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
            },
            {
            "id": 203,
            "userID": 29,
            "destinationID": 12,
            "travelers": 6,
            "date": "2021/08/08",
            "duration": 7,
            "status": "approved",
            "suggestedActivities": []
            }]
        ]
        expect(currentUser.pastTrips).to.deep.equal(userPast)
    });

    it('should return upcoming trips for a user', () => {
        let userUpcoming = [
            [{
            "id": 6,
            "userID": 29,
            "destinationID": 35,
            "travelers": 3,
            "date": "2022/06/29",
            "duration": 9,
            "status": "approved",
            "suggestedActivities": []
            },
            {
            "id": 200,
            "userID": 29,
            "destinationID": 23,
            "travelers": 6,
            "date": "2022/06/29",
            "duration": 7,
            "status": "approved",
            "suggestedActivities": []
            }]
        ]
        expect(currentUser.upcomingTrips).to.deep.equal(userUpcoming);
    });

    it('should return current trips for a user', () => {
        let userCurrent = [
            [{
            "id": 400,
            "userID": 29,
            "destinationID": 12,
            "travelers": 6,
            "date": "2022/06/08",
            "duration": 7,
            "status": "approved",
            "suggestedActivities": []
            }]
        ]

        expect(currentUser.currentTrips).to.deep.equal(userCurrent)
    });

    it('should return pending trips for a user', () => {
        let userPending = [
            [{
            "id": 401,
            "userID": 29,
            "destinationID": 12,
            "travelers": 6,
            "date": "2022/09/08",
            "duration": 7,
            "status": "pending",
            "suggestedActivities": []            
            }]
        ]
        expect(currentUser.pendingTrips).to.deep.equal(userPending)
    });

    it('should return the total cost of a trip', () => {
        expect(dataRepo.calculateTripCost(trip1, destination1)).to.deep.equal(1056);
        expect(dataRepo.calculateTripCost(trip2, destination2)).to.deep.equal(6270);
    });

    it('should return total amount a traveler spent for the year', () => {
        expect(currentUser.totalSpentForYear).to.be.equal(27984)

    });
});