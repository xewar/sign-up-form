import './styles.css';

//Built with the help of Florin Pop's form validation tutorial (https://www.youtube.com/watch?v=rsd4FNGTRBw)

const firstName = document.getElementById('firstName');
const userEmail = document.getElementById('userEmail');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.querySelector('.form');


// Prevent form from submitting if there are any errors
form.addEventListener('submit',(e) => {
    if (checkInputs() === 0) {
        e.preventDefault()
    }
});

const checkInputs = () => {
    //get values from the inputs
    const firstNameValue = firstName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    if (firstNameValue === ""){
        setErrorFor(firstName, "Please provide a first name.")
    } else{
        //add success class
        setSuccessFor(firstName)
    }
    if (userEmailValue === ""){
        setErrorFor(userEmail,"Please provide an email.");
    } else if (!isEmail(userEmailValue)) {
        setErrorFor(userEmail,"Email is not valid, please provide a valid email.");
    } else {
        setSuccessFor(userEmail);
    }
    if (passwordValue === "") {
        setErrorFor(password,"Please create and confirm a password of at least five characters.")
    } else if (passwordValue.length < 5){
        setErrorFor(password,"Password must be at least five characters.")
    } else {
        setSuccessFor(password)
    }
    if (confirmPasswordValue === "") {
        setErrorFor(confirmPassword,"Please confirm your password here.")
    } else if (confirmPasswordValue !== passwordValue){
        setErrorFor(confirmPassword,"Passwords don't match.")
        setErrorFor(password,"Passwords don't match.")
    } else {
        setSuccessFor(confirmPassword)
    }
    let success = 1
    for (let item of [firstName, userEmail, password, confirmPassword]) {
        if (item.parentElement.className.includes('error')){
            success = 0;
        }
    }
    return success
}
//function to add an error message if a required input isn't valid
const setErrorFor = (input, message) => {
    const cell = input.parentElement; //cell div to apply error class to
    const small = cell.querySelector('small');
    //set error message
    small.innerHTML = message;
    //add error class
    cell.className = "cell error";
}
const setSuccessFor = (input) => {
    const cell = input.parentElement; //target the item in the form
    cell.className = "cell success";

}
const isEmail = (email) => {
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/ 
    //Returns true if it finds a match and the email is valid, otherwise false
    return emailRegex.test(email)
}