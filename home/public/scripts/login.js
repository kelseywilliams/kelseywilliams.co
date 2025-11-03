const messageBox = document.getElementById("messageBox");

function showMessage(msg, isError = false, duration = 5000) {
    messageBox.textContent = msg;
    messageBox.className = isError ? "message error" : "message success";

    setTimeout(hideMessage, duration);
}

function hideMessage() {
    messageBox.className = "message hidden";
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
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showMessage("Login successful");
            window.location.href = "/?login=success";
        } else {
            const err = await res.json();
            showMessage(`Error. ${err.message}`, true);
        }

    } catch (err) {
        showMessage(`Error. ${err}`, true);
        console.log(err);
    }
}); 