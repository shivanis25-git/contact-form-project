
const submittedData =
  localStorage.getItem("submittedContact");

if (submittedData) {

  const contact =
    JSON.parse(submittedData);

  document.getElementById("displayName").textContent =
    contact.name;

  document.getElementById("displayEmail").textContent =
    contact.email;

  document.getElementById("displayMessage").textContent =
    contact.message;

} else {

  document.getElementById("displayName").textContent =
    "No information found";

  document.getElementById("displayEmail").textContent =
    "No information found";

  document.getElementById("displayMessage").textContent =
    "No information found";
}
