
// make these variables constant to use in all parts of js code
// document.getElementById("gender") is for getting the element from html wich it's id is gender
const gender = document.getElementById("gender");
const prob = document.getElementById("prob");
const saved_gender = document.getElementById("save_gender");


// check if the input name is only letters and spaces
function validateForm(e) {
    let valid = true;
    var reg_name = /^[a-zA-Z\s]*$/; //using regix for checking the letters and spaces
    if (!reg_name.test(e)) {
        alert("Correct your Name: only letters and spaces."); //to show notification in web page
        valid = false;
    }
    return valid;
}


// async fuction for not sync fetch and awaint usage.
// this function fetch the url which is sending name as a parameter in get method
// and return the response as a promise object 
// and then fill the gender and prob based on recieved response
async function sendToBaseUrl() {
    event.preventDefault(); //for preventing the web to do it's default behavior
    let name = document.getElementById("name").value //get the name that user enter in input lable
    if (validateForm(name)) {
        let fetchRes = fetch("https://api.genderize.io/?name=" + name);
        fetchRes.then((response) => {
            if (response.ok) {
                return response.json();
            } else { //if the response was not ok show the error in prediction block
                gender.innerHTML = "somthing went wrong",
                    prob.innerHTML = "please try again!"
            }
        })
            .then(d => {
                if (d.gender) {
                    gender.innerHTML = d.gender,
                        prob.innerHTML = d.probability
                } else {
                    gender.innerHTML = "no prediction!",
                        prob.innerHTML = "fill the boxes."
                }
            })
            .catch((error) => { 
                console.log(error)
            });
            
            if(!check_storage(name)){ //if the name has not been saved before the make the Saved Answers block hidden
                document.getElementById("save-div-id").style.visibility="hidden";
            }else{ //if the name has been saved in local storage the fill the gender lable in that block and show it!
                saved_gender.innerHTML = localStorage.getItem(name);
                document.getElementById("save-div-id").style.visibility="visible"; 
            }

    } else {
        gender.innerHTML = "Correct the Name",
            prob.innerHTML = "only letters and spaces"
    }

}

// save the given name by clicking save button 
// one of the radio buttons have to be choosen or the alter show in web page
function save_name() {
    event.preventDefault();
    sendToBaseUrl();
    let name = document.getElementById("name").value
    if (validateForm(name)) {
        const rbs = document.querySelectorAll('input[name="choice"]');
        let selectedValue;
        for (const rb of rbs) { //to check all the radio buttons and get the choosen one
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }
        if (selectedValue) { //save the lable of the radio button as the gender lable in Saved Answers 
            localStorage.setItem(name, selectedValue);
            saved_gender.innerHTML = selectedValue;
        } else {
            alert("please choose one of the boxes!")
        }
    }
    else { //show error in prediction block
        gender.innerHTML = "Correct the Name",
            prob.innerHTML = "only letters and spaces"
    }
}

// check if the given name is in local storage or not
function check_storage(name) {
    let is_used = false;
    for (var i = 0, len = localStorage.length; i < len; i++) {
        if (name == localStorage.key(i)) {
            is_used = true;
        }
    }
    return is_used;
}

// delete the name in the input lable from local storage
function delete_saved_name() {
    let name = document.getElementById("name").value
    localStorage.removeItem(name)
}





