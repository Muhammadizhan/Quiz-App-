// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("loginForm");

//   loginForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const loginEmail = document.getElementById("loginEmail").value;
//     const loginPassword = document.getElementById("loginPassword").value;

//     const storedEmail = localStorage.getItem("email");
//     const storedPassword = localStorage.getItem("password");

//     if (loginEmail === storedEmail && loginPassword === storedPassword) {
//       alert("Login successful");
//       window.location.href = "dashboard.html";
//     } else {
//       alert("Invalid email or password");
//     }
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (loginEmail === storedEmail && loginPassword === storedPassword) {
      alert("Login successful");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password");
    }
  });
});
