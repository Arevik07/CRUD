let text = document.getElementById("myText")
console.log(text.innerText);

let usName = document.getElementById("usName")
let usAge = document.getElementById('usAge')

function getVal() {
    fetch("http://localhost:3000/addName",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name: usName.value, age: usAge.value})
    })
  
}
