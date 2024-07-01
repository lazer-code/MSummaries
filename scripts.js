/* Menu loading */
document.addEventListener('DOMContentLoaded', async function()
{
    try
    {
        const response = await fetch('menu.html');
        const data = await response.text();
        document.body.insertAdjacentHTML('afterbegin', data);
    }
    
    catch (error)
    {
        console.error('Failed to load menu:', error);
    }
});

const container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');

signUpBtn.addEventListener('click', () => toggleFormPanel('right-panel-active'));
signInBtn.addEventListener('click', () => toggleFormPanel(''));

function toggleFormPanel(className)
{
    container.classList.toggle('right-panel-active', className === 'right-panel-active');
}

function isValidEmail(email)
{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isStrongPassword(password)
{
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

function validateAndSubmit(form)
{
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const nameInput = form.querySelector('input[type="text"]');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (form.classList.contains('sign-up-container'))
    {
        const name = nameInput.value.trim();

        if (name === '')
        {
            alert('Name cannot be empty');
            return false;
        }
    }

    if (email === '' || password === '')
        {
        alert('Email and password cannot be empty');
        return false;
    }
    
    else if (!isValidEmail(email))
    {
        alert('Please enter a valid email address');
        return false;
    }
    
    else if (!isStrongPassword(password))
    {
        alert('Password must be at least 8 characters long and include uppercase, lowercase, and a number');
        return false;
    }

    window.location.href = 'Menu.html';
    return true;
}

function handleFormSubmit(event)
{
    if (event.key === 'Enter')
    {
        const activeForm = document.querySelector('.form-container.active');

        if (activeForm)
        {
            event.preventDefault();
            validateAndSubmit(activeForm);
        }
    }
}

document.addEventListener('keydown', handleFormSubmit);

document.querySelectorAll('.btn-grad').forEach(button =>
{
    button.addEventListener('click', event =>
    {
        const form = button.closest('.form-container');

        if (form)
        {
            event.preventDefault();
            validateAndSubmit(form);
        }
    });
});
