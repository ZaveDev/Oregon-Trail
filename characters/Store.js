import inquirer from "inquirer";
const prompt = inquirer.createPromptModule();

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
  trade(met, item1, item2) {
    this.add(item1);
    this.add(item2);
    const inventoryList = [];
    if (this.bullets > 0) inventoryList.push("bullets");
    if (this.clothes > 0) inventoryList.push("clothes");
    if (this.food > 0) inventoryList.push("food");
    if (this.water > 0) inventoryList.push("water");
    if (this.oxen > 0) inventoryList.push("oxen");
    if (this.spare_parts > 0) inventoryList.push("spare_parts");
    if (this.meds > 0) inventoryList.push("meds");
    return new Promise((resolve, reject) => {
      prompt({
        type: "list",
        name: "action",
        message: `Store inventroy
    bullets-------${this.bullets}
    clothes-------${this.clothes}
    food----------${this.food}
    water---------${this.water}
    oxen----------${this.oxen}
    spare_parts---${this.spare_parts}
    meds----------${this.meds}`,
        choices: [...inventoryList, "[Back]"],
      }).then(({ action }) => {
        if (action == "[Back]") {
          reject(met);
        } else {
          let item = action;
          resolve({ met, item });
        }
      });
    });
  }
}
