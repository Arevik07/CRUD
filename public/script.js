let name = document.getElementById("name")
let price = document.getElementById("price")
let image = document.getElementById('image')



function getVal() {
    fetch("/addName",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({name: name.value, price: price.value, image: image.value})
    })

}
