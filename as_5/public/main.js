window.onload = function () {
    //click handler 
    document
        .querySelector("#allItems")
        .addEventListener("click", handleTableClick );
    document.getElementById('add-tab').addEventListener('click', toggleMyForm)
    document.getElementById('update-tab').addEventListener('click', toggleMyForm)
    //add an item
    document.querySelector("#doneButton").addEventListener("click", chooseProcess);
    //update an item
    //document.querySelector("#update-tab").addEventListener("click", chooseProcess);
    document.getElementById("update-tab").disabled = true;
    //delete an item
    document.querySelector("#delete-tab").addEventListener("click", doDelete);
    document.getElementById("delete-tab").disabled = true;
    //cancel button
    document.querySelector("#cancelButton").addEventListener("click", doCancel);
    //refresh table
    refreshTable();
};

function toggleMyForm(){
    console.log('Touch')
    let form = document.querySelector('#input_panel');
    if(form.classList.contains('visually-hidden')){
        form.classList.remove('visually-hidden');
    }
}

function chooseProcess(){
    let add = document.getElementById('add-tab');
    let update = document.getElementById('update-tab');
    let del = document.getElementById('delete-tab');

    if(add.classList.contains('active')){
        doAdd();
        add.classList.remove('active');
    }else if(update.classList.contains('active')){
        doUpdate();
        update.classList.remove('active');
    }else if(del.classList.contains('active')){
        doDelete();
        del.classList.remove('active');
    }

}

//click handler
function handleTableClick(evt) {
    //console.log("IM BEING TOUCHED")
    let elem = evt.target;
    if (elem.nodeName !== "TD") return;
    clearSelections();
    let row = elem.parentElement;
    row.classList.add("selected");
    document.getElementById("delete-tab").disabled = false;
    document.getElementById("update-tab").disabled = false;
    document.getElementById("delete-tab").classList.add("navBtn")
    document.getElementById("update-tab").classList.add('navBtn')
    populateInputPanel();
}

function clearSelections() {
    let rows = document.querySelectorAll("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("selected");
    }
}

function populateInputPanel() {
    let temp;
    let row = document.querySelector(".selected");
    let tds = row.querySelectorAll("td");
    let id = Number(tds[0].innerHTML);
    let cat = tds[1].innerHTML;
    let des = tds[2].innerHTML;
    let price = Number(tds[3].innerHTML);
    let veg = tds[4].innerHTML;
    if(veg == "true")
    {
        temp = true;
    }
    else temp = false;
    document.querySelector("#id").value = id;
    document.querySelector("#category").value = cat
    document.querySelector("#description").value = des;
    document.querySelector("#price").value = price;
    document.querySelector("#vegetarian").checked = temp;
}

//get data from 
function getData(){
    let id = Number(document.querySelector("#id").value);
    let category = document.querySelector("#category").value;
    let description = document.querySelector("#description").value;
    let price = Number(document.querySelector("#price").value);
    let vegetarian = document.querySelector("#vegetarian").checked;
    let updateObj = {
        id: id,
        category: category,
        description: description,
        price: price,
        vegetarian: vegetarian,
    };
    return updateObj;
}

function refreshTable() {
    let url = "http://localhost:8000/api/menuitems";
    let method = "GET";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText); //JSON.parse ERROR
            if (xhr.status === 200) {
                buildTable(response.data);
            } else {
                alert(response.err);
            }
        }
    };
    xhr.open(method, url, true);
    xhr.send();
}

function buildTable(data) {
    let elem = document.querySelector("#allItems");
    let html = "<table>";
    html +=
        "<tr><th>ID</th><th>Category</th><th>Description</th><th>Price</th><th>Vegetarian</th></tr>";
    data.forEach((item) => {
        html += "<tr>";
        html += `<td>${item.id}</td>`;
        html += `<td>${item.category}</td>`;
        html += `<td>${item.description}</td>`;
        html += `<td>${item.price}</td>`;
        html += `<td>${item.vegetarian}</td>`;
        html += "</tr>";
    });
    html += "</table>";
    elem.innerHTML = html;
}


//ADD BUTTON
async function doAdd() {
    let updateObj = getData();
    console.log(updateObj)

    let url = "http://localhost:8000/api/menuitems/" + updateObj.id;
    const options = {
        method: "POST",
        body: JSON.stringify(updateObj),
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    if (response.status ==409){
        alert("Item Already exists");
    } else if (response.status == 500){
        alert("Server Error");
    }else if (response.status == 400){
        alert("Bad Request");
    }else{
        refreshTable();
    }
}

//UPDATE BUTTON
async function doUpdate() {
    let updateObj = getData();

    let url = "http://localhost:8000/api/menuitems/" + updateObj.id;
    const options = {
        method: "PUT",
        body: JSON.stringify(updateObj),
        headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, options);
    if (response.status == 404){
        alert("No data Changed");
    } else if (response.status == 500){
        alert("Server Error");
    }else if (response.status == 400){
        alert("Bad Request");
    }else{
        refreshTable();
    }
}

//DELETE BUTTON
async function doDelete() {
    let updateObj = getData();

    let url = "http://localhost:8000/api/menuitems/" + updateObj.id;
    const options = {
        method: "DELETE",
    };
    const response = await fetch(url, options);
    if (response.status == 404){
        alert("Item doenst Exists");
    } else if (response.status == 500){
        alert("Server Error");
    }else if (response.status == 400){
        alert("Bad Request");
    }else{
        refreshTable();
    }
}

//cancel button
function doCancel(){
    clearSelections();
    //set values to default
    document.querySelector("#id").innerHTML = "";
    document.querySelector("#category").innerHTML = "";
    document.querySelector("#description").innerHTML = "";
    document.querySelector("#price").innerHTML = "";
    document.querySelector("#vegetarian").checked = false;
    document.querySelector("#input_panel").style.display = "none";
}