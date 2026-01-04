const recoveryForm = document.getElementById("recoveryForm");
const verifyForm = document.getElementById("resetForm");

let data = {
    email: "",
    password: "",
    code: ""
}

function showVerify() {
    recoveryForm.classList.add("hidden");
    verifyForm.classList.remove("hidden");
}

function showRegister() {
    recoveryForm.classList.remove("hidden");
    verifyForm.classList.add("hidden");
}

recoveryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage();

    const formData = new FormData(e.target);
    
    data.email = formData.get("email");

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/send-recovery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "email" : data.email
            })
        });
        console.log(res)
        if (res.ok) {
            showMessage(`A recovery code has been sent to ${data.email}`);
            showVerify();
        } else {
            const err = await res.json();
            showMessage(`${err.message}`, true);
        }

    } catch (err) {
        showMessage(`${err}`, true);
        console.log(err);
    }
}); 

verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    data.code = formData.get("code");
    data.password = formData.get("password");

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/forgot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            sessionStorage.setItem("message", "Password reset successfully.");
            window.location.href="/";
        } else {
            const err = await res.json();
            showMessage(`Error. ${err.message}`, true);
        }

    } catch (err) {
        showMessage(`Error. ${err}`, true);
        console.log(err);
    }
}); 