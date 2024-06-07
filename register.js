document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Retrieve existing users from local storage

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("This email is already registered");
    } else {
      // Add new user to the users array

      const newUser = { fullName, email, password };
      users.push(newUser);

      // Save updated users array to local storage

      localStorage.setItem("users", JSON.stringify(users));

      alert("User registered successfully");
      window.location.href = "login.html";
    }
  });
});
