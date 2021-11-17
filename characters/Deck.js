import s from "../mechanics/shuffle.js";

export default class Deck {
  constructor(deck) {
    this.origin = deck;
    this.list = [...deck];
    this.length = deck.length;
  }
  draw(owner) {
    const card = this.list.shift();
    card.updateOwner(owner);
    return card;
  }
  drawCalamity = (player, wagon) => {
    let oops = this.list.shift();
    oops.updateOwner(player, wagon);
    oops.effect();
    return oops;
  };
  shuffle() {
    this.list = s(this.list);
  }
  reshuffle() {
    this.list = s([...this.origin]);
    this.shuffle();
  }
}
