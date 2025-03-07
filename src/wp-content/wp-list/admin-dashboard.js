document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        window.location.href = "index.html";
        return;
    }

    fetch("http://localhost:3000/admin/dashboard", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            document.getElementById("adminUser").innerText = `Xin chào, ${data.user.username}!`;
        } else {
            window.location.href = "index.html";
        }
    })
    .catch(error => console.error("Error:", error));
});

// Logout
function logout() {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
}
