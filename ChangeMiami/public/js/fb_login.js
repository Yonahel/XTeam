Parse.initialize("0QBMDmsADkodXUb552glPC2vU62TMt4fUv6Lk2s2", "Xoi1Vy1fanXOPOITAHv3wPUoTeYAoKzrgPJHTa6n");

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        uploadData();



        //window.location = "http://www.google.com/";
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
	console.log(response);
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '887313331291640',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function uploadData() {
    var userID, userName, userProfileURL;

    FB.api('/me', function (response) {
        userName = response.name;
        userID = response.id;
        console.log('Successful login for: ' + userName);
        console.log('With ID: ' + userID);

        FB.api('/' + userID + '/picture?type=large', function (response) {
            userProfileURL = response.data.url;
            show_image(userProfileURL, 120, 120, "Photo");
        });

    	var User = Parse.Object.extend("FUser");
    	var query = new Parse.Query(User);
    	query.equalTo("userID", userID);
    	query.find({
        	success: function (results)
		{
			console.log('result', results)
			if(results.length==1)
	    		{
            			console.log("This was a success", userID);
	    			window.location = "/feed.html"; 
	    		}
	    		else if(results.length==0)
	    		{
	    			console.log("no user", userID);
            			var user = new User();
            			user.set("userID", userID);
				user.set("userName", userName);
				user.set("userProfileURL", userProfileURL);
            			user.save(null, {
  					success: function(user) 
					{
    						window.location = "/feed.html";
					},
					error: function(user)
					{
					}
        			})
	    		}
		}
    	})
    });
}


function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}
