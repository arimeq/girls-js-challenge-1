import { tests } from './tests.js';
import './testsResults.css';

function getTestsResultsElement() {
  const className = 'tests-results';
  const element = document.querySelector(`.${className}`);
  if (element) {
    element.parentNode.removeChild(element);
  }

  const newElement = document.createElement('ul');
  newElement.classList.add(className);
  return newElement;
}

function getHintElement(content) {
  const hint = document.createElement('div');
  hint.classList.add('test-hint');
  const showHintButton = document.createElement('button');
  const hintContent = document.createTextNode(content);

  showHintButton.innerText = 'Podpowiedź';
  showHintButton.addEventListener('click', () => {
    hint.appendChild(hintContent);
  });

  hint.appendChild(showHintButton);
  return hint;
}

function getTestElement(test) {
  const testResult = document.createElement('li');
  testResult.classList.add('test');
  const name = document.createElement('span');
  name.classList.add('test-name')
  name.innerText = test.name;
  testResult.appendChild(name);
  testResult.appendChild(getHintElement(test.hint));

  if (!test.isCorrect()) {
    testResult.classList.add('test-invalid');
  }
  return testResult;
}

function runTests() {
  const resultsElement = getTestsResultsElement();
  tests.forEach(test => {
    resultsElement.appendChild(getTestElement(test));
  });
  document.querySelector('main').appendChild(resultsElement);
}

document.querySelector('.test-btn').addEventListener('click', runTests);