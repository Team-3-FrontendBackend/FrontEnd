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
        "Authorization": `Bearer ${creds.token}`
      }
    }
    // "admin/joes-site" will be replaced with a dynamic value after the beackend team finishes that endpoint
    const response = await fetch(baseURL + "admin/joes-site/" + pageName , options);
    const data = await response.json()
    console.log(data);
    return data;
}