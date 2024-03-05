// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()


let priceToggle = document.getElementById("flexSwitchCheckDefault");
priceToggle.addEventListener("click", () => {
  let taxbefore = document.getElementsByClassName("tax-info-before");
  let taxafter = document.getElementsByClassName("tax-info-after");

  for (let i = 0; i < taxbefore.length; i++) {
    if (priceToggle.checked) {
      taxbefore[i].style.display = "none";
      taxafter[i].style.display = "inline";
    } else {
      taxbefore[i].style.display = "inline";
      taxafter[i].style.display = "none";
    }
  }

  let label = document.querySelector('.form-check-label[for="flexSwitchCheckDefault"]');
  if (priceToggle.checked) {
    label.textContent = 'Display total before taxes';
  } else {
    label.textContent = 'Display total after taxes';
  }
});


// let searchForm = document.querySelector(".d-flex");

// searchForm.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   let searchInput = document.querySelector(".navbar-search-inp");

//   try {
//     // Redirect the user to the search URL with the specified query parameter
//     window.location.href = `/listings/filter/search?country=${searchInput.value}`;
//   } catch (error) {
//     console.error("Error redirecting to search results:", error);
//   }
// });








