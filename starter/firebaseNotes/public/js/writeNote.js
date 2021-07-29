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
    let note = {
        title: document.getElementById('noteTitle').value,
        text: document.getElementById('noteText').value
    };
    console.log(note);
    // 2. Format the data and write it to our database
    firebase.database().ref(`users/${googleUser.uid}`)
        .push(note).then(() => {
            document.getElementById('noteTitle').value = "";
            document.getElementById('noteText').value = "";
        });
}