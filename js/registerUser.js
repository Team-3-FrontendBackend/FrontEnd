url = "";

async function convertToJson(res) {
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      throw { name: 'servicesError', message: data };
    }
  }

export default class createUser{
    constructor(username, password, siteName){
        this.username = username;
        this.password = password;
        this.siteName = siteName;
        this.siteUrl = "";
        this.userBody = "";
    }

    init(){
        // Format siteUrl 
        this.siteUrl = this.siteName.replaceAll(" ", "-");

        // Create js object.
        requestBody = {
            userName: this.userName,
            password: this.password,
            siteName: this.siteName,
            siteUrl: this.siteUrl
        };

        this.userBody = JSON.stringify(requestBody);
    }

    sendRequest(){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.userBody)
        }
        const response = await fetch(baseURL + 'signup', options).then(convertToJson);
        return response

    }
}