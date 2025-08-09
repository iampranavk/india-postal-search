function displayResults(data) {
  try {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!data || data[0].Status !== "Success") {
      resultsDiv.textContent = "No results found.";
      return;
    }

    const postOffices = data[0].PostOffice;
    postOffices.forEach((po) => {
      const poDiv = document.createElement("div");
      poDiv.className = "post-office";
      const pinCodeHTML = po.Pincode
        ? `<p><strong>PIN Code:</strong> ${po.Pincode}</p>`
        : "";
      poDiv.innerHTML = `
      <h2>${po.Name}</h2>
      ${pinCodeHTML}
      <h5>${po.BranchType}</h5>
      <div class="details-grid">
      <p><strong>District:</strong> ${po.District}</p>
      <p><strong>Region:</strong> ${po.Region}</p>
      <p><strong>Circle:</strong> ${po.Circle}</p>
      <p><strong>State:</strong> ${po.State}</p>
    </div>
    `;
      document.querySelectorAll(".post-office").forEach((el) => {
        el.style.backgroundColor = getRandomShade();
      });
      resultsDiv.appendChild(poDiv);
    });
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching data</p>";
  }
}

function showLoading() {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";
}

function hideLoading() {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "none";
}

function getRandomShade() {
  const shades = [
    "#CDAEF9",
    "#AEF9DC",
    "#F9AEAF",
    "#AEC1F9",
    "#AEF9C3",
    "#B3F9AE",
    "#D2F9AE",
    "#F9F8AE",
    "#F9CBAE",
    "#F9AEAE",
    "#F9E4AE",
    "#F9C6AE",
  ];
  return shades[Math.floor(Math.random() * shades.length)];
}
