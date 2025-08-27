// Sort actions
document.addEventListener("DOMContentLoaded", () => {
    let sortOptions = Array.from(document.getElementsByClassName("sort")); // idek if this works
    sortOptions.forEach(element => {
        element.addEventListener("click", () => {
            switch (element.id){
                case "alpha":
                    fetch("/sortAlpha", {
                        method: "GET"
                    })
                    .then(res => res.text())
                    .then(data => {
                        alert(data);
                    })
                    .catch(err => {
                        console.error("Error sorting alphabetically");
                    });
                    break;
                case "place":
                    fetch ("/sortPlace", {
                        method: "GET"
                    })
                    .then(res => res.text())
                    .then(data => {
                        alert(data);
                    })
                    .catch(err => {
                        console.error("Error sorting by place");
                    })
                    break;
                    // add the rest here
            }

        });
    });
    // Add array of event listeners for each radio and determine fetch based on which is clicked
});