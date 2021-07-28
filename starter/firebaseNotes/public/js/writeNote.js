window.onload = e => {
    firebase.auth().onAuthStateChanged(user => {
        if (user)
            console.log(user);
        else
            window.location = "index.html";
    });
};