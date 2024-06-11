let inputElement = document.querySelector('#Search');
let listElement = document.querySelector('#listaCatalogo');
let itemElement = listElement.querySelectorAll('.produto');
let anuncio = document.querySelector('#title');

inputElement.addEventListener("input", (e) => {
  let inputed = e.target.value.toLowerCase()
  itemElement.forEach((li) => {
    let text = li.textContent.toLowerCase()
    if(text.includes(inputed)){
      li.style.display = "block"
    }else{
      li.style.display = "none"
    }
  });
  if (inputed === "") {
    anuncio.style.display = "block";
  } else {
    anuncio.style.display = "none";
  }
})
