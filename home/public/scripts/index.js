const messageBox = document.getElementById("messageBox");
const authBox = document.getElementById("auth");
const loggedOut = document.getElementById('auth-logged-out');
const loggedIn = document.getElementById('auth-logged-in');
const usernameSpan = document.getElementById('username');

function showMessage(msg, isError = false, duration = 5000) {
    messageBox.textContent = msg;
    messageBox.className = isError ? "message error" : "message success";

    setTimeout(hideMessage, duration);
}

function hideMessage() {
    messageBox.className = "message hidden";
}

const params = new URLSearchParams(window.location.search);
if (params.get("login") === "success") {
    showMessage("Login successful!");
}

if (params.get("register") === "success") {
    showMessage("Registration successful.");
}

if (params.get("logout") === "success") {
    showMessage("Logout successful.");
}



async function checkAuth() {
    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/user", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            const data = await res.json();
            return data.data;
        }
        return null;
    } catch (err) {
        console.error("Auth check failed:", err);
        return null;
    }
}

async function protectPage(){
    const user = await checkAuth();
    if (!user) {
        window.location.href = '/login';
    }

}

async function logout() {
    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            loggedOut.classList.remove("hidden");
            loggedIn.classList.add("hidden");
            window.location.href = "/?logout=success";
        } 

    } catch (err) {
        console.error("Logout failed. ", err)
    }
}
async function updateNavbar() {
    const user = await checkAuth();

    if (user){
        loggedOut.classList.add("hidden");
        loggedIn.classList.remove("hidden");
        usernameSpan.textContent = user.username;

        document.getElementById('logoutBtn').addEventListener("click", async (e) => {
            e.preventDefault();
            await logout();
        });
    } else {
        loggedOut.classList.remove("hidden");
        loggedIn.classList.add("hidden");
    }
}

document.addEventListener("DOMContentLoaded", updateNavbar);