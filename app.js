//regular expression for validation
const phoneRegex = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
const strRegex =  /^[a-zA-Z\s]*$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const digitRegex = /^\d+$/;

//-------------------------------------//
const countryList = document.getElementById('country-list');
const fullscreenDiv = document.getElementById('fullscreen-div');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const modalBtns = document.getElementById('modal-btns');
const form = document.getElementById('modal');
const addrBookList = document.querySelector('#addr-book-list');
//------------------------------------------//
let addrName = firstName = lastName = email = phone = streetAddr = postCode = city = country = labels = "";
//UI class
class UI {
    static showModal(){
        modal.style.display = "block";
        fullscreenDiv.style.display = "block";
    }

    static closeModal(){
        modal.style.display = "none";
        fullscreenDiv.style.display = "none";
    }
}

//Dom Content Loaded
window.addEventListener('DOMContentLoaded', ()=> {
    loadJSON(); //loading country list from json file
    eventListeners();
})

// event listeners
function eventListeners(){
    //show add item modal
    addBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('modal-title').innerHTML = "Add Address";
        UI.showModal();
        document.getElementById('modal-btns').innerHTML = `
        <button type = "submit" id="save-btn">Save</button>
        `;
    })

    //close add item
    closeBtn.addEventListener('click', UI.closeModal);
}



//load countries list
function loadJSON(){
    fetch('https://api.jsonbin.io/v3/b/63b6ddbc15ab31599e2dc746')
    .then(response => response.json())
    .then(data => {
        let html='';
        console.log(data)
        data.forEach(country => {
            html +=`
            <option>${country.country}</option>
            `;
        })
        countryList.innerHTML = html;
    })
}