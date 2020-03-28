export const tests = [{
  name: '1. Nazwa strony została zmieniona.',
  isCorrect: () => {
    const defaultTitle = 'Your site name';
    const headerTitle = document.querySelector('.exercise-header').textContent;
    return document.title !== defaultTitle && headerTitle !== defaultTitle;
  },
  hint: 'Zmień nazwę strony nie tylko w headerze, ale też w tytule karty.'
}, {
  name: '2. Kolory headera i buttona zostały zmienione.',
  isCorrect: () => {
    const submitBtn = document.querySelector('.submit-btn');
    const header = document.querySelector('.exercise-header');
    const defaultButtonColors = [
      'rgb(221, 221, 221)', // Chrome on Windows
      'rgb(256, 256, 256)', // Chhrome on Mac
    ];

    const btnColor = window.getComputedStyle(submitBtn).getPropertyValue('background-color');
    const headerColor = window.getComputedStyle(header).getPropertyValue('background-color');
    return !defaultButtonColors.includes(btnColor) && headerColor !== 'rgb(128, 128, 128)';
  },
  hint: 'Header ma klasę .exercise-header, a button .submit-btn. Żeby przejść ten test należy zmienić im background-color w CSSach :)',
}, {
  name: '3. Nie można zmienić rozmiaru dużego pola tekstowego.',
  isCorrect: () => {
    const textarea = document.querySelector('#interests');
    const textareResizing = window.getComputedStyle(textarea).getPropertyValue('resize');

    return textareResizing === 'none';
  },
  hint: 'Opcja w CSSach, która jest za to odpowiedzialna, jest opisana tutaj: https://developer.mozilla.org/en-US/docs/Web/CSS/resize'
}, {
  name: '4. Pola tekstowe mają ten sam kolor bordera (obwódki).',
  isCorrect: () => {
    const inputs = [
      ...Array.from(document.querySelectorAll('.exercise-form input')),
      document.querySelector('.exercise-form textarea'),
    ];
    const color = window.getComputedStyle(inputs[0]).getPropertyValue('border-color');
    return inputs.every(input => window.getComputedStyle(input).getPropertyValue('border-color') === color) && color !== 'rgb(0, 0, 0)';
  },
  hint: 'Opcja w CSSie się nazywa border-color.'
}, {
  name: '5. Formularz ma walidowane pola.',
  isCorrect: () => {
    const inputs = [
      ...Array.from(document.querySelectorAll('.exercise-form input')),
      document.querySelector('.exercise-form textarea'),
    ];
    let borderColorBefore = window.getComputedStyle(inputs[0]).getPropertyValue('border-color');;

    inputs.forEach(input => {
      input.value = 'any text';
    });
    document.querySelector('.submit-btn').click();
    if (!arraysHaveEqualValues(getValidityOfFields(inputs, borderColorBefore), [true, true, false, true])) {
      resetInputs(inputs);
      return false;
    }
    resetInputs(inputs);
    inputs[0].value = 'Name';
    inputs[1].value = '';
    inputs[2].value = 'email@site.domain';
    inputs[3].value = '';
    document.querySelector('.submit-btn').click();
    
    if (!arraysHaveEqualValues(getValidityOfFields(inputs, borderColorBefore), [true, false, true, true])) {
      resetInputs(inputs);
      return false;
    }
    resetInputs(inputs);
    return true;
  },
  hint: `Wartość pola tekstowego uzyskasz pisząc document.querySelector('#first_name').value.
    Sprawdzisz, czy string jest pusty pisząc !!nazwaZmiennej albo nazwaZmiennej.length === 0.
    Sprawdzisz, czy email ma poprawną formę, najłatwiej, testując go regexem: /^\S+@\S+\.\S+$/.test(email).
    Jak już się dowiesz czy pola są niepoprawne, wtedy należy im dodać klasę document.querySelector('#first_name').classList.add('invalid').
    I potem w CSSach dodać, że ta klasa zmienia kolor bordera (obwódki).
    A na koniec dla pól które były niepoprawne, ale stały się znowu poprawne, trzeba im usunąć klasę 'invalid' :)`,
}, {
  name: '6. Wyślij requesta i wyświetl odpowiedź na stronie',
  isCorrect: () => {
    return document.body.innerHTML.search("Awesome!!!") !== -1;
  },
  hint: `W funkcji submit w index.js, po miejscu .then((response) => { , należy napisać dodawanie do HTMLa wartości response.status.
  Jak to zrobić, możesz podejrzeć w pliku tests/testsRunner.js, w funkcji runTests.`,
}];

const getValidityOfFields = (inputs, borderColorBefore) => {
  return inputs.map((input, index) => {
    return window.getComputedStyle(input).getPropertyValue('border-color') === borderColorBefore;
  });
};

const resetInputs = (inputs) => {
  inputs.forEach(input => {
    input.value = 'email@site.domain';
  });
  document.querySelector('.submit-btn').click();
  inputs.forEach(input => {
    input.value = '';
  });
}

const arraysHaveEqualValues = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
}