const words = ["Welcome to AutoMart !", "Make car deals you won't regret."];
let i = 0;
let timer;

 typingEffect = () => {
	let word = words[i].split("");
	const loopTyping = () => {
		if (word.length > 0) {
			document.getElementById('typer').innerHTML += word.shift();
		} else {
			deletingEffect();
			return false;
		};
		timer = setTimeout(loopTyping, 500);
	};
	loopTyping();
};

deletingEffect = () => {
	let word = words[i].split("");
	const loopDeleting = () => {
		if (word.length > 0) {
			word.pop();
			document.getElementById('typer').innerHTML = word.join("");
		} else {
			if (words.length > (i + 1)) {
				i++;
			} else {
				i = 0;
			};
			typingEffect();
			return false;
		};
		timer = setTimeout(loopDeleting, 200);
	};
	loopDeleting();
};

typingEffect();




 formValidator = () => {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const email = document.getElementById('email').value;

    if (pwd.length < 6) {
        return result.innerHTML = 'Password should be 6 characters long.'
        
    };
    window.location.assign('client.html');

}


