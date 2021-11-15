const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onHideMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  document.body.lastChild.remove();
  document.removeEventListener('click', onHideMessage);
  document.removeEventListener('keydown', onHideMessage);

  const errorButton = document.querySelector('.error__button');
  if (errorButton) {
    errorButton.removeEventListener('click', onHideMessage);
  }
};

const addListenersOnMessage = () => {
  document.addEventListener('click', onHideMessage);
  document.addEventListener('keydown', onHideMessage);
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
  errorButton.addEventListener('click', onHideMessage);
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
