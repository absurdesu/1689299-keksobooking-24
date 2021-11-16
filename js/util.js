const changeElementState = (elements, isDisabled) => {
  elements.forEach((element) => element.disabled = isDisabled);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {changeElementState, debounce};
