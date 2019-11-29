import axios from 'axios';

// Fake Login
// "email": "eve.holt@reqres.in"
// "password": "cityslicka"

export default ({ email, password }) =>
  axios.post('https://reqres.in/api/login', {
    email,
    password
  });
