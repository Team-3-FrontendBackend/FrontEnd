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
      console.log(data.link);
      return data;
}


async function renderProjectsList(){
    const pageLinks = await getPageLinks();
    // store home url in session storage
    window.sessionStorage.setItem('homeURL',pageLinks.links[0]);
    const ul = document.getElementById("projectList");
    ul.innerHTML = pageLinks.links.map(link=> `<li><a href="page-editor.html">${getLinkName(link)}</a></li>`).join("");
    // put ending url in local storage
   
}

// Split link name, store appropraite endpoint in session storage for page editor

function getLinkName(link) {
  let spliturl = link.split(".com/admin/");
    return spliturl[1];
}
renderProjectsList();










// async showOrders() {
//     try {
//       const orders = await this.services.getOrders(this.token);
//       this.mainElement.innerHTML = orderHtml();
//       const parent = document.querySelector("#orders tbody");
//       parent.innerHTML = orders.map(order=> `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td><td>${order.items.length}</td><td>${order.orderTotal}</td></tr>`).join("");
//     } catch(err) {
//       console.log(err);
//     }
//   }