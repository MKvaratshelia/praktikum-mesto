class CardList {
  constructor(card, ownerId) {
    this.card = card;
    this.ownerId = ownerId;
  }

  addCard(data) {
    this.cards = this.card.create(data);
  }
  // render(container, cardArray) {
  //   for (let element of cardArray) {
  //     const name = element.name;
  //     const link = element.link;
  //     this.addCard(name, link);
  //     container.appendChild(this.cards);
  //   }
  // }
  whoseCards(data) {
    if (data.owner._id !== "033a1b11aedbbdef4a2f8447") {
      this.cards.querySelector(".place-card__delete-icon").style.display =
        "none";
    }
  }
  likeActive(object) {
    const likeButton = document.querySelector(".place-card__like-icon");
    for (let id of object.likes) {
      if (id._id === "033a1b11aedbbdef4a2f8447") {
        likeButton.classList.add("place-card__like-icon_liked");
      }
    }
  }
}
