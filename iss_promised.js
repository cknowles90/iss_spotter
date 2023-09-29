const request = require('request-promise-native'); // promise module requested from node.js.org

const fetchMyIP = function() { // fetchMyIP function uses promises to return the users ip;
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = function(body) {  // fetchCoordsByIP using promises
  const ip = JSON.parse(body).ip;         // need to parse the JSON string and extract the ip value from it;
  return request(`http://ipwho.is/${ip}`) // request to ipwho.is and return the promise from the request '${iq}';
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};