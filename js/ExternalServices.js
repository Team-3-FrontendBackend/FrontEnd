const baseURL = 'https://cms-societies.herokuapp.com/';
               

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export default class ExternalServices  {
  // As part of option you can pass signup or login.
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  // make a request to the server for a login token.
  // requires: { username: 'someusername', password: 'somepassword' }
  // returns: a valid jwt token if the username and password are valid.
  async apiRequest(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    // Instead of baseURL + login, I changed to make it reusable.
    const response = await fetch(baseURL + this.endpoint, options).then(convertToJson);
    return response;
  }
}
