	
function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
      if (uiBathrooms[i].checked) {
          return parseInt(i) + 1;
      }
  }
  return -1; // Invalid Value
}


function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
      if (uiBHK[i].checked) {
          return parseInt(i) + 1;
      }
  }
  return -1; // Invalid Value
}



function onPageLoad() {
fetch("/get_location_names")
  .then((res) => { return res.json() })
  .then((res) => {
  let uiLocations = document.getElementById("uiLocations");
  const locations = res.locations;
  for (var i = 0; i < locations.length; i++) {
    var option = document.createElement("option");
    option.value = locations[i];
    option.text = locations[i];

    // Append the option to the select element
    uiLocations.appendChild(option);
  }
  })
  .catch((error) => {
  console.error('Error fetching location names:', error);
  });
}




function onClickedEstimatePrice() {
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");


  $.post("/predict_home_price", {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  },function(data, status) {
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
  });
}
onPageLoad();