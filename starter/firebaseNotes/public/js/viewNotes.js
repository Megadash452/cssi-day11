let googleUser;
const notesDiv = document.getElementById('app');

window.onload = e => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            googleUser = user;
            getNotes(user.uid);
        } else
            window.location = "index.html";
    });
};

function getNotes(uid) {
    firebase.database().ref(`users/${uid}`).on('value', snapshot => {
        const data = snapshot.val();
        notesDiv.innerHTML = '';
        for (let key in data)
            renderNote(data[key]);
    });
};

function renderNote(note) {
    console.log(note);
    notesDiv.innerHTML += `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>
    ` 
}