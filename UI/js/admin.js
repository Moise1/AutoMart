formValidator = () => {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const username= document.getElementById('username').value;
    if (username==null || username=="" || pwd.length < 6) {
        return result.innerHTML = 'Invalid username or  wrong password.'
    };
    window.location.assign('client.html');
}