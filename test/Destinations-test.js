// import { expect } from 'chai';
// import Destination from '../src/Destination';
// import destinationSampleData from './Sample-destination-data';
// import{ tripsForOneUserSample } from './Sample-trips-data' 

// describe ('Destination', () => {

//     let destination1;
//     let destination2;
//     let sampleDestination;
//     let sampleTrip;
  
//     beforeEach(() => {
//       destination1 = new Destination(destinationSampleData[0]);
//       destination2 = new Destination(destinationSampleData[1]);
//       sampleDestination = destinationSampleData
//       sampleTrip = tripsForOneUserSample
//     });
  
//     it('should be a function', function () {
//       expect(Destination).to.be.a('function');
//     });

//     it(`should be an instance of Destinations`, () => {
//         expect(destination1).to.be.instanceOf(Destination);
//       });

//     it('should calculate the cost of a trip', () => {
//       expect(destination1.calculateTripCost(destination1.trips.allTripsData[0], destination1)).to.deep.equal(1056);
//       expect(destination2.calculateTripCost(destination2.trips.allTripsData[1], destination2)).to.deep.equal(6270);
//     });
// });