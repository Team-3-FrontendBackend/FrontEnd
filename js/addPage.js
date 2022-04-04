const addPageButton = document.getElementById("createPageButton")
addPageButton.addEventListener('click', addPage);
const baseURL = 'https://cms-societies.herokuapp.com/';
var creds = JSON.parse(sessionStorage.getItem('creds'));

async function addPage(){
  const pageName = document.querySelector("#newPage").value;
  // Need to change endpoint when backup team finishes, 'admin/joes-site' is just a hardcoded filler for the moment
  // Right now we are using the request for home pages, need to change it when the backend finishes the endpoint for all pages
  
  try {
    response = createPage(pageName)
    console.log(response); 
    // This is where the response will be manipulated and placed on the page
}
  catch(err){
    console.log(err);
}
}


async function createPage(pageName){
  const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${creds.token}`
      },
      body: JSON.stringify({name: pageName, contentTemplates: [{}]})
    }
    // "admin/joes-site" will be replaced with a dynamic value after the beackend team finishes that endpoint
    // get home url from session storage
    const homeURL = sessionStorage.getItem('homeURL')
    const newPageURL = homeURL + '/' + pageName
    const response = await fetch(newPageURL, options);
    const data = await response.json();
    location.reload();
    console.log(data);
    return data;
}

