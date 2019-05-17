// Validate admin log in
formValidator = () => {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const username= document.getElementById('username').value;
    if (username==null || username=="" || pwd.length < 6) {
        return result.innerHTML = 'Invalid username or  wrong password.'
    };
    window.location.assign('../pages/admin_dashboard.html');
}



// Loading the accounts table
const dashboard = document.getElementById('dashboard-info');

const accounts = document.getElementById('accounts').addEventListener('click', () => {
    dashboard.innerHTML = '<object height="900" width="1129" type="text/html" data="accounts.html"></object>';
});


// Deleting account
 deleteRow = (i) => {
    const option = confirm('Are you sure to delete this ad?');
    
    if (option === true) {
        const tableRow = i.parentNode.parentNode;
        tableRow.parentNode.removeChild(tableRow);
    }
    return false;
};
