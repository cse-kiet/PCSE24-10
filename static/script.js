// dropdown formatting
document.addEventListener("DOMContentLoaded", function() {
  var selectElements = document.querySelectorAll(".select-color");
  selectElements.forEach(function(selectElement) {
    selectElement.addEventListener("change", function() {
      var selectedOption = this.options[this.selectedIndex];
      this.style.color = selectedOption.value !== "" ? "black" : "gray";
    });

    // Set initial color when page loads
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    selectElement.style.color = selectedOption.value !== "" ? "black" : "gray";
  });
});

// Connect with flask
document
  .getElementById("heartDiseaseForm")
  .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      fetch("/predict", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const resultDiv = document.getElementById("result");
          const form = document.getElementById("heartDiseaseForm");
          if (data.result === 1) {
            resultDiv.innerHTML = "The patient seems to be have &nbsp;<u> Heart Disease </u>&nbsp; :(";
            // resultDiv.innerHTML = "Risk";
            // resultDiv.style.color = "red";
            document.body.classList.add("risk");   //body background formatting
            document.body.classList.remove("norisk");
            form.classList.add("risk-back");  //form background formatting
            form.classList.remove("norisk-back");
            resultDiv.classList.add("risk-res");  //result background formatting
            resultDiv.classList.remove("norisk-res");
          } else if (data.result === 0) {
            resultDiv.innerHTML = "The patient seems to be &nbsp;<u> Normal </u>&nbsp; :)";
            // resultDiv.innerHTML = "No Risk";
            // resultDiv.style.color = "green";
            document.body.classList.add("norisk");
            document.body.classList.remove("risk");
            form.classList.add("norisk-back");
            form.classList.remove("risk-back");
            resultDiv.classList.add("norisk-res");
            resultDiv.classList.remove("risk-res");
          } else {
            resultDiv.innerHTML = "Error";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
});

// reset button
document.getElementById("reset-btn").addEventListener("click", function () {
    const resultDiv = document.getElementById("result");
    const form = document.getElementById("heartDiseaseForm");

    // Clear result message
    resultDiv.innerHTML = "Result...";

    // Remove background formatting classes
    document.body.classList.remove("risk", "norisk");
    form.classList.remove("risk-back", "norisk-back");
    resultDiv.classList.remove("risk-res", "norisk-res");

    // Reset dropdown color to gray
    var selectElements = document.querySelectorAll(".select-color");
    selectElements.forEach(function(selectElement) {
        selectElement.style.color = "gray";
    });
});