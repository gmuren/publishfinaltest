$(document).ready(function() {

    // Limits Character Input to 5
    var max_chars = 5;

    $("input").keydown(function(e) {
        if ($(this).val().length >= max_chars) {
            $(this).val($(this).val().substr(0, max_chars));
        }
    });

    $("input").keyup(function(e) {
        if ($(this).val().length >= max_chars) {
            $(this).val($(this).val().substr(0, max_chars));
        }
    });


    $("button").on("click", function() { // Run when user hits Enter or Tab in Zip Code Box
        var zipcode = $("input").val();
        $("input").focus(
    	function(){
        $(this).val("");
    }); // Sets zipcode variable; omit "var" to make it global
        console.log(zipcode);

        // 1st API call returns AccuWeather location object response based on user zipcode; sets locationKeyURL variable
        var locationKeyUrl = "http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=2jotBAyrmg3gesa9mrV831inrGVKzGr4&q=" + zipcode;

        $.getJSON(locationKeyUrl, function(data) {

            locationKey = data[0].Key; // Grabs locationKey from Accuweather
            console.log(locationKey);
            // 2nd API call grabs local daily forecast based on Accuweather locationKey
            var weatherForecastUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + locationKey + "?apikey=2jotBAyrmg3gesa9mrV831inrGVKzGr4&details=true&metric=false";
            $.getJSON(weatherForecastUrl, function(data) {
                // Set weather variables based on real feel
                highToday = data.DailyForecasts[0].RealFeelTemperature.Maximum.Value;
                lowToday = data.DailyForecasts[0].RealFeelTemperature.Minimum.Value;
                precipToday = data.DailyForecasts[0].Day.PrecipitationProbability;

                // Set Rules for Head
                $("button").on("click", function() {
                    if (highToday > 85) {
                        $("#headimage").attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/32677-200.png");
                    } else if (highToday < 65) {
                        $("#headimage").attr("src", "https://www.shareicon.net/download/2016/11/16/854595_christmas_512x512.png");
                    } else {
                        $("#headimage").attr("src", "https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-256.png");
                    }
                });
                // Set Rules for Torso
                $("button").on("click", function() {
                    if (highToday > 85) {
                        $("#torsoimage").attr("src", "https://cdn4.iconfinder.com/data/icons/clothes-accessories-2/367/clothes-accessory-clothing-garment_08-256.png");
                    } else if (highToday < 65) {
                        $("#torsoimage").attr("src", "https://cdn1.iconfinder.com/data/icons/clothes-the-icons/32/coat-512.png");
                    } else {
                        $("#torsoimage").attr("src", "https://cdn4.iconfinder.com/data/icons/male-shirts-add-on/48/v-17-512.png");
                    }
                });
                // Set Rules for Legs		
                $("button").on("click", function() {
                    if (highToday > 85) {
                        $("#legsimage").attr("src", "https://cdn0.iconfinder.com/data/icons/thin-clothing/24/thin-0990_short_pants_shorts_bermudas-512.png");
                    } else if (highToday < 65) {
                        $("#legsimage").attr("src", "https://www.shareicon.net/download/2016/03/12/732919_clothing_512x512.png");
                    } else {
                        $("#legsimage").attr("src", "https://cdn0.iconfinder.com/data/icons/thin-clothing/24/thin-0991_pants-512.png");
                    }
                });
                // Set Rules for Accessories		
                $("button").on("click", function() {
                    if (precipToday > 30) {
                        $("#accessoryimage").attr("src", "http://www.freeiconspng.com/uploads/umbrella-icon-png-27.png");
                    } else if (highToday > 80) {
                        $("#accessoryimage").attr("src", "https://image.freepik.com/free-icon/sandals_318-62996.jpg");
                    } else {
                        $("#accessoryimage").attr("src", "https://image.flaticon.com/icons/png/512/24/24936.png");
                    }
                });

                console.log(highToday);
                console.log(lowToday);
                console.log(precipToday);
            });
        });
    });
});