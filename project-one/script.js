const apiUrl = "https://jsonplaceholder.typicode.com/users";
let users = [];  
let filteredUsers = []; 
let isSortedAsc = true;  

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        users = await response.json();
        filteredUsers = [...users];  
        displayUsers(filteredUsers);
        calculateAverageNameLength();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function displayUsers(userData) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";  

    userData.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
            <p>Company: ${user.company.name}</p>
        `;
        userList.appendChild(userCard);
    });
}

document.getElementById("search").addEventListener("input", function (e) {
    const searchText = e.target.value.toLowerCase();
    filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchText));
    displayUsers(filteredUsers);
});

document.getElementById("sort").addEventListener("click", function () {
    isSortedAsc = !isSortedAsc;
    filteredUsers.sort((a, b) => isSortedAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    displayUsers(filteredUsers);
});

function calculateAverageNameLength() {
    const totalLength = users.reduce((sum, user) => sum + user.name.length, 0);
    const average = users.length ? (totalLength / users.length).toFixed(2) : 0;
    document.getElementById("average-length").textContent = average;
}

document.getElementById("refresh").addEventListener("click", fetchUsers);


fetchUsers();
