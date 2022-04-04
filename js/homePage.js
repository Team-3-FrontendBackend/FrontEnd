const baseURL = 'https://cms-societies.herokuapp.com/';
var creds = JSON.parse(sessionStorage.getItem('creds'));

var username = sessionStorage.getItem("user");
document.getElementById('username').innerHTML = username;

async function getPageLinks(){
    const options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${creds.token}`
        }
      }
      const response = await fetch(baseURL + "admin", options);
      const data = await response.json()
      console.log(data);
      return data;
}


async function renderProjectsList(){

    const pageLinks = await getPageLinks();
    // store home url in session storage
    window.sessionStorage.setItem('homeURL',pageLinks.links[1]);


    let siteUrl = getLinkName(pageLinks.links[1]);
    
    const ul = document.getElementById("projectList");
    ul.innerHTML = `
    <li><a href="site-preview.html?url=${siteUrl}">Visit your Website: ${siteUrl}</a></li>
    <li><a href="page-editor.html?url=${siteUrl}">Edit your site's content</a></li>
    <li><a href="globalDataManager.html?url=${siteUrl}">Edit your site's style</a></li>
    `;
    
}

// Split link name, store appropraite endpoint in session storage for page editor

function getLinkName(link) {
  let spliturl = link.split(".com/admin/");
    return spliturl[1];
}
renderProjectsList();
