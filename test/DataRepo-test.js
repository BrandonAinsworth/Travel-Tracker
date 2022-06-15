import {
  expect
} from 'chai';
import DataRepo from '../src/DataRepo';
import destinationSampleData from './Sample-destination-data';
import travelerSampleData from './Sample-traveler-data'
import sampleData from './Sample-data-repo';
import Traveler from '../src/Traveler';

describe('DataRepo', () => {

  let dataRepo;
  let travelers;
  let destination1;
  let destination2;
  let trip1;
  let trip2;
  let traveler;
  let testTraveler;
  let travelerRepo;
  let traveler1;

  beforeEach(() => {
    dataRepo = new DataRepo(sampleData)
    testTraveler = {
      id: 6,
      name: "Laverna Flawith",
      travelerType: "shopper"
    }
    traveler = new Traveler(testTraveler)
    travelers = travelerSampleData
    destination1 = dataRepo.destinations.destinations[0]
    destination2 = dataRepo.destinations.destinations[1]
    trip1 = dataRepo.trips.trips[0]
    trip2 = dataRepo.trips.trips[1]
    travelerRepo = travelerSampleData[0]
    traveler1 = new Traveler(travelerRepo)
    traveler1.returnTripsForCurrentTraveler(dataRepo.trips.trips)

  });

  it('should be a function', function () {
    expect(DataRepo).to.be.a('function');
  });

  it(`should be an instance of Data Repo`, () => {
    expect(dataRepo).to.be.instanceOf(DataRepo);
  });

  it('should return a specific traveler', () => {
    const currentTraveler = dataRepo.returnCurrentTravelerById(6)
    expect(currentTraveler.id).to.be.equal(6);
    expect(currentTraveler.name).to.be.equal('Laverna Flawith');
    expect(currentTraveler.travelerType).to.be.equal('shopper');
  });


  it('should return specific destinations by id', () => {
    expect(dataRepo.returnDestinationById(2)).to.be.equal(destinationSampleData[1]);
  });


  it('should return the total cost of a trip', () => {
    expect(dataRepo.calculateTripCost(trip1, destination1)).to.deep.equal(1056);
    expect(dataRepo.calculateTripCost(trip2, destination2)).to.deep.equal(6270);
  });

  it('should return the total amount a user spent for the year', () => {

    expect(dataRepo.calculateTotalSpentThisYear(traveler1)).to.be.equal(27984)
  })

});