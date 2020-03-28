import './style.css';
import './tests/testsRunner.js';

function getValues() {
  // Funkcja do uzupełnienia
  return {
    first_name: '',
    last_name: '',
    email: '',
    interests: '',
  }
}

function getValuesValidity(values) {
  // Funkcja do uzupełnienia
  return {
    first_name: false,
    last_name: false,
    email: false,
    interests: false,
  }
}

function allValuesValid(valuesValidity) {
  // Funkcja do uzupełnienia
  return false;
}

function changeBordersOnValidity(valuesValidity) {
  // Funkcja do uzupełnienia
}

/**
 * NIE EDYTUJ NICZEGO W PONIŻSZEJ SEKCJI, PROSZĘ! :-)
 */

const submitBtn = document.querySelector('.submit-btn').addEventListener('click', submit);

function submit() {
  const values = getValues();

  const valuesValidity = getValuesValidity(values);
  changeBordersOnValidity(valuesValidity);
  if (!allValuesValid(valuesValidity)) {
    return;
  }

  sendRequest(values).then((response) => {});
}

async function sendRequest(values) {
  const url = 'https://girls-js-exercise-1.free.beeceptor.com/';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(values)
  });
  return await response.json();
}
