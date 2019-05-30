var axios = require('axios');

var authClient = axios.create({
  baseURL: 'https://buh.uchet.kz/bmg_test_db/hs/toolbox',
  headers: {
    'Authorization': 'Basic T0RhdGFVc2VyOkYxcnN0QjF0=',
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});
/*
var client =  axios.create({
  baseURL: 'http://localhost:8080/userjwt/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
*/
module.exports.authClient = authClient;

//module.exports.default = client;