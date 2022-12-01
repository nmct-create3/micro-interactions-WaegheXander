let email = {},
  password = {},
  signInButton;

function handleFloatingLabel() {
  document.querySelector('.js-float-input').addEventListener('blur', function () {
    if (this.value != '') {
      document.querySelector('.c-label--float').classList.add('is-floating');
    } else {
      document.querySelector('.c-label--float').classList.remove('is-floating');
    }
  });
}

function handlePasswordSwitcher() {
  const passwordToggle = document.querySelector('.js-pswtoggle');
  const passwordInput = document.querySelector('.js-psw');

  passwordToggle.addEventListener('change', function () {
    console.log('change');
    if (passwordInput.type != 'password') {
      passwordInput.type = 'password';
    } else {
      passwordInput.type = 'input';
    }
  });
}

function getDOMElements() {
  password.input = document.querySelector('.js-password');
  password.field = document.querySelector('.js-password-field');
  password.errorMessage = document.querySelector('.js-password-error-message');

  email.input = document.querySelector('.js-input');
  email.field = document.querySelector('.js-input-field');
  email.errorMessage = document.querySelector('.js-input-error-message');

  signInButton = document.querySelector('.js-sign-in-button');

  enableListeners();
}

const isValidEmailAddress = function (emailAddress) {
  // Basis manier om e-mailadres te checken.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isEmpty = function (fieldValue) {
  return !fieldValue || !fieldValue.length;
};

const isValidPassword = function (pswd) {
  return pswd.length > 1 ? true : false;
};

const checkpswdinput = function (event) {
  if (!isValidPassword(this.value)) {
    password.errorMessage.innerText = 'Invalid password';
    addErrors(password);
  } else {
    password.errorMessage.innerText = '';
    removeErrors(password);
    password.input.removeEventListener('input', checkpswdinput);
  }
};

const checkinput = function (event) {
  if (isEmpty(this.value)) {
    email.errorMessage.innerText = 'This field is required';
    addErrors(email);
  } else if (!isValidEmailAddress(this.value)) {
    email.errorMessage.innerText = 'Invalid emailaddress';
    addErrors(email);
  } else {
    email.errorMessage.innerText = '';
    removeErrors(email);
    email.input.removeEventListener('input', checkinput);
  }
};

function enableListeners() {
  email.input.addEventListener('blur', function () {
    if (isEmpty(this.value)) {
      email.errorMessage.innerText = 'This field is required';
      addErrors(email);
      email.input.addEventListener('input', checkinput);
    } else if (!isValidEmailAddress(this.value)) {
      email.errorMessage.innerText = 'Invalid emailaddress';
      addErrors(email);
      email.input.addEventListener('input', checkinput);
    } else {
      email.errorMessage.innerText = '';
      removeErrors(email);
    }
  });

  password.input.addEventListener('blur', function () {
    if (!isValidPassword(this.value)) {
      password.errorMessage.innerText = 'Invalid password';
      addErrors(password);
      password.input.addEventListener('input', checkpswdinput);
    } else {
      password.errorMessage.innerText = '';
      removeErrors(password);
    }
  });
  signInButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (isEmpty(email.input.value)) {
      email.errorMessage.innerText = 'This field is required';
      addErrors(email);
      email.input.addEventListener('input', checkinput);
    } else if (!isValidEmailAddress(email.input.value)) {
      email.errorMessage.innerText = 'Invalid emailaddress';
      addErrors(email);
      email.input.addEventListener('input', checkinput);
    } else if (!isValidPassword(password.input.value)) {
      password.errorMessage.innerText = 'Invalid password';
      addErrors(password);
      password.input.addEventListener('input', checkpswdinput);
    } else {
      password.errorMessage.innerText = '';
      removeErrors(password);
      console.log(`Email: ${email.input.value} | Password: ${password.input.value}`);
    }
  });
}

const addErrors = function (global) {
  global.field.classList.add('has-error');
};
const removeErrors = function (global) {
  global.field.classList.remove('has-error');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('Script loaded!');
  handleFloatingLabel();
  //handlePasswordSwitcher();
  //getDOMElements();
});
