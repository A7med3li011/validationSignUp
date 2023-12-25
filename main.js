let containerWelcom = document.querySelector(".containerWelcom")

//for login page
let login = document.querySelector(".containerlogin")
let loginEmail = document.querySelector("#loginEmail")
let loginPassword = document.querySelector("#loginPassword")
let loginBtn = document.querySelector("#loginBtn")
let ancorLogIn = document.querySelector("#ancorLogIn")
let worngMessage = document.querySelector("#worngMessage")
//for sign up page
let signup = document.querySelector(".containersignup")
let signupName = document.querySelector("#signupName")
let signupEmail = document.querySelector("#signupEmail")
let signupPassword = document.querySelector("#signupPassword")
let signupBtn = document.querySelector("#signupBtn")
let ancorSignIn = document.querySelector("#ancorSignIn")
let ancorBack = document.querySelector("#ancorBack")
let warningEmail = document.querySelector("#warningEmail")



if (JSON.parse(localStorage.getItem("currentuser"))) {
    console.log(JSON.parse(localStorage.getItem("currentuser")))
    let span = document.createElement("span")
    spantext = document.createTextNode(JSON.parse(localStorage.getItem("currentuser")).name)
    span.appendChild(spantext)
    document.querySelector("#welcomText").appendChild(span)
    login.classList.add("d-none")
    signup.classList.add("d-none")
    containerWelcom.classList.remove("d-none")
}
ancorLogIn.addEventListener("click", (e) => {
    e.preventDefault();
    login.classList.add("d-none")
    signup.classList.remove("d-none")
})
ancorSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    login.classList.remove("d-none")
    signup.classList.add("d-none")
})



//implementation for signup
let arrOfUsers = []
if (JSON.parse(localStorage.getItem("user"))) {
    arrOfUsers = JSON.parse(localStorage.getItem("user"))

}

signupBtn.addEventListener("click", (e) => {
    

    e.preventDefault();
    if (validEmail(signupEmail.value) && validPassword(signupPassword.value) && signupName.value != "") {
        for (let i = 0; i < arrOfUsers.length; i++){
           if(arrOfUsers[i].email == signupEmail.value){
            warningEmail.classList.remove("d-none")
            return
           }else{
            warningEmail.classList.add("d-none")
           }
        }
       

        let user = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        }
        arrOfUsers.push(user)
        localStorage.setItem("user", JSON.stringify(arrOfUsers))
        clearInput()
        signupName.style = ""
        signupPassword.style = ""
        signupEmail.style = ""
    }else{
        signupName.style = "border:2px solid red"
        signupPassword.style = "border:2px solid red"
        signupEmail.style = "border:2px solid red"
    }
})

// localStorage.clear()

function clearInput() {
    signupName.value = ""
    signupEmail.value = ""
    signupPassword.value = ""
    loginEmail.value = ""
    loginPassword.value = ""
}


//implementation for login 

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let checkEmail = loginEmail.value
    let checkPassword = loginPassword.value

    for (let i = 0; i < arrOfUsers.length; i++) {
        if (arrOfUsers[i].email == checkEmail && arrOfUsers[i].password == checkPassword) {
            worngMessage.classList.add("d-none")
            login.classList.add("d-none")
            containerWelcom.classList.remove("d-none")


            let currentuser = {
                name: arrOfUsers[i].name,
                state: true
            }

            localStorage.setItem("currentuser", JSON.stringify(currentuser))

            let span = document.createElement("span")
            spantext = document.createTextNode(currentuser.name)
            span.appendChild(spantext)
            document.querySelector("#welcomText").appendChild(span)


            return
        } else {

            console.log("not valid")
            worngMessage.classList.remove("d-none")
        }
    }

})

ancorBack.onclick = () => {
    localStorage.removeItem("currentuser")
}


function validEmail(email) {
    let regx = /^[\w\.-]+@[\w\.-]+\.\w+$/
    return regx.test(email)

}



function validPassword(pass) {
    let regx = /^.{5,}$/
    return regx.test(pass)

}   


