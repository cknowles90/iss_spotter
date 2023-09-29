// Pair Programmed with Stephen Fraser - W2D4 -: @stephen-fraser - github/stephen-fraser

const request = require("request"); // importing the request module from node to make this code function... as is tradition - thank-you node.js.org!

const fetchMyIP = function(callback) { // function using API to fetch the users IP and present it in JSON language to be read more easily;
  const myIpURL = "https://api.ipify.org/?format=json";

  // our original formatting for this section of the code is commented out below in the APPENDIX - (1) //
  request(myIpURL, (error, response, body) => {
    if (error) return callback(error, null); // appreciate the simple, beautiful format of this code - thank-you LHL;
  
    if (response.statusCode !== 200) { // code format from LHL compass notes;
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip; // JSON.parse converts the API info into JavaScript language, and here it retrieves the value of ip;
    callback(null, ip);
  });
};
    
const fetchCoordsByIP = function(ip, callback) { // function using the ip retrieved by the previous function, inputs that data to obtain the
  const coordsURL = `http://ipwho.is/${ip}`;     // geo-coordinations of the user based on their IP address;
  
  request(coordsURL, (error, response, body) => {
    
    if (error) return callback(error, null); // followed the same simple format as discovered and implemented earlier (above) - LHL;
    
    const parsedBody = JSON.parse(body); // once again accesses the API and takes the information in as JSON;
    
    if (!parsedBody.success) { // .success is a cool new method - again introduced by LHL and MDN;
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
      
    const { latitude, longitude } = parsedBody; // takes the latitude and longitude values from the API in as an object
      
    callback(null, {latitude, longitude}); // callback returns the LAT LONG to the user (similar to a console.log);
  });
};
      
const fetchISSFlyOverTimes = function(coords, callback) { // new function (3) to take the returned values (if successful) from the earlier two functions;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`; // and pass them through the NASA ISS flyover API'
        
  request(url, (error, response, body) => { // request function follows the same format across all functions;
    if (error) {
      callback(error, null);
      return;
    }
            
    if (response.statusCode !== 200) { // only ever want to see statusCode 200!   "ALLS OKAY BABY!" - HTTP, probably;
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
              
    const passes = JSON.parse(body).response;
    callback(null, passes); // obtaining the passes value from the NASA API
  });
};
              
const nextISSTimesForMyLocation = function(callback) { // final function that ties all other functions together;
  fetchMyIP((error, ip) => {                           // specifically implemented to avoid "Callback Hell" - LHL says that it's bad;
    if (error) {
      return callback(error, null);
    }
    // takes in each function from earlier as a callback function
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
              
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
              
        callback(null, passTimes);
      });
    });
  });
};

/* interestingly enough, we did achieve this result of having the console spit out the results, one after another by nesting the functions
   inside the fetchMyIP function, before being asked to create the nextISSTimesForMyLocation function... something about "Hell?" haha */

/* overall really enjoyed this exercise, slowly starting to understand/wrap my head around API requests - definitely see their worth/value to
   the programming world */
                    
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};


/* APPENDIX OF ALTERED CODE - Code improved or removed /

### (1) - from fetchMyIP ###

if (response.statusCode !== 200) {
const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
callback(Error(msg), null);
return;

const data = JSON.parse(body);
const myIpAddress = data.ip;

callback(null, myIpAddress);
}
--------

### (2) - from fetchCoordsByIP ###

if (response.statusCode !== 200) {
  const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
  callback(Error(msg), null);
  return;
}

const data = JSON.parse(body);
const myLat = data.latitude;
const myLong = data.longitude;
const myCoords = {
  myLat,
  myLong
}

callback(null, myCoords);
}
*/