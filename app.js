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
//Address class
class Address{ 
    constructor(id, addrName, firstName, lastName, email, phone, streetAddr, postCode, city, country, labels){
        this.id = id;
        this.addrName = addrName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.streetAddr = streetAddr;
        this.postCode = postCode;
        this.city = city;
        this.country = country;
        this.labels = labels; 
    }
}

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

    //add an adress item
    modalBtns.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.id == "save-btn"){
            let isFormValid = getFormData();
            if(!isFormValid){
                form.querySelectorAll('input').forEach(input =>{
                    setTimeout(()=>{
                        input.classList.remove('errorMsg');
                    }, 1500)
                })
            } else {
                // let allItem = 
            }
        }
    })
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

//get form data
function getFormData(){
    let inputValidStatus = []
    // console.log(form.addr_ing_name.value, form.first_name.value, form.last_name.value, form.email.value, form.phone.value, form.street_addr.value, form.postal_code.value, form.city.value, form.country.value, form.labels.value);
    if(!strRegex.test(form.addr_ing_name.value) || form.addr_ing_name.value.trim().length==0){
        addErrMsg(form.addr_ing_name)
        inputValidStatus[0] = false;
    }else {
        addrName = form.addr_ing_name.value;
        inputValidStatus[0] = true;
    }

    if(!strRegex.test(form.first_name.value) || form.first_name.value.trim().length==0){
        addErrMsg(form.first_name)
        inputValidStatus[1] = false;
    }else {
        firstName = form.first_name.value;
        inputValidStatus[1] = true;
    }

    if(!strRegex.test(form.last_name.value) || form.last_name.value.trim().length==0){
        addErrMsg(form.last_name)
        inputValidStatus[2] = false;
    }else {
        lastName = form.last_name.value;
        inputValidStatus[2] = true;
    }

    if(!emailRegex.test(form.email.value)){
        addErrMsg(form.email)
        inputValidStatus[3] = false;
    }else {
        email = form.email.value;
        inputValidStatus[3] = true;
    }

    if(!phoneRegex.test(form.phone.value)){
        addErrMsg(form.phone)
        inputValidStatus[4] = false;
    }else {
        phone = form.phone.value;
        inputValidStatus[4] = true;
    }

    if(!(form.street_addr.value.trim().length > 0)){
        addErrMsg(form.street_addr)
        inputValidStatus[5] = false;
    }else {
        streetAddr = form.street_addr.value;
        inputValidStatus[5] = true;
    }

    if(!digitRegex.test(form.postal_code.value)){
        addErrMsg(form.postal_code)
        inputValidStatus[6] = false;
    }else {
        postCode = form.postal_code.value;
        inputValidStatus[6] = true;
    }

    if(!strRegex.test(form.city.value) || form.city.value.trim().length == 0){
        addErrMsg(form.city)
        inputValidStatus[7] = false;
    }else{
        city = form.city.value;
        inputValidStatus[7] = true;
    }
    country = form.country.value;
    labels = form.labels.value;
    return inputValidStatus.includes(false) ? false : true
}

function addErrMsg(inputBox){
    inputBox.classList.add('errorMsg');
}