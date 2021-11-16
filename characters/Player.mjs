export default class Player {
  constructor() {
    this.alive = true;
    this.inventory = {
      bullets: 0, //2
      clothes: 0, //3
      food: 0, //3
      water: 0, //5
      oxen: 0, //3
      spare_parts: 0, //4
      meds: 0, //6
    };
    this.supplyGives = 1;
    this.trailDeck = [];
  }

  add(item) {
    this.inventory[item] += 1;
  }
  addToDeck(card) {
    this.trailDeck.push(card);
  }
  subtract(item) {
    if (this.inventory[item] > 0) {
      this.inventory[item] -= 1;
      return item;
    } else {
      return false;
    }
  }
  die() {
    this.alive = false;
    //will()
  }
  pick() {
    console.log("Player, pick a items item");
  }
  give(construct, item) {
    console.log(`I gave ${construct} a ${item}`);
    //construct.add(item)
  }
  will(player) {
    let item1 = this.pick();
    let item2 = this.pick();
    this.give(player, item1);
    this.give(player, item2);
  }
}
