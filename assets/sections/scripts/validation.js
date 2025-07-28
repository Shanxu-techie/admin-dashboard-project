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
    if(name.value.trim()===""){
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