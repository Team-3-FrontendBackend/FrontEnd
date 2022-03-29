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
  constructor() {
  }
  // make a request to the server for a login token.
  // requires: { username: 'someusername', password: 'somepassword' }
  // returns: a valid jwt token if the username and password are valid.
  async loginRequest(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    const response = await fetch(baseURL + 'login', options).then(convertToJson);
    console.log(response);
    return response;
  }
}
