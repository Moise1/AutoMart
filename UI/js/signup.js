function formValidator() {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const email = document.getElementById('email').value;

    if (pwd.length < 6) {
        return result.innerHTML = 'Password should be 6 characters long.'
        
    };
    window.location.assign('client.html');

}