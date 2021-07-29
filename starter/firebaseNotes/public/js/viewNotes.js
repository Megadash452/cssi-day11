let googleUser;
const notesDiv = document.getElementById('app');
const editModal = document.getElementById('edit-modal');
const editTitle = document.getElementById('edit-title');
const editText = document.getElementById('edit-text');
const editSave = document.getElementById('edit-save');

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
            renderNote(data[key], key);
    });
};

function renderNote(note, id) {
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
                <footer class="card-footer">
                    <a onclick="editNote('${id}')" href="#" class="card-footer-item">Edit</a>
                    <a onclick="deleteNote('${id}')" href="#" class="card-footer-item">Delete</a>
                </footer>
            </div>
        </div>
    ` 
}

function deleteNote(noteId) {
    firebase.database().ref(`users/${googleUser.uid}/${noteId}`).remove();
}

function editNote(noteId) {
    firebase.database().ref(`users/${googleUser.uid}/${noteId}`).once('value', snapshot => {
        const note = snapshot.val();
        editTitle.value = note.title;
        editText.value = note.text;
        document.getElementById('edit-note-id').value = noteId;

        editModal.classList.add("is-active");
    });
}

function saveEdit() {
    const noteId = document.getElementById('edit-note-id').value;
    firebase.database().ref(`users/${googleUser.uid}/${noteId}`).update({
        title: editTitle.value,
        text: editText.value
    });
    closeModal();
}

function closeModal() {
    editModal.classList.remove("is-active");
    let inputs = editModal.querySelectorAll("input");
    for (let input of inputs)
        input.value = "";
}