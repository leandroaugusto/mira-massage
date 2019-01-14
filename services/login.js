import axios from 'axios';

export default ({ email, password }) =>
  axios.post('https://reqres.in/api/login', {
    email,
    password
  });
