Parse.initialize("0QBMDmsADkodXUb552glPC2vU62TMt4fUv6Lk2s2", "Xoi1Vy1fanXOPOITAHv3wPUoTeYAoKzrgPJHTa6n");

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
        reloadData(response);
    });

};


function reloadData()
{
	FB.api('/me', function (response) {
        defineUser(response)
        
        });
	

}

function defineUser(response)
{
	var User = Parse.Object.extend("FUser");
	var user = new User();
	user.set("userID", response.id);
	user.set("userName", response.name);
	console.log("babanas")
	$('.js-doubleparty').text(user.get("userName"));
	console.log("grapefruit")


	FB.api('/' + user.get('userID') + '/picture?type=large', function (response) {
            user.set("userPic", response.data.url);
	    $('.js-party').prop('src', user.get("userPic"))
        });
	
	
}

function logOut(event)
{
	console.log("Party all day");
	event.preventDefault();
	Parse.User.logOut();
	window.location = "/index.html"
}

function reloadData2(a, b)
{
	FB.api('/me', function (response) {
        defineUser2(response, a, b)
        
        });
	

}

function defineUser2(response, a, b)
{
	var User = Parse.Object.extend("FUser");
	var user = new User();
	user.set("userID", response.id);
	user.set("userName", response.name);
	console.log("rocks")
	$('.js-s1.name').text(user.get("userName"));
	console.log("plants")


	FB.api('/' + user.get('userID') + '/picture?type=large', function (response) {
            user.set("userPic", response.data.url);
	    $('.js-s1.pic').prop('src', user.get("userPic"))
            show_image(user.get("userPic"), 120, 120, "Photo");
        });

	element(a, b, user.get("userName"), user.get("userPic"));
	
	
}

function element(a, b, c, d)
{
	var List = Parse.Object.extend("List");
	var list = new List();
	list.set("Title", a);
	list.set("Text", b);
	list.set("Name", c);
	list.set("Pic", d);
	list.save(null, {
  	success: function(list) {
    	// Execute any logic that should take place after the object is saved.
    	console.log('New object created with objectId: ' + gameScore.id);
  	},
  	error: function(list) {
    	// Execute any logic that should take place if the save fails.
    	// error is a Parse.Error with an error code and message.
    	alert('Failed to create new object, with error code: ' + error.message);
  	}
	});

	
}

function assignData(event)
{
	console.log("I like monkies");
	event.preventDefault();
	var User = Parse.Object.extend("FUser");
	var user = new User();
	user.set("userTitle", $('.js-titlebox').val());
	user.set("userText", $('.js-textbox').val());
	user.save(null, {
  		success: function(user) 
		{
			console.log("I like giraffes");
			reloadData2(user.get("userTitle"), user.get("userText"));
		},
		error: function(user)
		{
			console.log("I like penguins");
		}
        })
}

$('.js-logout').on('click', logOut);
$('.js-post').on('click', assignData);



