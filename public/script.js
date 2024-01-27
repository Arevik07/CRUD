let Name = document.getElementById("usName")
let Password = document.getElementById("usPassword")
let Email = document.getElementById('usEmail')

function getVal() {
    fetch("/addName",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name: Name.value, password: Password.value, email: Email.value})
    })

}
