let ul = document.querySelector("ul");

let crudLink =
  "https://crudcrud.com/api/a39e2cbe3f664adb9cbb929fee000c03/Tasks";

function updateTotal() {
  var total = 0;
  fetch(crudLink, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      document.getElementById("total").innerText = "Total:" + res.length;
    
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  fetch(crudLink, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      document.getElementById("total").innerText = "Total:" + res.length;
      document.getElementById("show").innerText = "Showing:" + res.length;
      res.forEach((element) => {
        createItem(element.task, element.desc, element._id);
      });
    })
    .catch((err) => console.log(err));
});

function handleFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitted...");
  const task_name = document.getElementById("title");
  const task_desc = document.getElementById("desc");
  console.log(task_desc.value);
  console.log(task_name.value);
  fetch(crudLink, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: task_name.value, desc: task_desc.value }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      
      createItem(res.task, res.desc, res._id);
      console.log(res);
    })
    .catch((err) => console.log(err));
    updateTotal()
    updateShowing()
 

  task_desc.value = "";
  task_name.value = "";
}

function createItem(name, desc, id) {
  console.log(name);
  console.log(desc);
  console.log(id);
  let newItem = document.createElement("li");
  const l1 = document.createTextNode("Task: ");
  const tName = document.createTextNode(name);
  const l2 = document.createTextNode("Description: ");
  const tDesc = document.createTextNode(desc);
  const spacer = document.createTextNode(" ");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  span1.appendChild(l1);
  span2.appendChild(l2);
  span1.style.fontWeight = "bold";
  span2.style.fontWeight = "bold";
  newItem.appendChild(span1);
  newItem.appendChild(tName);
  newItem.appendChild(spacer);
  newItem.appendChild(spacer);
  newItem.appendChild(spacer);
  newItem.appendChild(span2);
  newItem.appendChild(tDesc);

  let delbtn = document.createElement("button");
  delbtn.appendChild(document.createTextNode("Delete"));
  let editbtn = document.createElement("button");
  editbtn.appendChild(document.createTextNode("Edit"));
  newItem.appendChild(delbtn);
  newItem.appendChild(editbtn);
  ul.appendChild(newItem);

  delbtn.addEventListener("click", (event) => {
    event.preventDefault();
    ul.removeChild(event.target.parentElement);
    fetch(`${crudLink}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        updateTotal();
        updateShowing();
      })
      .catch((err) => console.log(err));
  });

  editbtn.addEventListener("click", (event) => {
    event.preventDefault();
    ul.removeChild(event.target.parentElement);
    document.getElementById("title").value = name;
    document.getElementById("desc").value = desc;
    fetch(`${crudLink}/${id}`, {
      method: "DELETE",
    });
    updateShowing()
    updateTotal()
  });
}

const search = document.getElementById("search");

search.addEventListener("keyup", function (event) {
  event.preventDefault();
  
  let allitems = document.getElementsByTagName("li");
  console.log(allitems);
  if(event.target.value.trim()===""){
    for (let i = 0; i < allitems.length; i++) {
      allitems[i].style.display = "none";
    }
    fetch(crudLink, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        document.getElementById("total").innerText = "Total:" + res.length;
        document.getElementById("show").innerText = "Showing:" + res.length;
        res.forEach((element) => {
          createItem(element.task, element.desc, element._id);
        });
      })
      .catch((err) => console.log(err));

  }
  for (let i = 0; i < allitems.length; i++) {
    console.log("Child Nodes", allitems[i].childNodes[1]);
    if (
      allitems[i].childNodes[1].textContent.indexOf(event.target.value) === -1
    )
      allitems[i].style.display = "none";
  }
  updateShowing();

});

function updateShowing() {
  const listitems = document.querySelectorAll("li");
  let cnt = 0;
  listitems.forEach((item) => {
    const compstyle = window.getComputedStyle(item);
    if (compstyle.getPropertyValue("display") != "none") cnt++;
  });
  document.getElementById("show").innerText = "Showing:" +cnt;

}


