const username = document.getElementById("username");
const id = document.getElementById("id");
const email = document.getElementById("email");
const deleteAccount = document.getElementById("delete");


async function getUser(){
    await protectPage();

    try {
        const res = await fetch("https://api.kelseywilliams.co/auth/user", {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            const user = await res.json();
            username.textContent = user.username;
            id.textContent = user.id;
            email.textContent = user.email
        }
    } catch(err){
        showMessage(err)
    }
}
