/* =========================================================
   AUTH REGISTER
   In A Jam
========================================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        console.log("Register clicked");

    });

}