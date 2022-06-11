import { expect } from 'chai';
import TripsRepo from '../src/TripsRepo';
import { tripsSampleData , tripsForOneUserSample } from './Sample-trips-data'

describe ('Trips', () => {

    let tripsRepo;
    let tripsForOneUser;
  
    beforeEach(() => {
      tripsRepo = new TripsRepo(tripsSampleData);
      tripsForOneUser = tripsForOneUserSample
    });
  
    it('should be a function', function () {
      expect(TripsRepo).to.be.a('function');
    });

    it(`should be an instance of Traveler`, () => {
        expect(tripsRepo).to.be.instanceOf(TripsRepo);
      });
    
    it('should return all trips for a specific user', () => {
        expect(tripsRepo.returnSpecficTripsForUser(29)).to.deep.equal(tripsForOneUser)
        expect(tripsRepo.returnSpecficTripsForUser(1000)).to.deep.equal("You don't have any trips! But worry not, you're in the right place!")
    });
})  