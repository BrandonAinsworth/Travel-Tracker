import { expect } from 'chai';
import Destination from '../src/Destination';
import destinationSampleData from './Sample-destination-data';
import DestinationsRepo from '../src/DestinationsRepo'

describe ('DestinationRepo', () => {

    let destinationRepo;
    let destination1;
  
    beforeEach(() => {
      destinationRepo = new DestinationsRepo(destinationSampleData);
      destination1 = new Destination(destinationSampleData[0])
    });
  
    it('should be a function', function () {
      expect(DestinationsRepo).to.be.a('function');
    });

    it(`should be an instance of DestinationRepo`, () => {
        expect(destinationRepo).to.be.instanceOf(DestinationsRepo);
      });

    it('should return specific destinations by id', () => {
        expect(destinationRepo.getDestinationById(2)).to.be.equal(destinationSampleData[1]);
    });  
    });