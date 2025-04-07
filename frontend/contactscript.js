document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.getElementById("response-message");

    try {
        const res = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await res.json();
        responseMessage.textContent = data.message;
        responseMessage.style.color = res.ok ? "green" : "red";

        if (res.ok) {
            document.getElementById("contact-form").reset();
        }
    } catch (error) {
        responseMessage.textContent = "Error submitting the form. Please try again later.";
        responseMessage.style.color = "red";
    }
});
