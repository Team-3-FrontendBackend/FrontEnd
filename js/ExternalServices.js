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
    return response;
  }
}

export class EditorExternalServices  {
  constructor() {
  }
  async updatePage(pageData, token) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // pass in authorization token here
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pageData)
    }
    // Figure out how to pass the name to the API, maybe use local storage
    const response = await fetch(baseURL + 'admin/', options).then(convertToJson);
    return response;
  }
}