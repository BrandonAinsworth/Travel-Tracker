import { expect } from 'chai';
import Destinations from '../src/Destinations';
import destinationSampleData from './Sample-destination-data';

describe ('Destinations', () => {

    let destination;
    let sampleDestination = destinationSampleData
  
    beforeEach(() => {
      destination = new Destinations(destinationSampleData);
    });
  
    it('should be a function', function () {
      expect(Destinations).to.be.a('function');
    });

    it(`should be an instance of Destinations`, () => {
        expect(destination).to.be.instanceOf(Destinations);
      });

    it('should be equal to destination data', () => {
      expect(destination.destinations).to.deep.equal(destinationSampleData)
    });

    it.skip('should return specific destination by id', () => {
      expect(destination.getDestinationById(1)).to.be.equal(sampleDestination[0])
    });

});