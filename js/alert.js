const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const hideMessage = (evt) => {
  if (evt.keyCode === 27 || evt.type === 'click') {
    document.body.lastChild.remove();
    document.removeEventListener('click', hideMessage);
    document.removeEventListener('keydown', hideMessage);

    const errorButton = document.querySelector('.error__button');
    if (errorButton) {
      errorButton.removeEventListener('click', hideMessage);
      document.removeEventListener('keydown', hideMessage);
    }
  }
};

const addListenersOnMessage = () => {
  document.addEventListener('click', hideMessage);
  document.addEventListener('keydown', hideMessage);
};

const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  addListenersOnMessage();
  document.body.append(message);
};

const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  addListenersOnMessage();

  const errorButton = message.querySelector('.error__button');
  errorButton.addEventListener('click', hideMessage);
  document.body.append(message);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 10000);
};

export {showSuccessMessage, showErrorMessage, showAlert};
