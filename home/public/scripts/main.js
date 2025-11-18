const messageBox = document.getElementById("messageBox");

function showMessage(msg, isError = false, duration = 5000) {
    messageBox.textContent = msg;
    messageBox.className = isError ? "message error" : "message success";

    setTimeout(hideMessage, duration);
}
window.showMessage = showMessage;

function hideMessage() {
    messageBox.className = "message hidden";
}
window.hideMessage = hideMessage;

const message = sessionStorage.getItem("message");
if (message) {
    showMessage(message);
    sessionStorage.removeItem("message");
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
window.checkAuth = checkAuth;

async function protectPage(){
    try{
        const user = await checkAuth();
        if (!user) {
            window.location.href = `/login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
    } catch {
        window.location.href = `/login.html?redirect=${encodeURIComponent(window.location.pathname)}`;

    }
}
window.protectPage = protectPage;

async function logout() {
    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            loggedOut.classList.remove("hidden");
            loggedIn.classList.add("hidden");
            showMessage("Successfully logged out.");
        } 

    } catch (err) {
        console.error("Logout failed. ", err)
    }
}