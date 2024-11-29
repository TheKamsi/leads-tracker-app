import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getDatabase,
            ref,
            push,
            onValue,
            remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-52795-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">${leads[i]}
            </a>
        </li>
        `
    }

    ulEl.innerHTML = listItems
}

onValue(refInDB, function(snapshot){
    const isSnapshotAvailable = snapshot.exists()
    if(isSnapshotAvailable){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshot.val())
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function(){
    alert("Are you sure you want to delete the leads?")
    remove(refInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(refInDB, inputEl.value)
    inputEl.value = ""
})