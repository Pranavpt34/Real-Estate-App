
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url= "https://homepriceprediction.onrender.com/predict_home_price";
  
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
   function onPageLoad() {
    console.log( "document loaded" );
    var url= "https://homepriceprediction.onrender.com/get_location_names";

    fetch(url,).then((res)=>{
      return res.json()
    }).then((res)=>{
      console.log("Hello",res)
      let uiLocations = document.getElementById("uiLocations");
      const locations = res.locations
      // for(let i in locations){
      //   // let opt = new Option(location[i])
      //   let opt = locations[i]
      //   console.log(opt)
      //   uiLocations.append(opt)
      // }
      for (var i = 0; i < locations.length; i++) {
        var option = document.createElement("option");
        option.value = locations[i];
        option.text = locations[i];
        
        // Append the option to the select element
        uiLocations.appendChild(option);
      }
    })


    // $.get(url,function(data, status) {
    //     console.log("got response for get_location_names request");
    //     console.log("ith etha",data,status)
    //     if(data) {
    //         var locations = data.locations;
    //         var uiLocations = document.getElementById("uiLocations");
    //         $('#uiLocations').empty();
    //         for(var i in locations) {
    //             var opt = new Option(locations[i]);
    //             $('#uiLocations').append(opt);
    //         }
    //     }
    // });
  }
  
  
  window.onload = onPageLoad;