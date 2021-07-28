let googleUser;

window.onload = e => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
        } else
            window.location = "index.html";
    });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data
    // 2. Format the data and write it to our database
    // 3. Clear the form so that we can write a new note
}