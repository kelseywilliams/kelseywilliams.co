const registerForm = document.getElementById("registerForm");
const verifyForm = document.getElementById("verifyForm");

let data = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    code: ""
}

const message = sessionStorage.getItem("message");
if (message) {
    showMessage(message);
    sessionStorage.removeItem("message");
}

function showVerify() {
    registerForm.classList.add("hidden");
    verifyForm.classList.remove("hidden");
}

function showRegister() {
    registerForm.classList.remove("hidden");
    verifyForm.classList.add("hidden");
}


const passwordInput = document.querySelector("input[name='password']");
const confirmInput = document.querySelector("input[name='confirmPassword']");

function validatePasswords(){
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    
    console.log(`${password} and ${confirm} but are they equal? ${password === confirm}`);
    if (password.length < 8){
        passwordInput.setCustomValidity("Password must be longer than 8 characters")
    } else {
        passwordInput.setCustomValidity("");
    }
    if(confirm !== password){
        confirmInput.setCustomValidity("Password do not match");
    } else {
        confirmInput.setCustomValidity("");
    }

}

passwordInput.addEventListener("input", validatePasswords);
confirmInput.addEventListener("input", validatePasswords);

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideMessage();

    const formData = new FormData(e.target);
    
    data.email = formData.get("email");
    data.username = formData.get("username");
    data.password = formData.get("password");

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/send-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "email" : data.email
            })
        });

        if (res.ok) {
            showMessage(`A verification code has been sent to ${data.email}`);
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

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        if (res.ok) {
            sessionStorage.setItem("message", "Registration successful.");
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