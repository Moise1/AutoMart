const form = document.getElementById('form');
const closebtn = document.getElementById('closebtn').addEventListener('click', ()=>{
    form.style.display = "none";
})

window.onclick = (e) =>{
    if (e.target == form) {
      form.style.display = "none";
    }
  }
