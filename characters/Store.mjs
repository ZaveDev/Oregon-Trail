export default class Store {
  constructor() {
    this.bullets = 2;
    this.clothes = 3;
    this.food = 3;
    this.water = 5;
    this.oxen = 3;
    this.spare_parts = 4;
    this.meds = 6;
    this.times = 0;
  }

  giveRandom(player) {
    const item = this.select();
    if (item) {
      player.add(item);
      this.relinquish(item);
    } else {
      this.giveRandom(player);
    }
  }
  giveSpecific(player, item) {
    player.add(item);
    this.relinquish(item);
  }
  givePlayerStartingSet(player, times) {
    let i = 0;
    while (i < times) {
      this.giveRandom(player);
      i++;
    }
  }
  add(item) {
    this[item] += 1;
  }
  relinquish(item) {
    this[item] -= 1;
  }
  isInStock(item) {
    if (this[item] > 0) {
      return true;
    } else {
      return false;
    }
  }
  select() {
    this.times++;
    const items = [
      "bullets",
      "clothes",
      "food",
      "water",
      "oxen",
      "spare_parts",
      "meds",
    ];
    let selection = items[Math.floor(Math.random() * items.length)];
    if (this.isInStock(selection)) {
      return selection;
    } else {
      this.select();
    }
  }
  trade(player, item1, item2) {
    giveSpecific(player, item);
  }
}

/*
    >> create variable
    >> create the onChange
    >> the checkboxes should update the master question variable
    >> if all checkboxes are unchecked then reset the question variable to null
*/
