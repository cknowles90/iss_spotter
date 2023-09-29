// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss_promised");
const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function(passTimes) { // new function to take in the values from the ISS Flyover API express them in
  for (const pass of passTimes) {            // current dates and the local time for live information output to the user
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;         // duration value is logged and expressed to the console
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}; 

// modulize the printPassTimes later on // 

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })

  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
  

// fetchMyIP() 
//   .then(fetchCoordsByIP) // uses fetchCoordsByIP as a callback, making it the next thing run after fetchMyIP;
//   .then(fetchISSFlyOverTimes)
//   .then(nextISSTimesForMyLocation)
//   .then(body => console.log(body)) // takes the response body as the callback and prints it to the console;