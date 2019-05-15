// Get the pop up modal
const modalOne= document.getElementById('modalOne');
const modalTwo= document.getElementById('modalTwo');
const modalThree = document.getElementById('modalThree');
const modalFour = document.getElementById('modalFour');
const modalFive = document.getElementById('modalFive');
const modalSix = document.getElementById('modalSix');


// Close the modal
const closeOne = document.getElementById('closeOne');
const closeTwo = document.getElementById('closeTwo');
const closeThree = document.getElementById('closeThree');
const closeFour = document.getElementById('closeFour');
const closeFive = document.getElementById('closeFive');
const closeSix = document.getElementById('closeSix');

let styles = 
`display: flex; 
margin: 10% 25% auto;
`

 let closeModal = 
  `display: none;
`

// Function to pop up the modal 
getModalOne = () =>{
    modalOne.style.cssText = styles;
}

getModalTwo = () => {
    modalTwo.style.cssText = styles;
}

getModalThree = () =>{
    modalThree.style.cssText = styles;
}

getModalFour = () =>{
    modalFour.style.cssText = styles;
}

getModalFive = () =>{
    modalFive.style.cssText = styles;
}

getModalSix = () =>{
    modalSix.style.cssText = styles;
}



// Function for closing the modal
closeModalOne = () =>{
    modalOne.style.cssText = closeModal;
}

closeModalTwo = () =>{
    modalTwo.style.cssText = closeModal;
}

closeModalThree = () =>{
    modalThree.style.cssText = closeModal;
}

closeModalFour = () =>{
    modalFour.style.cssText = closeModal;
}

closeModalFive = () =>{
    modalFive.style.cssText = closeModal;
}

closeModalSix = () =>{
    modalSix.style.cssText = closeModal;
}

