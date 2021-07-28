console.log("sign in .js")

const signIn = e => {
    let provider = new firebase.auth.GoogleAuthProvider();
    console.log("sign in");

    firebase.auth().signInWithPopup(provider).then(result => {
        var credential = result.credential; /** @type {firebase.auth.OAuthCredential} */
        var token = credential.accessToken; // gives a Google Access Token. Use it to access the Google API.
        var user = result.user; // The signed-in user info.
        
        console.log(user);
        window.location = "writeNote.html";
    }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email; // The email of the user's account used.
        var credential = error.credential; // The firebase.auth.AuthCredential type that was used.
        
        console.log("Oauth broken.....//", errorCode, " > ", errorMessage, '\n\n',
            "Email: ", email, '\n',
            "Credential: ", credential, '\n'
        );
  });
};