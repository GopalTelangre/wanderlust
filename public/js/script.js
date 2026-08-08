(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


//index page
  function filterListings(category) {
    window.location.href = `/listings?category=${encodeURIComponent(category)}`;
  }

  let taxSwitch = document.getElementById("switchCheckDefault");

  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    
    for (let info of taxInfo) {
      if (taxSwitch.checked) {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });