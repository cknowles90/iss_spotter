// Pair Programmed with Stephen Fraser - W2D4 -: @stephen-fraser - github/stephen-fraser

const { nextISSTimesForMyLocation } = require("./iss");

const printPassTimes = function(passTimes) { // new function to take in the values from the ISS Flyover API express them in
  for (const pass of passTimes) {            // current dates and the local time for live information output to the user
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;         // duration value is logged and expressed to the console
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});


// EARLIER CODED CALLBACK FUNCTIONS TO TEST EACH STAGE OF THE PROCESS INDIVIDUALLY //


// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
  
//   console.log("It worked! Returned IP:" , ip)
  
//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
  
//     console.log("It worked! Returned coordinates:" , coordinates);
    
//     fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }
    
//       console.log("It worked! Returned flyover times:" , passTimes);
//     });
//   });
// });