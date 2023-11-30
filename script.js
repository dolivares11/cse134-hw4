window.addEventListener("DOMContentLoaded", function() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const form = document.getElementById("contact-form");
    const formErrorsField = document.getElementById("form-errors");
    const toggleButton = document.getElementById("toggle");
    const resumeButton = document.getElementById("resume-button");
    let formErrors = [];

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        resumeButton.classList.add('dark-mode');
        form.classList.add('dark-mode');
      }

    toggleButton.style.display = "inline-block";
    
    form.addEventListener("submit", function(event) {
        console.log(formErrors);
        formErrorsField.value = JSON.stringify(formErrors);

        // Display errors in the console (you can send this data to the server)
        console.log(formErrors);

    });

    toggleButton.addEventListener("click", function(event) {
        console.log("toggled");
        const body = document.body;
        const isDarkMode = body.classList.toggle('dark-mode');
        const resumeButtonDark = resumeButton.classList.toggle('dark-mode');
        const formDark = form.classList.toggle('dark-mode');
        // Save the current mode to localStorage
        localStorage.setItem('darkMode', isDarkMode);
      });

    name.addEventListener("input", function(event) {
        if (name.validity.typeMismatch) {
            name.setCustomValidity("I expect your full name.");
            formErrors.push({ field: "name", message: "I expect your full name." });
        } else if (name.validity.patternMismatch) {
          name.setCustomValidity("I expect no numbers in your name.");
          formErrors.push({ field: "name", message: "I expect your full name." });
          showError(name);
        } else {
            name.setCustomValidity("");
            clearError(name);
        }
    });

    email.addEventListener("input", function(event) {
      if (email.validity.typeMismatch) {
        email.setCustomValidity("I expect an email.");
        formErrors.push({ field: "email", message: "I expect an email." });
      } else if (email.validity.patternMismatch) {
        email.setCustomValidity("Do not use invalid characters.");
        formErrors.push({ field: "name", message: "Do not use invalid characters" });
        showError(email);
      } else {
        email.setCustomValidity("");
        clearError(email);
      }
    });

    message.addEventListener("input", function(event) {
        const remainingCharacters = 400 - message.value.length;
        const info = message.nextElementSibling.nextElementSibling;  
        info.textContent = `${remainingCharacters} characters remaining.`;
    
        if (remainingCharacters < 20) {
          info.classList.add("warn");
        } else {
          info.classList.remove("warn");
        }
    
        if (remainingCharacters < 0) {
          info.classList.add("error");
        } else {
          info.classList.remove("error");
        }
    });



    // Helper functions for showing and clearing errors
    function showError(element) {
        const errorOutput = element.nextElementSibling;
        console.log(errorOutput)
        errorOutput.textContent = element.validationMessage;
        errorOutput.classList.add("flash");
    }

    function clearError(element) {
        const errorOutput = element.nextElementSibling;
        errorOutput.textContent = "";
        errorOutput.classList.remove("flash");
    }

  });
  