let form = document.getElementById('form');
let textinput = document.getElementById('textinput');
let msg = document.getElementById('msg');
let dateinput = document.getElementById('dateinput');
let textarea = document.getElementById('textarea');
let activetasks = document.getElementById('active-tasks');
let add = document.getElementById('addme');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    wowItsValid();
});

let wowItsValid = () => {
    if(textinput.value === ""){
        console.log('failure');
        msg.innerHTML = 'Ma\'am? This box is empty....';
    }
    else{
        console.log('success');
        msg.innerHTML = '';
        dataAccept();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss","");
        })();
    }
};

let data = [{}];

let dataAccept = ( ) => {
    data.push({
    text: textinput.value,
    date: dateinput.value,
    desc: textarea.value,
});
    localStorage.setItem("data", JSON.stringify(data))
    console.log(data);
    makeTasks();
    
};

let makeTasks = () => {
    activetasks.innerHTML = "";
    data.map((x,y)=> {
        return (activetasks.innerHTML += `<div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.desc}</p>
        
        <span class="options">
         <button onClick="updated(this)" data-bs-toggle="modal" data-bs-target="#form" class="edit">edit</button>
         <button onClick="deletepls(this)" class="delete">delete</button>
        </span>
        </div>`
        );
    });

allowFormReset();
}

let allowFormReset = () => {
    textinput.value = "";
    dateinput.value = "";
    textarea.value = "";
}

let deletepls = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

let updated = (e) => {
    let editedtask = e.parentElement.parentElement;

    textinput.value = editedtask.children[0].innerHTML;
    dateinput.value = editedtask.children[1].innerHTML;
    textarea.value = editedtask.children[2].innerHTML;

    editedtask.remove();
}

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    makeTasks();
})();