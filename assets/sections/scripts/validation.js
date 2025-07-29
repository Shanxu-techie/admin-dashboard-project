export function emailValidate(email) {
    const helpEmail = document.getElementById("help-email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        helpEmail.textContent = "Enter a valid email address.";
        return false;
    }
    helpEmail.textContent = "";
    return true;
}

export function nameValidate(name){
    const helpFullName = document.getElementById("help-full-name");
    if(!name){
        helpFullName.textContent = "Full name is required.";
        return false;
    }
        helpFullName.textContent = "";
        return true;
}

export function passwordValidate(password){
    const helpPassword = document.getElementById("help-password");
    if (!password || password.length < 8) {
        helpPassword.textContent = "Password must be at least 8 characters.";
        return false;
    }
    helpPassword.textContent = "";
    return true;
}

export function cardNumberValidate(number){
    const num = number.replace(/\D/g, '');
        if (num.length < 13 || num.length > 19) return false;
        
        let sum = 0;
        for (let i = 0; i < num.length; i++) {
            let digit = parseInt(num[i]);
            if ((num.length - i) % 2 === 0) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
}