export default class FormValidator {
  constructor(form) {
    this.form = form;
  }
  setSubmitButtonState(inputOne, inputTwo, button) {
    if (inputOne.value.length === 0 && inputTwo.value.length === 0) {
      popupButtonSave.setAttribute("disabled", true);
      // можно лучше: Для валидации используйте кастомный метод validation
      // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity()
    } else if (
      inputOne.value.length > 1 &&
      inputOne.value.length < 30 &&
      inputTwo.value.length > 1 &&
      inputTwo.value.length < 30
    ) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", true);
    }
  }
  checkInputValidity(input, error) {
    const word = {
      validationLenght: "Должно быть от 2 до 30 символов",
      validationRequired: "Это поле обязательное"
    };
    if (input.value.length === 0) {
      // Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов'
      // выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
      // Для примера : const words = { validationLenght: 'Должно быть от 2 до 30 символов'	}
      // Далее words передаётся в функцию и используется.
      error.textContent = word.validationRequired;
    } else if (input.value.length === 1 || input.value.length > 30) {
      error.textContent = word.validationLenght;
    } else {
      error.textContent = "";
    }
  }
}
