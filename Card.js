class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
  create(data) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
   <div class="place-card__image" data-id="${data._id}" data-userId="${data.owner._id}">
   <button class="place-card__delete-icon"></button>
   </div>
   <div class="place-card__description">
   <h3 class="place-card__name"></h3>
   <div class="place-card__container">
   <button class="place-card__like-icon"></button>
   <span class="place-card__like-count">0</span>
   </div>
   </div>`;
    placeCard.querySelector(".place-card__like-count").textContent =
      data.likes.length;
    placeCard.querySelector(".place-card__name").textContent = data.name;
    placeCard.querySelector(
      ".place-card__image"
    ).style.backgroundImage = `url(${data.link})`;
    const cardList = document.querySelector(".places-list");
    cardList.insertBefore(placeCard, cardList.firstElementChild);
    //cardList.appendChild(placeCard);
    return placeCard;
  }

  addAndDeleteLike(event) {
    const likeButton = event.target;
    const likeCount = likeButton.nextElementSibling;
    const parent =
      likeButton.parentElement.parentElement.parentElement.firstElementChild;
    const id = parent.dataset.id;
    if (likeButton.classList.contains("place-card__like-icon_liked")) {
      //likeCount.textContent = +likeCount.textContent + 1;
      api.addLike(id).then(res => {
        likeCount.textContent = res.likes.length;
      });
    } else {
      //likeCount.textContent = +likeCount.textContent - 1;
      api.deleteLike(id).then(res => {
        likeCount.textContent = res.likes.length;
      });
    }
  }
  like(event) {
    if (event.target.classList.contains("place-card__like-icon")) {
      event.target.classList.toggle("place-card__like-icon_liked");
      card.addAndDeleteLike(event);
    }
  }
  remove(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      let deleteIcon = event.target;
      let parentDeleteIcon = deleteIcon.parentElement;
      let placeCard = parentDeleteIcon.parentElement;
      let placeCardImage = placeCard.querySelector(".place-card__image");
      let imageId = placeCardImage.dataset.id;
      if (window.confirm("Вы действительно хотите удалить карточку?")) {
        container.removeChild(placeCard);
        api.deleteCardFromServer(imageId);
      }
    }
  }
  handlers(element) {
    this.element = element;
    this.element.addEventListener("click", this.like);
    this.element.addEventListener("click", this.remove);
  }
}
