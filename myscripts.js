const gender = document.getElementById("gender");
const prob = document.getElementById("prob");
const saved_gender = document.getElementById("save_gender");

function validateForm(e) {
    let valid = true;

    var reg_name = /^[a-zA-Z\s]*$/;
    if (!reg_name.test(e)) {
        alert("Correct your Name: only letters and spaces.");
        valid = false;
    }
    return valid;
}


async function sendToBaseUrl() {
    event.preventDefault();
    let name = document.getElementById("name").value
    if (validateForm(name)) {
        let fetchRes = fetch("https://api.genderize.io/?name=" + name);
        fetchRes.then((response) => {
            if (response.ok) {
                return response.json();
            } else {
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
            
            if(!check_storage(name)){
                document.getElementById("save-div-id").style.visibility="hidden";
            }else{
                saved_gender.innerHTML = localStorage.getItem(name);
                document.getElementById("save-div-id").style.visibility="visible"; 
            }

    } else {
        gender.innerHTML = "Correct the Name",
            prob.innerHTML = "only letters and spaces"
    }

}


function save_name() {
    event.preventDefault();
    sendToBaseUrl();
    let name = document.getElementById("name").value
    if (validateForm(name)) {
        const rbs = document.querySelectorAll('input[name="choice"]');
        let selectedValue;
        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }
        if (selectedValue) {
            localStorage.setItem(name, selectedValue);
            saved_gender.innerHTML = selectedValue;
        } else {
            alert("please choose one of the boxes!")
        }
    }
    else {
        gender.innerHTML = "Correct the Name",
            prob.innerHTML = "only letters and spaces"
    }
}

function check_storage(name) {
    let is_used = false;
    for (var i = 0, len = localStorage.length; i < len; i++) {
        if (name == localStorage.key(i)) {
            is_used = true;
        }
    }
    return is_used;
}


function delete_saved_name() {
    let name = document.getElementById("name").value
    localStorage.removeItem(name)
}





