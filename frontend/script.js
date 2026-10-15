
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {

    const response = await fetch(
      "http://localhost:3000/submit-contact",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          message
        })
      }
    );

    const data = await response.json();

    if (data.success) {

      // Save submitted data temporarily
      localStorage.setItem(
        "submittedContact",
        JSON.stringify({
          name,
          email,
          message
        })
      );

      // Move to success page
      window.location.href = "success.html";

    } else {

      alert("Something went wrong.");

    }

  } catch (error) {

    console.error("Error submitting form:", error);

    alert("Unable to submit the form.");

  }
});
