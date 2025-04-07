// Sign In logic
document.getElementById("signin-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html"; // Redirect to index page
    } else {
        alert(data.msg);
    }
});

// Sign Up logic
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    alert(data.msg);
    if (res.ok) {
        window.location.href = "signin.html"; // Redirect to signin page
    }
});
