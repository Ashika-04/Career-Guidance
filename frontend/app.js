document.addEventListener("DOMContentLoaded", () => {
    // Handle "Book Session" button click
    document.getElementById("bookSessionBtn").addEventListener("click", () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "login.html"; // Redirect to login if not authenticated
        } else {
            window.location.href = "book-session.html"; // Redirect to booking form if authenticated
        }
    });

    // Handle the form submission
    document.getElementById("bookingForm")?.addEventListener("submit", handleBooking);
});

// Handle form submission
async function handleBooking(e) {
    e.preventDefault(); // Prevent form from submitting the default way

    // Gather form data
    const bookingData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        stream: document.getElementById("educationLevel").value,
        expertName: document.getElementById("expertDropdown").value,
        sessionDate: document.getElementById("sessionDate").value,
        sessionTime: document.getElementById("sessionTime").value
    };

    // Send booking data to backend
    try {
        const response = await fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData)
        });

        // If booking is successful, redirect to the counselling session page
        if (response.ok) {
            alert("Session booked successfully!");
            window.location.href = "counselling-session.html"; // Redirect to counselling session page
        } else {
            const errorData = await response.json();
            alert(errorData.message || "Booking failed. Please try again.");
        }
    } catch (error) {
        console.error("Error booking session:", error);
        alert("Something went wrong. Please try again.");
    }
}
