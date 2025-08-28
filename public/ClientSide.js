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
                case "status":
                    jobs = await loadStatus();
                    break;
            }
            const tbody = document.querySelector("#displayTable tbody");
            tbody.innerHTML = "";

            jobs.forEach(job => {
                const tr = document.createElement("tr");

                const emptyCell = document.createElement("td");
                emptyCell.textContent = "";
                tr.appendChild(emptyCell);

                const idCell = document.createElement("td");
                idCell.textContent = job.id;
                tr.appendChild(idCell);

                const companyCell = document.createElement("td");
                companyCell.textContent = job.companyName;
                tr.appendChild(companyCell);

                const positionCell = document.createElement("td");
                positionCell.textContent = job.positionName;
                tr.appendChild(positionCell);

                const placeCell = document.createElement("td");
                placeCell.textContent = job.place;
                tr.appendChild(placeCell);

                const locationCell = document.createElement("td");
                locationCell.textContent = job.location;
                tr.appendChild(locationCell);

                const dateCell = document.createElement("td");
                dateCell.textContent = job.dateAdded;
                tr.appendChild(dateCell);

                const actionCell = document.createElement("td");
                actionCell.textContent = job.actionStatus;
                tr.appendChild(actionCell);

                const responseCell = document.createElement("td");
                responseCell.textContent = job.responseStatus;
                tr.appendChild(responseCell);

                const otherCell = document.createElement("td");
                otherCell.textContent = job.otherNotes;
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
async function loadStatus(){
    try {
        const res = await fetch("http://localhost:5000/sortStatus");
        const jobs = await res.json();
        return jobs;
    }
    catch (err){
        console.error("Error loading status-sorted jobs: ", err);
        return [];
    }
}