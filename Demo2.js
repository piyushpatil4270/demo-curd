
const ul = document.getElementById("booklist");
function handleFormSubmit(event) {
  event.preventDefault();
  console.log("form submitted...");
  let title = document.getElementById("title");
  let desc = document.getElementById("desc");
  fetch("https://crudcrud.com/api/cce3efe4fd534fa49204c55528ee849e/Notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({title:title.value,description:desc.value}),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res);
      addElement(title.value, desc.value, res._id);

      title.value = "";
      desc.value = "";
    })
    .catch((err) => console.log(err));
}
function addElement(title, desc, id) {
  const newlist = document.createElement("li");
  newlist.className = "booklist";
  const listt = document.createTextNode(title);
  const listd = document.createTextNode(desc);
  const delbtn = document.createElement("button");
  delbtn.appendChild(document.createTextNode("Delete"));
  newlist.appendChild(document.createTextNode("Title: "));
  newlist.appendChild(listt);
  newlist.appendChild(document.createTextNode("  "));
  newlist.appendChild(document.createTextNode("Desc: "));
  newlist.appendChild(listd);
  newlist.appendChild(delbtn);
  delbtn.addEventListener("click", function (event) {
    ul.removeChild(event.target.parentElement);
    deletenote(id);
  });

  ul.appendChild(newlist);
}

const search = document.getElementById("search");
const booklist = document.querySelectorAll("li");
search.addEventListener("keyup", function (event) {
  event.preventDefault();
  console.log("clicked...");
  const booklist = document.querySelectorAll("#booklist li");

  // Now you can map through the dynamically created <li> elements
  booklist.forEach((list) => {
    console.log(list.childNodes[1]);
    if (list.childNodes[1].textContent.indexOf(event.target.value) == -1) {
      list.style.display = "none";
    }
  });
});

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function (event) {
  const searchTerm = event.target.value.trim(); // Trim any whitespace
  if (searchTerm === "") {
    restoreHiddenLiElements();
  }
});
function restoreHiddenLiElements() {
  const ul = document.getElementById("booklist");

  const liElements = ul.querySelectorAll("li");
  liElements.forEach(function (li) {
    li.style.display = "list-item";
  });
}

function post(title, desc) {
  fetch("https://crudcrud.com/api/cce3efe4fd534fa49204c55528ee849e/Notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, description: desc }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => console.log(err));
}

function deletenote(id) {
  fetch(
    `https://crudcrud.com/api/cce3efe4fd534fa49204c55528ee849e/Notes/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}


document.addEventListener("DOMContentLoaded",function(){
    fetch(
        `https://crudcrud.com/api/cce3efe4fd534fa49204c55528ee849e/Notes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res)
        for(let i=0;i<res.length;i++){
            addElement(res[i].title,res[i].description,res[i]._id)
        }
      })
      .catch((err) => console.log(err));

})