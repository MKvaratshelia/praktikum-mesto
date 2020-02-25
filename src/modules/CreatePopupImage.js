
export default class CreatePopupImage {
  constructor(element) {
    this.element = element;
    this.element.addEventListener("click", this.createLink.bind(this));
  }
  addImageLink(link) {
    const popupSrcImage = document.querySelector(".popup__src-image");
    popupSrcImage.setAttribute("src", link);
  }
  createLink(event) {
    if (event.target.classList.contains("place-card__image")) {
      let linkImage = event.target.style.backgroundImage.slice(5, -2);
      this.addImageLink(linkImage);
    }
  }
}

