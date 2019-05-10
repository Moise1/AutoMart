
formValidator = () => {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const email = document.getElementById('email').value;
    if (email==null || email=="" || pwd.length < 6) {
        return result.innerHTML = 'Invalid email or  wrong password.'
    };
    window.location.assign('client.html');
}