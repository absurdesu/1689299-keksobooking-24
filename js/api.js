const SEND_URL = 'https://24.javascript.pages.academy/keksobooking';
const GET_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess, onError) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(() => {
      onError('Не удалось загрузить данные!');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
