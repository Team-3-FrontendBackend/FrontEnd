const baseURL = 'https://cms-societies.herokuapp.com/';
var creds = JSON.parse(sessionStorage.getItem('creds'));

var username = sessionStorage.getItem("user");
document.getElementById('username').innerHTML = username;

async function getProjectsData(){
    const options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${creds.token}`
        }
      }
      const response = await fetch(baseURL + "admin/joes-site", options);
      const data = await response.json()
      console.log(data);
      return data;
}


async function renderProjectsList(){
    const projectData = await getProjectsData()
    console.log(projectData);
    const ul = document.getElementById("projectList")
    ul.innerHTML = projectData.page.name;
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