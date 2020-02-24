
//import "../style.css";
//import "./style.css";
import Api from "./Api.js";
import Card from "./Card.js";
import CardList from "./CardList.js";
import CreatePopupImage from "./CreatePopupImage.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator";
//   import "../images/logo.svg";
// import "../images/close.svg";
// import Api from "./Api.js";
// import Card from "./Card.js";
// import CardList from "./CardList.js";
// import CreatePopupImage from "./CreatePopupImage.js";
// import Popup from "./Popup.js";
// import UserInfo from "./UserInfo.js";
// import FormValidator from "./FormValidator";

const root = document.querySelector(".root");
const container = document.querySelector(".places-list");
const formUser = document.forms.user;
const newName = formUser.elements.userName;
const newJob = formUser.elements.userJob;
const popupButtonAdd = document.querySelector(".popup__button_add");
const form = document.forms.new;
const nameForm = form.elements.name;
const linkForm = form.elements.link;
const formAvatar = document.forms.avatar;
const avatarUrl = formAvatar.elements.userAvatar;
const popupButtonSave = document.querySelector(".popup__button_save");
const popupFormUserNameError = document.querySelector(".popup__name-error");
const popupFormUserJobError = document.querySelector(".popup__job-error");
const userFormInputUserName = document.querySelector(
  ".popup__input_type_user-name"
);
const userFormInputUserJob = document.querySelector(
  ".popup__input_type_user-job"
);
const deleteIcon = document.querySelector(".place-card__delete-icon");
const userInfoName = document.querySelector(".user-info__name");
const userInfoJob = document.querySelector(".user-info__job");
const popupNewPlace = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__image");
const infoButton = document.querySelector(".user-info__button");
const editButton = document.querySelector(".user-info__edit-button");
const popupCloseUserInfo = document.querySelector(".popup__close-user-info");
const popupImageClose = document.querySelector(".popup__image-close");
const popupPlaceClose = document.querySelector(".popup__close");
const popupUserInfo = document.querySelector(".popup__user-info");
const userAvatar = document.querySelector(".user-info__photo");
const avatarButton = document.querySelector(".popup__button_save-avatar");
const serverUrl = NODE_ENV ==="development" ? "http://praktikum.tk/cohort7" : "https://praktikum.tk/cohort7";
const optionsApi = {
  baseUrl: serverUrl,
  headers: {
    authorization: "4d8a3a8e-7975-4987-a6e2-1615458dac98",
    "Content-Type": "application/json"
  }
};

const card = new Card();
const createPopupImage = new CreatePopupImage(root);
const openPopupPlace = new Popup(popupNewPlace, infoButton, popupPlaceClose);
const openPopupUser = new Popup(popupUserInfo, editButton, popupCloseUserInfo);
const openPopupImage = new Popup(popupImage, container, popupImageClose);
const openPopupAvatar = new Popup(
  document.querySelector(".popup__avatar"),
  userAvatar,
  document.querySelector(".popup__close-avatar")
);
const cardList = new CardList(card);
const userInfo = new UserInfo(userInfoName, userInfoJob);
const formValidatorUser = new FormValidator(userInfo);
const api = new Api(optionsApi);

// получение с сервера данных пользователя
api.getUserInfo(userInfoName, userInfoJob, userAvatar);
// Вывод карточек с сервера
api.getInitialCards().then(data => {
  for (let el of data) {
    cardList.addCard(el);
    cardList.whoseCards(el);
    cardList.likeActive(el);
  }
});

// функция делает кнопку формы "новое место" активной, если оба поля ввода заполнены
function disabledAdd() {
  if (nameForm.value.length !== 0 && linkForm.value.length !== 0) {
    popupButtonAdd.removeAttribute("disabled");
  } else {
    popupButtonAdd.setAttribute("disabled", true);
  }
}
// функция делает кнопку формы "редактировать аватар" активной
function disableSaveAvatar() {
  if (avatarUrl.value.length !== 0) {
    avatarButton.removeAttribute("disabled");
  } else {
    avatarButton.setAttribute("disabled", true);
  }
}

// уведомление о загрузке данных на сервер
function buttonLoad(isLoading, button, string) {
  if (isLoading) {
    button.style.fontSize = "18px";
    button.textContent = "Загрузка...";
  } else if (!isLoading) {
    button.textContent = string;
    popupButtonAdd.style.fontSize = "36px";
  }
}

// лайк и удаление карточки
card.handlers(root);

//обработчики событий
formUser.addEventListener("submit", function(event) {
  //обработчик формы с данными пользователя
  event.preventDefault();
  api.editProfile(newName.value, newJob.value).then(result => {
    userInfo.updateUserInfo(result.name, result.about);
    openPopupUser.close();
  });
  buttonLoad(true, popupButtonSave);
});

formUser.addEventListener("input", function(event) {
  formValidatorUser.setSubmitButtonState(newName, newJob, popupButtonSave);
});

userFormInputUserName.addEventListener("input", function(event) {
  formValidatorUser.checkInputValidity(newName, popupFormUserNameError);
});

userFormInputUserJob.addEventListener("input", function(event) {
  formValidatorUser.checkInputValidity(newJob, popupFormUserJobError);
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
  // уведомление о загрузке данных о новой карте
  buttonLoad(true, popupButtonAdd);
  //отправляет данные карты на сервер
  api.addNewCard(nameForm.value, linkForm.value).then(result => {
    
    card.create(
      result
    );

    openPopupPlace.close();
    form.reset();
  });
});

form.addEventListener("input", disabledAdd);
formAvatar.addEventListener("input", disableSaveAvatar);
userAvatar.addEventListener("click", disableSaveAvatar);
infoButton.addEventListener("click", disabledAdd);
formAvatar.addEventListener("submit", function(event) {
  event.preventDefault();
  buttonLoad(true, avatarButton);
  api.newAvatar(avatarUrl.value, userAvatar);
  openPopupAvatar.close();
  formAvatar.reset();
});
editButton.addEventListener("click", event => {
  userInfo.defaultNameAndJob(newName, newJob, userInfoName, userInfoJob);
  formValidatorUser.setSubmitButtonState(newName, newJob, popupButtonSave);
});
export {card,container,api,buttonLoad,popupButtonSave,popupButtonAdd,avatarButton};

