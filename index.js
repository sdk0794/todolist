// Initialize Firebase
var config = {
    apiKey: "AIzaSyCntZUpbYZgAtYIrBEs_umWIUN7sXJ0jxk",
    authDomain: "todolist-4dd53.firebaseapp.com",
    databaseURL: "https://todolist-4dd53.firebaseio.com",
    projectId: "todolist-4dd53",
    storageBucket: "todolist-4dd53.appspot.com",
    messagingSenderId: "465703221175"
};
firebase.initializeApp(config);

var database = firebase.database();

var items = [];


var newItem = firebase.database().ref('list');

newItem.on('child_added', function(data) {


    items.push(data);
    
    createListItem(data.val().item);
    //handleClose();
});

newItem.on('child_removed', function(data) {
    console.log('delete');
});






// ALL THE ELEMENTS
const input_div = document.getElementsByClassName('input-div')[0];

const input = input_div.getElementsByTagName('input')[0];
const addBtn = input_div.getElementsByTagName('span')[0];

const list = document.getElementsByClassName('list')[0];

// Functions


function createListItem(item){

    console.log('new item created ' + item);

    let li = document.createElement('li');
    let li_text = document.createTextNode(item);
    li.appendChild(li_text);

    let span = document.createElement('span');
    span.appendChild(document.createTextNode('\u00D7'));

    li.appendChild(span);
    list.appendChild(li);
    handleClose();
    
}

var closeBtns;

function handleClose(){
    closeBtns = document.querySelectorAll('.list li span');
    //console.log(closeBtns);

    onclickClose();
}



function onclickClose(){

    closeBtns.forEach(btn => {
        btn.onclick = function(){
            console.log('close');
            let li = btn.parentElement.childNodes[0].nodeValue;
            item = items.filter((obj) => obj.val().item === li);
            console.log(item);
            database.ref('list').child(item[0].key).remove();            
            this.parentElement.parentElement.removeChild(this.parentElement);
        }        
        
    });
    // # Dont Know why this is not working
    // closeBtns.forEach(btn => {
    //     btn.addEventListener('click', function(){
    //         let li = btn.parentElement.childNodes[0].nodeValue;
    //         data = data.filter((obj) => obj.item !== li);
    //         btn.parentElement.parentElement.removeChild(btn.parentElement);
    //     });
    // });
}

// function populateList(){

//     database.ref('list').once('value', function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//           var childKey = childSnapshot.key;
//           var childData = childSnapshot.val();
//           console.log(childData);
//           createListItem(childData.item);
//         });
//     });   // console.log(data);
// }

// ADD TO LIST ON CLICKING BUTTON
addBtn.addEventListener('click', function(){
    let item = input.value;

    if(item == ""){
        alert("Please Write something");
    }else{

        var newItem = database.ref('list').push();
        newItem.set({
            item: item
        });
        
        
    }

    
    input.value = "";
    handleClose();
    
    
});

// ADD TO LIST ON PRESSING ENTER
input.addEventListener("keyup", function(e){
    e.preventDefault();

    if (e.keyCode === 13){
        addBtn.click();
    }
})

// MAKE ITEM CHECKED

list.addEventListener('click', function(e){
    if (e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
    }
});



handleClose();