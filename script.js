function showLogoutModal(event) {
    event.preventDefault();
    document.getElementById("logoutModal").style.display = "block";
}

function closeModal() {
    document.getElementById("logoutModal").style.display = "none";
}

function confirmLogout() {
    logout();
    window.location.href = "login.html"
}

// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); // Toggle the 'active' class to show/hide the sidebar
}

// Function to add driver
function showAddDriverModal(event) {
    event.preventDefault();
    document.getElementById("add-driver-modal").style.display = "block";

    const form = document.getElementById("addDriver-form");
    const clone = form.cloneNode(true);
    form.replaceWith(clone);

    clone.addEventListener("submit", (event) => {
        event.preventDefault();

        const fname = document.getElementById("fname").value;
        const lname = document.getElementById("lname").value;
        const bodyNum = document.getElementById("bodyNum").value;
        const contactNum = document.getElementById("contactNum").value;
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("confirm-password").value;
        
        if (fname && lname && bodyNum && contactNum && password == password2) {
            addDriverData(fname, lname, bodyNum, contactNum, password);

            clone.reset();
            closeAddDriverModal();
        } else {
            alert("Please fill out all the fields");
        }
    });
}

function closeAddDriverModal() {
    document.getElementById("add-driver-modal").style.display = "none";
}

//Function to add routes
function showAddRouteModal(event) {
    event.preventDefault();
    document.getElementById("add-route-modal").style.display = "block";

    const form = document.getElementById("addRoute-form");
    const clone = form.cloneNode(true);
    form.replaceWith(clone);

    clone.addEventListener("submit", (event) => {
        event.preventDefault();

        const origin = document.getElementById("origin").value;
        const destination = document.getElementById("destination").value;
        const fare = document.getElementById("fare").value;
        const service = document.getElementById("service").value;
        
        if (origin && destination && fare && service) {
            addRouteData(origin, destination, fare, service);

            clone.reset();
            closeAddRouteModal();
        } else {
            alert("Please fill out all the fields");
        }
    });
}

function closeAddRouteModal() {
    document.getElementById("add-route-modal").style.display = "none";
}

// FIREBASE -----------------------------

