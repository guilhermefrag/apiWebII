const submitBtn = document.querySelector('input[type="submit"]');
		submitBtn.addEventListener('click', function(event) {
			event.preventDefault();

			if (checkLogin()) {
				window.location.href = '/cadastra-teste';
			}
		});

		function checkLogin() {
			const username = document.getElementById("username").value;
			const password = document.getElementById("password").value;

			if (username === "admin" && password === "admin") {
				alert("Login efetuado com sucesso!");
				return true;
			} else {
				alert("Usuario ou senha incorretos!");
				return false;
			}
		}