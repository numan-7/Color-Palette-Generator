const form = document.getElementById("colorForm")
const colorType = document.getElementById("colorTypes")
const colorPicker = document.getElementById("colorPicker")
const copyColor = document.getElementsByClassName("click")

let colorArray = [
    "#000000",
    "#1a1919",
    "#343232",
    "#4f4a4a",
    "#6a6262"
]

form.addEventListener("submit", (e) => {
    // prevent refresh default
    e.preventDefault()
    // get user select color
    let hexValue = colorPicker.value
    // get rid of # from hexValue
    hexValue = hexValue.slice(1)
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${colorType.value}&count=5`,{
        method: "GET"
    })
    .then(res => res.json())
    .then(data => {
        // fills up columns with returned color data
        for(let i = 0; i < 5; i++){
            let num = i+1;
            let colorID = ("color" + num)
            let colorTextContentID = ("color" + num + "a")
            document.getElementById(`${colorID}`).style.background = `${data.colors[i].hex.value}`
            document.getElementById(`${colorTextContentID}`).textContent = `${data.colors[i].hex.value}`
            colorArray[i] = `${data.colors[i].hex.value}`      
        }
    })
})

document.querySelectorAll('.click').forEach(item => {
    item.addEventListener('click', event => {
        // get class name
        let colorIndex = item.classList[1]
        // splice string so only the index remains
        colorIndex = colorIndex.slice(5)
        // use that index num to copy hex color
        navigator.clipboard.writeText(colorArray[colorIndex-1])
        // alert the copied text
        alert("Copied Hex " + colorArray[colorIndex-1]);
    })
})