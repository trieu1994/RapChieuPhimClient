
// window.fbAsyncInit = function () {
//         FB.init({
//             appId: '440310569321981',
//             cookie: true,
//             xfbml: true,
//             version: 'v2.6',
//             status: true
//         });
//         FB.AppEvents.logPageView();
//         $('body').trigger('facebook:init');
//     };

//     // Load the SDK asynchronously
//     (function (d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id))
//             return;
//         js = d.createElement(s);
//         js.id = id;
//         js.src = "//connect.facebook.net/en_US/sdk.js";
//         fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));

// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '1650438311721724',
//       xfbml      : true,
//       version    : 'v2.4'
//     });
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/<lan_LAN>/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
window.fbAsyncInit = function () {
        FB.init({
            appId: '196731574429025',
            cookie: true,
            xfbml: true,
            version: 'v3.0',
            status: true
        });
        FB.AppEvents.logPageView();
        $('body').trigger('facebook:init');
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));