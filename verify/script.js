const certificates = [
  {
    name: "Dennis Lee Gullett",
    certification: "CCT",
    id: "r2b2a1",
    date: "2026-01-02",
    expiration: "2028-01-02",
  },
  {
    name: "David T. Kapetanovich",
    certification: "CCT",
    id: "d1b2c9",
    date: "2026-01-02",
    expiration: "2028-01-02",
  },
];

// Grab the form by ID
const form = document.getElementById("customer_id");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const inputId = form.customer_attempt_id.value.trim(); // get input value
  const cert = certificates.find((c) => c.id === inputId);

  // Check if results div exists, otherwise create it
  let resultDiv = document.getElementById("verification_result");
  if (!resultDiv) {
    resultDiv = document.createElement("div");
    resultDiv.id = "verification_result";
    form.parentNode.appendChild(resultDiv);
  }

  // Display results
  if (cert) {
    const isExpired = new Date(cert.expiration) < new Date();
    resultDiv.innerHTML = `
            <p style="color:green; font-weight:bold;">Professional Found</p>
            <p>Name: ${cert.name}</p>
            <p>Certification Passed: ${cert.certification}</p>
            <p>Certification ID: ${cert.id}</p>
            <p>Date: ${cert.date}</p>
            <p>Expiration Date: ${cert.expiration}</p>
            ${
              isExpired
                ? '<p style="font-weight:bold;">This Certificate Has Expired</p>'
                : ""
            }
        `;
  } else {
    resultDiv.innerHTML = `
            <p style="color:red; font-weight:bold;">No Professional Found</p>
            <p>Please search another Certification ID</p>
        `;
  }
});
