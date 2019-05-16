const form = document.getElementById('form');
const  sold = document.getElementById('sold'); 
const fraud = document.getElementById('fraud'); 


const destkTopScreen = window.matchMedia("(min-width: 1224px)"); 
const mobileScreen = window.matchMedia("(min-width: 300px)");

let deskTopScreenStyles =
` color: #fff; 
  background: #f44336; 
  transform: rotate(40deg); 
  width: 4%;
  margin-top: 20px;
  text-align: center;
  position: absolute;
  @keyframes animatezoom {from {transform: scale(0)} to {transform: scale(1)}};
  animation: animatezoom 0.6s;
`;

let mobileScreenStyles =
` color: #fff; 
  background: #f44336; 
  transform: rotate(40deg);
  width: 12%;
  margin-top: 20px;
  text-align: center;
  position: absolute;
  @keyframes animatezoom {from {transform: scale(0)} to {transform: scale(1)}};
  animation: animatezoom 0.6s;
`;


markSold = () =>{
  if(destkTopScreen.matches){
    sold.style.cssText = deskTopScreenStyles; 
    sold.innerHTML = 'Sold';
    return;
  };

  if(mobileScreen.matches){
    sold.style.cssText = mobileScreenStyles; 
    sold.innerHTML = 'Sold';
    return;
  };
};

markFraud = () =>{
  if(destkTopScreen.matches){
    sold.style.cssText = deskTopScreenStyles; 
    sold.innerHTML = 'Fraud';
    return;
  };

  if(mobileScreen.matches){
    sold.style.cssText = mobileScreenStyles; 
    sold.innerHTML = 'Fraud';
    return;
  };
};

const closebtn = document.getElementById('closebtn').addEventListener('click', ()=>{
    form.style.display = "none";
})

window.onclick = (e) =>{
    if (e.target == form) {
      form.style.display = "none";
    }
  }