const firebaseConfig = {
    apiKey: "AIzaSyDCHOgg4l6CZ5_sG2EYREf0Mm3bM6TQciI",
    authDomain: "pasada-97a81.firebaseapp.com",
    databaseURL: "https://pasada-97a81-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectID: "pasada-97a81",
    storageBucket: "pasada-97a81.firebasestorage.app",
    messagingSenderID: "1079229233539",
    appID: "1:1079229233539:web:08c8785e4e62eaf742deb6"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
const auth = firebase.auth();

function retrieveEmployeeData(){
    const tableBody = document.querySelector('.employee-list tbody')
    database.ref('Employee').once('value', function(snapshot){
        if (snapshot.exists()){
            var employees = snapshot.val();
        
            var sortedKeys = Object.keys(employees).sort((a, b) => a - b);
        
            tableBody.innerHTML = '';
        
            sortedKeys.forEach(function(key) {
                var employee = employees[key];
        
                const row = document.createElement('tr');
                row.id = key;
        
                row.innerHTML = `
                    <td>${employee.fname} ${employee.lname}</td>
                    <td>Driver</td>
                    <td>${employee.bodyNum}</td>
                    <td>${employee.contactNum}</td>
                    <td><span class="status-circle"></span> Active</td>
                    <td>
                        <button>Edit</button>
                        <button onclick="deleteDriverData('${key}'), '${employee.uid}'">Delete</button>
                    </td>
                `;
        
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6">No employees found</td></tr>';
        }
    }, function(error) {
            console.error("Error retrieving data:", error);
            tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    });
}

function retrieveCustomerData() {
    const tableBody = document.querySelector('.employee-list tbody')
    database.ref('User').once('value', function(snapshot){
        if (snapshot.exists()){
            var users = snapshot.val();
        
            var sortedKeys = Object.keys(users).sort((a, b) => a - b);
        
            tableBody.innerHTML = '';
        
            sortedKeys.forEach(function(key) {
                var user = users[key];
        
                const row = document.createElement('tr');
                row.id = key;
        
                row.innerHTML = `
                    <td>${user.fname} ${user.lname}</td>
                    <td>Customer</td>
                    <td>${user.email}</td>
                    <td>${user.contactNum}</td>
                    <td>
                        <button>Edit</button>
                    </td>
                `;
        
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6">No Users found</td></tr>';
        }
    }, function(error) {
            console.error("Error retrieving data:", error);
            tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    });
}

function retrieveHistory() {
    const tableBody = document.querySelector('.history-list tbody')
    database.ref('History').once('value', function(snapshot){
        if (snapshot.exists()){
            var histories = snapshot.val();
        
            var sortedKeys = Object.keys(histories).sort((a, b) => a - b);
        
            tableBody.innerHTML = '';
        
            sortedKeys.forEach(function(key) {
                var history = histories[key];
        
                const row = document.createElement('tr');
                row.id = key;
        
                row.innerHTML = `
                    <td>${history.driver}</td>
                    <td>${history.date}</td>
                    <td>${history.bodyNum}</td>
                    <td>${history.phoneNumber}</td>
                    <td>${history.route}</td>
                `;
        
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6">No History found</td></tr>';
        }
    }, function(error) {
            console.error("Error retrieving data:", error);
            tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    });
}

function retrieveRoutes() {
    const tableBody = document.querySelector('.route-list tbody')
    database.ref('Route').once('value', function(snapshot){
        if (snapshot.exists()){
            var routes = snapshot.val();
        
            var sortedKeys = Object.keys(routes).sort((a, b) => a - b);
        
            tableBody.innerHTML = '';
        
            sortedKeys.forEach(function(key) {
                var route = routes[key];
        
                const row = document.createElement('tr');
                row.id = key;
        
                row.innerHTML = `
                    <td>${route.origin}</td>
                    <td>${route.destination}</td>
                    <td>${route.fare}</td>
                    <td>${route.service}</td>
                    <td>
                        <button>Edit</button>
                        <button onclick="deleteRouteData('${key}')">Delete</button>
                    </td>
                `;
        
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6">No Routes found</td></tr>';
        }
    }, function(error) {
            console.error("Error retrieving data:", error);
            tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    });
}

function deleteRouteData(routeKey) {
    const routeRef = database.ref(`Route/${routeKey}`);

    routeRef.remove()
        .then(() => {
            console.log("Route deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting Route", error.message);
            alert(`Error deleting Route: ${error.message}`);
        });

        retrieveRoutes();
}

function addRouteData(origin, destination, fare, service) {
    const newRouteKey = database.ref('Route').push().key;
    const routeData = {
        origin: origin,
        destination: destination,
        fare: fare,
        service: service
    };

    database.ref('Route').child(newRouteKey).set(routeData)
        .then(() => {
            console.log("Route added successfully");
        })
        .catch((error) => {
            console.error("Error adding route", error.message);
            alert(`Error adding route: ${error.message}`);
        });
    
        retrieveRoutes();
}

function addDriverData(fname, lname, bodyNum, contactNum, password) {
    driverRegister(contactNum, password, fname)
        .then((user) => {
            const newEmployeeKey = database.ref('Employee').push().key;
            const accountType = "Driver";
            const employeeData = {
                uid: user.uid,
                fname: fname,
                lname: lname,
                bodyNum: bodyNum,
                contactNum: contactNum,
                accountType: accountType
            };

            database.ref('Employee').child(newEmployeeKey).set(employeeData)
                .then(() => {
                    console.log("Employee added successfully");
                })
                .catch((error) => {
                    console.error("Error adding employee", error.message);
                    alert(`Error adding employee: ${error.message}`);
                });
        retrieveEmployeeData();
    });
}

function deleteDriverData(driverKey, uid) {
    const backendUrl = "http://localhost:5000/deleteUser";
    if (!confirm("Are you sure you want to delete this driver?")) return;

    fetch(backendUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }), // Send the UID of the user to delete
    })
        .then((response) => {
            if (response.ok) {
                console.log(`Driver with UID: ${uid} deleted successfully.`);
                alert("Driver deleted successfully!");
                retrieveEmployeeData(); // Refresh the employee list
            } else {
                return response.json().then((err) => {
                    throw new Error(err.error);
                });
            }
        })
        .catch((error) => {
            console.error("Error deleting driver:", error.message);
            alert(`Error deleting driver: ${error.message}`);
        });
}

function BUdeleteDriverData(driverKey){
    const employeeRef = database.ref(`Employee/${driverKey}`);

    employeeRef.remove()
        .then(() => {
            console.log("Employee deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting employee", error.message);
            alert(`Error deleting employee: ${error.message}`);
        });

        retrieveEmployeeData();
}

function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const username = user.displayName || user.email;

            const user_display_name = document.getElementById("user-display-name");
            if (user_display_name) {
                user_display_name.textContent = username;
            }
        } else {
            const currentPath = window.location.pathname;
            if (!currentPath.includes("login.html") && !currentPath.includes("signup.html")) {
                window.location.href = "login.html";
            }
        }
    })
}

function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Login successful");
            //alert("Login successful")
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Error logging in", error.message);
            alert(`Login error: ${error.message}`);
        })
}

function adminRegister(email, password, display, accountType) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return user.updateProfile({
                displayName: displayName
            }).then(() => {
                console.log("Account created successfully");
                //alert("Account created successfully");
                login(email, password);
            });
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
            alert(`Sign-up error: ${error.message}`);
        });
}

function driverRegister(email, password, displayName, accountType) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            return user.updateProfile({
                displayName: displayName
            })
            .then(() => {
                return user;
            });
        })
        .catch((error) => {
            console.error("Error registering driver:", error.message);
            alert(`Error registering driver: ${error.message}`);
            throw error;
        });
}

function logout() {
    auth.signOut()
        .then(() => {
            console.log("User logged out");
            window.location.href = "login.html";
        })
        .catch((error))
}

checkAuthState();

if (window.location.pathname.includes("signup.html")) {
    document.getElementById("signup-form").addEventListener("submit", (event) => {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("confirm-password").value;
        const accountType = "Admin";
        if (password == password2){
            adminRegister(email, password, username, accountType);
        } else {
            console.error("Error signing up");
        }
    });
}

if (window.location.pathname.includes("login.html")) {
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        login(email, password);
    });
}

if (window.location.pathname.includes("employee.html")){
    retrieveEmployeeData();
}

if (window.location.pathname.includes("customer.html")){
    retrieveCustomerData();
}

if (window.location.pathname.includes("routes.html")) {
    retrieveRoutes();
}

if (window.location.pathname.includes("history.html")) {
    retrieveHistory();
}