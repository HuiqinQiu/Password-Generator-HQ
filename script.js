document
	.getElementById('generate')
	.addEventListener('click', generatePasswords);

// Function to generate 3 passwords
function generatePasswords() {
	const length = document.getElementById('length').value;
	const includeUppercase = document.getElementById('uppercase').checked;
	const includeLowercase = document.getElementById('lowercase').checked;
	const includeNumbers = document.getElementById('numbers').checked;
	const includeSymbols = document.getElementById('symbols').checked;

	let passwords = [];
	for (let i = 0; i < 3; i++) {
		passwords.push(
			generatePassword(
				length,
				includeUppercase,
				includeLowercase,
				includeNumbers,
				includeSymbols
			)
		);
	}
	// set password in the result area
	passwords.forEach((password, index) => {
		document.getElementById(`result${index + 1}`).textContent = password;
		updateStrength(password, index + 1);
	});
}

// Functions to generate a single password
function generatePassword(
	length,
	includeUppercase,
	includeLowercase,
	includeNumbers,
	includeSymbols
) {
	let characters = '';
	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const numberChars = '0123456789';
	const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

	if (includeUppercase) characters += uppercaseChars;
	if (includeLowercase) characters += lowercaseChars;
	if (includeNumbers) characters += numberChars;
	if (includeSymbols) characters += symbolChars;

	if (characters === '') {
		alert('Please select at least one character type');
		return '';
	}

	let password = '';
	for (let i = 0; i < length; i++) {
		password += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return password;
}

// Functions to generate password strength
function updateStrength(password, index) {
	const strengthIndicator = document.getElementById(
		`strength-indicator${index}`
	);
	const strengthText = document.getElementById(`strength-text${index}`);

	let strength = 0;
	if (password.length >= 8) strength++;
	if (/[A-Z]/.test(password)) strength++;
	if (/[a-z]/.test(password)) strength++;
	if (/\d/.test(password)) strength++;
	if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength++;

	switch (strength) {
		case 1:
			strengthIndicator.style.width = '20%';
			strengthIndicator.style.backgroundColor = 'red';
			strengthText.textContent = 'Weak';
			break;
		case 2:
			strengthIndicator.style.width = '40%';
			strengthIndicator.style.backgroundColor = 'orange';
			strengthText.textContent = 'Medium';
			break;
		case 3:
			strengthIndicator.style.width = '60%';
			strengthIndicator.style.backgroundColor = 'yellow';
			strengthText.textContent = 'Good';
			break;
		case 4:
			strengthIndicator.style.width = '80%';
			strengthIndicator.style.backgroundColor = 'green';
			strengthText.textContent = 'Strong';
			break;
		default:
			strengthIndicator.style.width = '100%';
			strengthIndicator.style.backgroundColor = 'green';
			strengthText.textContent = 'Very strong';
			break;
	}
}
// Copy Related Functions
document.querySelectorAll('.copy-btn').forEach((button, index) => {
	button.addEventListener('click', () => {
		copyToClipboard(index + 1);
	});
});
function copyToClipboard(index) {
	const text = document.getElementById(`result${index}`).textContent;
	navigator.clipboard
		.writeText(text)
		.then(() => alert(`Password ${index} copied!`))
		.catch((err) => console.error('Error copying password: ', err));
}
