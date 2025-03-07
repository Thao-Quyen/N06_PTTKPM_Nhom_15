document.addEventListener("DOMContentLoaded", function () {
    const adminModeBtn = document.getElementById("adminModeBtn");
    const popup = document.getElementById("adminLoginPopup");
    const closeBtn = document.querySelector(".close-btn");
    const loginForm = document.getElementById("adminLoginForm");
    const loginError = document.getElementById("loginError");

    // Hiển thị popup khi click "Admin Mode"
    adminModeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        popup.style.display = "flex";
    });

    // Đóng popup
    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Xử lý đăng nhập
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                window.location.href = "admin-dashboard.html"; // Chuyển hướng admin
            } else {
                loginError.style.display = "block";
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    });
});
