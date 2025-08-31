// Sort actions
document.addEventListener("DOMContentLoaded", () => {
    let sortOptions = Array.from(document.getElementsByClassName("sort"));
    sortOptions.forEach(element => {
        element.addEventListener("click", async () => {
            let jobs = [];
            switch (element.value){
                case "alpha":
                    jobs = await loadAlpha();
                    console.log("Jobs fetched: ", jobs);
                    break;
                case "place":
                    jobs = await loadPlace();
                    break;
                case "location":
                    jobs = await loadLocation();
                    break;
                case "dateAdded":
                    jobs = await loadDate();
                    break;
                case "action":
                    jobs = await loadAction();
                    break;
                case "response":
                    jobs = await loadResponse();
                    break;
            }
            const tbody = document.querySelector("#displayTable tbody");
            tbody.innerHTML = "";

            jobs.forEach(job => {
                const tr = document.createElement("tr");

                const editCell = document.createElement("td");
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.className = "edit-button";
                editButton.id = job.id;
                editCell.appendChild(editButton);
                tr.appendChild(editCell);

                const idCell = document.createElement("td");
                idCell.textContent = job.id;
                idCell.className = `job-${job.id}`;
                tr.appendChild(idCell);

                const companyCell = document.createElement("td");
                companyCell.textContent = job.companyName;
                companyCell.className = `job-${job.id}`;
                tr.appendChild(companyCell);

                const positionCell = document.createElement("td");
                positionCell.textContent = job.positionName;
                positionCell.className = `job-${job.id}`;
                tr.appendChild(positionCell);

                const placeCell = document.createElement("td");
                placeCell.textContent = job.place;
                placeCell.className = `job-${job.id}`;
                tr.appendChild(placeCell);

                const locationCell = document.createElement("td");
                locationCell.textContent = job.location;
                locationCell.className = `job-${job.id}`;
                tr.appendChild(locationCell);

                const dateCell = document.createElement("td");
                dateCell.textContent = new Date(job.dateAdded).toISOString().split('T')[0];
                dateCell.className = `job-${job.id}`;
                tr.appendChild(dateCell);

                const actionCell = document.createElement("td");
                actionCell.textContent = job.actionStatus;
                actionCell.className = `job-${job.id}`;
                tr.appendChild(actionCell);

                const responseCell = document.createElement("td");
                responseCell.textContent = job.responseStatus;
                responseCell.className = `job-${job.id}`;
                tr.appendChild(responseCell);

                const otherCell = document.createElement("td");
                otherCell.textContent = job.otherNotes;
                otherCell.className = `job-${job.id}`;
                tr.appendChild(otherCell);

                tbody.appendChild(tr);
            });
        });
    });
});

async function loadAlpha(){
    try {
        const res = await fetch("http://localhost:5000/sortAlpha");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading alphabetical jobs: ", err);
        return [];
    }
}
async function loadPlace(){
    try {
        const res = await fetch("http://localhost:5000/sortPlace");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading place-sorted jobs: ", err);
        return [];
    }
}
async function loadLocation(){
    try {
        const res = await fetch("http://localhost:5000/sortLocation");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading location-sorted jobs: ", err);
        return [];
    }
}
async function loadDate(){
    try {
        const res = await fetch("http://localhost:5000/sortDate");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading date-sorted jobs: ", err);
        return [];
    }
}
async function loadAction(){
    try {
        const res = await fetch("http://localhost:5000/sortAction");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading action-sorted jobs: ", err);
        return [];
    }
}
async function loadResponse(){
    try {
        const res = await fetch("http://localhost:5000/sortResponse");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading response-sorted jobs: ", err);
        return [];
    }
}

// Add action
document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("save-to-db");

    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        const now = new Date();
        const idNumber = crypto.randomUUID();

        const job = {
            id: idNumber,
            companyName: document.getElementById("company-name").value,
            positionName: document.getElementById("position-name").value,
            place: document.querySelector('select[name="place"]').value,
            location: document.getElementById("location-name").value,
            dateAdded: now.toISOString().split('T')[0],
            actionStatus: document.querySelector('select[name="action"]').value,
            responseStatus: document.querySelector('select[name="response"]').value,
            otherNotes: document.getElementById("other-notes").value,
        };

        fetch ("/addposting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        })
        .then(res => res.text())
        .then(data => {
            alert(data);
            if (data.includes("successfully")){
                document.getElementById("add-entry").reset();
            }
        })
        .catch(err => {
            console.error("Error submitting member:", err);
        });
    });
});

// Edit action
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
        const button = event.target;
        const row = button.closest("tr");

        if (button.textContent === "Edit"){
            row.querySelectorAll("td:not(:first-child):not(:nth-child(2))").forEach(cell => {
                const value = cell.textContent;
                cell.innerHTML = `<input type="text" value="${value}">`;
            });
            button.textContent = "Save";
        }
        else {
            const inputs = row.querySelectorAll("input");
            const updateJob = {
                id: row.cells[1].textContent,
                companyName: inputs[0].value,
                positionName: inputs[1].value,
                place: inputs[2].value,
                location: inputs[3].value,
                dateAdded: inputs[4].value,
                actionStatus: inputs[5].value,
                responseStatus: inputs[6].value,
                otherNotes: inputs[7].value
            };

            fetch("/editposting", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateJob)
            })
            .then(res => res.text())
            .then(data => alert(data))
            .catch(err => console.error("Error editing: ", err));

            row.querySelectorAll("td:not(:first-child):not(:nth-child(2))").forEach((cell, i) => {
                cell.textContent = inputs[i].value;
            });
            button.textContent = "Edit";
        }
    }
});