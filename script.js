document
	.getElementById('generate')
	.addEventListener('click', generatePasswords);

// Generate 3 random passwords with one click!
function generatePasswords() {
	// Get the password settings from the user's input
	const length = document.getElementById('length').value; // Password length
	const includeUppercase = document.getElementById('uppercase').checked; // Include uppercase letters?
	const includeLowercase = document.getElementById('lowercase').checked; // Include lowercase letters?
	const includeNumbers = document.getElementById('numbers').checked; // Include numbers?
	const includeSymbols = document.getElementById('symbols').checked; // Include special symbols?

	let passwords = []; // Create an empty array to store the generated passwords
	for (let i = 0; i < 3; i++) {
		// Generate 3 passwords based on the selected options and add them to the array
		passwords.push(
			generatePassword(
				length,
				includeUppercase,
				includeLowercase,
				includeNumbers,
				includeSymbols
			)
		);
		// Now, 'passwords' holds 3 randomly generated passwords that match the selected criteria
	}
	// Display each generated password in the result box for the user to see
	// Also check how strong it is and update the display
	passwords.forEach((password, index) => {
		document.getElementById(`result${index + 1}`).textContent = password;
		updateStrength(password, index + 1);
	});
}

// Generates a random password based on the selected options
function generatePassword(
	length,
	includeUppercase,
	includeLowercase,
	includeNumbers,
	includeSymbols
) {
	let characters = ''; // This variable stores all selected character types for generating the password

	// Add character sets based on user choices
	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const numberChars = '0123456789';
	const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

	if (includeUppercase) characters += uppercaseChars;
	if (includeLowercase) characters += lowercaseChars;
	if (includeNumbers) characters += numberChars;
	if (includeSymbols) characters += symbolChars;

	// If no character type is selected, show an alert and stop
	if (characters === '') {
		alert('Please select at least one character type');
		return '';
	}
	// We randomly select and add one character at a time from the available character set until the password reaches the desired length.
	let password = '';
	for (let i = 0; i < length; i++) {
		password += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return password;
}

// Updates the visual strength indicator for a generated password
function updateStrength(password, index) {
	// Get the strength bar and corresponding text elements for the password at the specified index.
	const strengthIndicator = document.getElementById(
		`strength-indicator${index}`
	);
	const strengthText = document.getElementById(`strength-text${index}`);

	let strength = 0;

	// Evaluate password strength based on different criteria
	if (password.length >= 8) strength++; // Length is at least 8
	if (/[A-Z]/.test(password)) strength++; // Contains uppercase letters
	if (/[a-z]/.test(password)) strength++; // Contains lowercase letters
	if (/\d/.test(password)) strength++; // Contains numbers
	if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) strength++; // Contains special characters

	// Update the strength indicator’s width and color based on the strength score
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
		default: // Covers case 5 (all conditions met)
			strengthIndicator.style.width = '100%';
			strengthIndicator.style.backgroundColor = 'green';
			strengthText.textContent = 'Very strong';
			break;
	}
}
// Loop through each copy button and add a click event listener to it
document.querySelectorAll('.copy-btn').forEach((button, index) => {
	// When a button is clicked, we call the function to copy the corresponding password
	button.addEventListener('click', () => {
		copyToClipboard(index + 1);
	});
});

// Function to copy the password text to the clipboard
function copyToClipboard(index) {
	// Retrieve the password text associated with the clicked copy button
	const text = document.getElementById(`result${index}`).textContent;
	// Try to copy the password to the clipboard
	navigator.clipboard
		.writeText(text)
		.then(() => alert(`Password ${index} copied!`)) // Show a success message once the password is copied
		.catch((err) => console.error('Error copying password: ', err)); // If something goes wrong, log the error
}
