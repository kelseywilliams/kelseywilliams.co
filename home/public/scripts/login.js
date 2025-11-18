const message = sessionStorage.getItem("message");
if (message) {
    showMessage(message);
    sessionStorage.removeItem("message");
}

document.getElementById("authForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage();

    const formData = new FormData(e.target);
    const data = {
        username: formData.get("username"),
        password: formData.get("password")
    }
    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get("redirect") || "/";

            sessionStorage.setItem("message", "Login successful.");
            window.location.href = redirect;
        } else {
            const err = await res.json();
            showMessage(`${err.message}`, true);
        }

    } catch (err) {
        showMessage(`${err}`, true);
        console.log(err);
    }
}); 