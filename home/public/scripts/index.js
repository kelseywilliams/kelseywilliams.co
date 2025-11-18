const authBox = document.getElementById("auth");
const loggedOut = document.getElementById('auth-logged-out');
const loggedIn = document.getElementById('auth-logged-in');
const usernameSpan = document.getElementById('username');

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

window.addEventListener("load", updateNavbar);
