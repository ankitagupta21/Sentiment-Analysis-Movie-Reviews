function openPopup(prediction_pos, prediction_neg) {
  var popup = document.getElementById("popup");
  var popupContent = document.getElementById("popup-content");

  // Clear previous content
  popupContent.innerHTML = "";

  // Add prediction result to popup content
  if (prediction_pos) {
    popupContent.innerHTML += "<p style='color:green;'>" + prediction_pos + "</p>";
  }
  if (prediction_neg) {
    popupContent.innerHTML += "<p style='color:red;'>" + prediction_neg + "</p>";
  }

  // Display the popup
  popup.style.display = "block";
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

function submitForm() {
  var review = document.querySelector('textarea[name="review"]').value;
  var rating = document.querySelector('select[name="rating"]').value;
  var genre = document.querySelector('input[name="genre"]').value;

  var formData = new FormData();
  formData.append('review', review);
  formData.append('rating', rating);
  formData.append('genre', genre);

  fetch('/', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.prediction_pos || data.prediction_neg) {
        openPopup(data.prediction_pos, data.prediction_neg);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  return false;
}
