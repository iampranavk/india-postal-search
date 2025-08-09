document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("searchToggle");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Hamburger menu (assumed to exist on all pages)
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Only run search-related code if all elements exist on this page
  if (searchToggle && searchInput && searchBtn) {
    function updatePlaceholder() {
      searchInput.placeholder = searchToggle.checked
        ? "Enter Place"
        : "Enter PIN Code";
    }

    updatePlaceholder();

    searchToggle.addEventListener("change", () => {
      if (searchToggle.checked) {
        searchInput.placeholder = "Enter Place Name";
        searchInput.removeAttribute("maxlength");
      } else {
        searchInput.placeholder = "Enter PIN Code";
        searchInput.setAttribute("maxlength", "6");
      }
    });

    searchBtn.addEventListener("click", async () => {
      const query = searchInput.value.trim();

      if (!query) {
        alert("Please enter a value");
        return;
      }

      if (!searchToggle.checked) {
        // PIN Code mode
        if (!/^\d{6}$/.test(query)) {
          alert("Please enter a valid 6-digit PIN code");
          return;
        }
      } else {
        // Post Office mode
        if (!/^[A-Za-z\s]{3,}$/.test(query)) {
          alert("Please enter a valid place (at least 3 letters)");
          return;
        }
      }
      showLoading();
      if (!searchToggle.checked) {
        const data = await getPincodeDetails(query);
        displayResults(data);
      } else {
        const data = await getPostOfficeDetails(query);
        displayResults(data);
      }
      hideLoading();
    });
  }
});
