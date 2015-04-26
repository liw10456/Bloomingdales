function validate() {
    var display = document.getElementById("display");
    var firstname = document.getElementById("firstname");
    var fir_result = document.getElementById("fir_result");
    var f_name = document.getElementById("f_name");
    var lastname = document.getElementById("lastname");
    var username = document.getElementById("username");
    var tooltip = document.getElementById("tooltip");
    var pwd = document.getElementById("pwd");
    var Password = document.getElementById("Password");
    var number = /\d{1}/; // At Least a number
    var re = /[a-z]+/; // At Least a letter
    var re2 = /[A-Z]+/; // At Least a upper letter
    var character = /[!@#$%^&*]/; // At Least a character  
    var wrong = 0;


    if (firstname.value == "") {
        var newElement = document.createElement('div');

        fir_result.style.visibility = "visible";
        firstname.className = "tip redborder";
        fir_result.innerHTML = "Required Field";
        f_name.style.color = "#993300";
        wrong++;
    } else if (firstname.value != "") {
        var newElement = document.createElement('div');
        fir_result.style.visibility = "hidden";
        firstname.className = "tip";
        fir_result.style.visibility = "hidden";
    }

    if (!(re.test(pwd.value) && re2.test(pwd.value) && (number.test(pwd.value) || character.test(pwd.value)))) {
        pwd.className = "tip redborder";
        Password.style.color = "#993300";
        display.innerHTML = "Must contain:";
        tooltip.style.display = "none";
        if (number.test(pwd.value) == false && character.test(pwd.value) == false) {
            display.style.visibility = "visible";
            var newElement = document.createElement('div');
            newElement.innerHTML = "one digit or special character";

            document.getElementById("myBtn").style.background = "grey";
            document.getElementById("display").appendChild(newElement);
        }

        if (re.test(pwd.value) == false) {
            display.style.visibility = "visible";
            var newElement = document.createElement('div');
            newElement.innerHTML = "lower case character";

            document.getElementById("display").appendChild(newElement);
        }

        if (re2.test(pwd.value) == false) {
            display.style.visibility = "visible";
            var newElement = document.createElement('div');
            newElement.innerHTML = "upper case character";

            document.getElementById("display").appendChild(newElement);

        }

        wrong++;

    }

    if (wrong > 0) {
        return;
    }

    var params = JSON.stringify({
        first: firstname.value,
        last: lastname.value,
        user: username.value,
        password: pwd.value
    });

    var xhr = new XMLHttpRequest();
    //var params = "firstname=" + firstname.value + "&lastname=binny";
    xhr.open("POST", "/echo/json/", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () { //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(params);
            var seconds_left = 5;
            var interval = setInterval(function () {
                document.getElementById('sucess').innerHTML = "Sucess!" + "&nbsp" + "You will be redirectd to Bloomingdales in" + "&nbsp" + --seconds_left + "&nbsp" + "Second";
                document.getElementById('display').style.visibility = "hidden";
                document.getElementById('pwd').className = "tip";
                if (seconds_left <= 0) {
                    window.location.href = "http://www.bloomingdales.com";
                    clearInterval(interval);
                }
            }, 1000);
        }
    }
    xhr.send(params);
}
