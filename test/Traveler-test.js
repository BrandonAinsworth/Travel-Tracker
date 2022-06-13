// import { expect } from 'chai';
// import tripsSampleData from './Sample-trips-data';
// import Traveler from '../src/Traveler';
// import destinationSampleData from './Sample-destination-data';
// import travelerSampleData from './Sample-traveler-data';

// describe ('Trips', () => {

//     let destination;
//     let travelerRepo;
//     let traveler1;
  
//     beforeEach(() => {
//       traveler1 = new Traveler(travelerSampleData[0])
//     });
  
//     it('should be a function', function () {
//       expect(Traveler).to.be.a('function');
//     });

//     it(`should be an instance of Traveler`, () => {
//         expect(traveler1).to.be.instanceOf(Traveler);
//       });
    
//     it('should return a specific traveler', () => {
//         expect(traveler1.getTraveler()).to.be.equal(1);
//         console.log(traveler1.getTraveler(travelerSampleData))
//     });
// });  