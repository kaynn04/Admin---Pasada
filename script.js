function showLogoutModal(event) {
    event.preventDefault();
    document.getElementById("logoutModal").style.display = "block";
}

function closeModal() {
    document.getElementById("logoutModal").style.display = "none";
}

function confirmLogout() {
    window.location.href = "login.html"
}

// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); // Toggle the 'active' class to show/hide the sidebar
}

