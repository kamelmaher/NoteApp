// Selectors
let myNoteButton = document.querySelector(".main li:first-child");
let createNoteButton = document.querySelector(".create");
let myNotes = document.querySelector(".my-notes");
let myNotesClose = document.querySelector(".my-notes button");
let creatNote = document.querySelector(".create-note");
let cancelNote = document.querySelector(".create-note button:last-child");
let myNotesList = document.querySelector(".my-notes ul");
let cerateItem = document.querySelector(".create-note button");
let textArea = document.querySelector("textarea");
let noteTitle = document.querySelector("input");
let note = document.querySelector(".note");
let deleteNotes = document.querySelector(".delete")
let notesTitles =[];
let myNote = [];
// Local Storage
if(localStorage.getItem("title")){
    notesTitles = JSON.parse(localStorage.getItem("title"))
}
if(localStorage.getItem("note")){
    myNote = JSON.parse(localStorage.getItem("note"))
}
console.log(myNote)
console.log(notesTitles)
// Actions
myNoteButton.addEventListener("click" , ()=> {
    myNotes.classList.add("active");
    myNotesList.innerHTML = ''
    for(let i = 0 ; i < myNote.length ; i++) {
        createLi(notesTitles[i]);
    }
    let myNotesItems = document.querySelectorAll(".my-notes li");
    myNotesItems.forEach((e , index)=> {
        e.addEventListener("click" , ()=> {
            showNote(notesTitles[index] , myNote[index])
        })
    })
})

// Close My Note Div
myNotesClose.addEventListener("click" , ()=> {
    myNotes.classList.remove("active");
})

// Show Create Note Form
createNoteButton.addEventListener("click" , ()=> {
    creatNote.classList.add("active");
})
// Create Note Function
cerateItem.addEventListener("click" , ()=> {
    if(textArea.value && noteTitle.value) {
        myNote.push(textArea.value);
        notesTitles.push(noteTitle.value);
        createLi(noteTitle.value);
        localStorage.setItem("title" , JSON.stringify(notesTitles))
        localStorage.setItem("note" , JSON.stringify(myNote))
        noteTitle.value = ""
        textArea.value = ""
        hideCreateNote();
    }
})

function showNote (title , text) {
    note.classList.add("active");
    document.querySelector(".note h2").innerHTML = title;
    document.querySelector(".note p").innerHTML = text;
    myNotes.classList.remove("active");
    document.querySelector(".note button").addEventListener("click" , ()=> {
        note.classList.remove("active");
    })
}

const hideCreateNote = () =>  {
    creatNote.classList.remove("active")
    noteTitle.value = ""
    textArea.value = ""
};
function createLi (content) {
    let Title = document.createElement("li");
    Title.innerHTML = content;
    myNotesList.appendChild(Title);
}
deleteNotes.addEventListener("click" , ()=> {
    localStorage.clear();
    myNote = []
    notesTitles = []
})
// Cancel Create Note
cancelNote.addEventListener("click" , hideCreateNote)