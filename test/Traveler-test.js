import {
    expect
} from 'chai';
import tripsSampleData from './Sample-trips-data';
import Traveler from '../src/Traveler';
import destinationSampleData from './Sample-destination-data';
import travelerSampleData from './Sample-traveler-data';
import sampleData from './Sample-data-repo';
import DataRepo from '../src/DataRepo'

describe('Traveler', () => {

    let destination;
    let travelerRepo;
    let traveler1;
    let dataRepo

    beforeEach(() => {
        dataRepo = new DataRepo(sampleData)
        travelerRepo = travelerSampleData[0]
        traveler1 = new Traveler(travelerRepo)
        traveler1.returnTripsForCurrentTraveler(tripsSampleData)
    });

    it('should be a function', function () {
        expect(Traveler).to.be.a('function');
    });

    it(`should be an instance of Traveler`, () => {
        expect(traveler1).to.be.instanceOf(Traveler);
    });

    it('should return all trips for current traveler', () => {
    const tripsForOneUserSample = [{
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
    "id": 200,
    "userID": 29,
    "destinationID": 23,
    "travelers": 6,
    "date": "2022/06/29",
    "duration": 7,
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
    },
    {
    "id": 400,
    "userID": 29,
    "destinationID": 12,
    "travelers": 6,
    "date": "2022/06/08",
    "duration": 7,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 401,
    "userID": 29,
    "destinationID": 12,
    "travelers": 6,
    "date": "2022/09/08",
    "duration": 7,
    "status": "pending",
    "suggestedActivities": []
    }]   

        expect(traveler1.allTrips).to.deep.equal(tripsForOneUserSample)
        // expect(dataRepo.returnTripsForCurrentTraveler(1000)).to.deep.equal("You don't have any trips! But worry not, you're in the right place!")
    });

    it('should return past trips for current traveler', () => {
        let userPast = 
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
                }
            ]
        traveler1.returnPastTripsForCurrentTraveler("2022/06/14")
        expect(traveler1.pastTrips).to.deep.equal(userPast)
    });

    it('should return upcoming trips for current traveler', () => {
        traveler1.returnUpcomingTripsForCurrentTraveler("2022/06/14")
        let userUpcoming = [
            {
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
                } 
        ]
        expect(traveler1.upcomingTrips).to.deep.equal(userUpcoming);
    });

    it('should return current trips for current traveler', () => {
        traveler1.returnCurrentTripsForCurrentTraveler("2022/06/14")
        let userCurrent = [
            {
                "id": 400,
                "userID": 29,
                "destinationID": 12,
                "travelers": 6,
                "date": "2022/06/08",
                "duration": 7,
                "status": "approved",
                "suggestedActivities": []
            }
        ]

        expect(traveler1.currentTrips).to.deep.equal(userCurrent)
    });

    it('should return pending trips for current traveler', () => {
        traveler1.returnPendingTripsForCurrentTraveler()
        let userPending = [
            {
                "id": 401,
                "userID": 29,
                "destinationID": 12,
                "travelers": 6,
                "date": "2022/09/08",
                "duration": 7,
                "status": "pending",
                "suggestedActivities": []
            }
        ]
        expect(traveler1.pendingTrips).to.deep.equal(userPending)
    });

});