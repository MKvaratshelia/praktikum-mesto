export default class Popup {
  constructor(popup, open, close) {
    this.popup = popup;
    this.popupOpen = open;
    this.popupClose = close;
    this.popupOpen.addEventListener("click", this.open.bind(this));
    this.popupClose.addEventListener("click", this.close.bind(this));
  }
  open(event) {
    if (event.target.classList.contains("place-card__image")) {
      return this.popup.classList.add("popup_is-opened");
    }
    if (event.target.classList.contains("user-info__button")) {
      return this.popup.classList.add("popup_is-opened");
    }
    if (event.target.classList.contains("user-info__edit-button")) {
      return this.popup.classList.add("popup_is-opened");
    }
    if (event.target.classList.contains("user-info__photo")) {
      return this.popup.classList.add("popup_is-opened");
    }
  }
  close(event) {
    return this.popup.classList.remove("popup_is-opened");
  }
}
