const username = document.getElementById("user");
const idField  = document.getElementById("id");
const emailField = document.getElementById("email");
const deleteAccount = document.getElementById("deleteAccount");

(async () => {
    await protectPage();

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/user", {
            method: "POST",
            credentials: "include"
        });

        if (!res.ok) {
            showMessage("Could not load user info", true);
            return;
        }

        const user = await res.json();
        username.textContent = user.username;
        idField.textContent = user.id;
        emailField.textContent = user.email;

    } catch (err) {
        showMessage(err.message || err, true);
    }
})();


deleteAccount.addEventListener("click", async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        return;
    }

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/delete", {
            method: "POST",
            credentials: "include"
        });

        if (!res.ok) {
            showMessage("Error deleting account", true);
            return;
        }

        sessionStorage.setItem("message", "Your account has been deleted.");
        window.location.href = "/";

    } catch (err) {
        showMessage(err.message || err, true);
    }
});
