import inquirer from "inquirer";
const prompt = inquirer.createPromptModule();

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
  pick(met) {
    let { message, store } = met;
    let inventoryList = [];

    for (const key in this.inventory) {
      const element = this.inventory[key];
      if (element > 0) {
        inventoryList.push(key);
      }
    }
    return new Promise((resolve, reject) => {
      prompt({
        type: "list",
        name: "action",
        message: "what to do",
        choices: [...inventoryList, "[Back]"],
      }).then(({ action }) => {
        if (action == "[Back]") {
          reject(met);
        } else {
          let item1 = action;
          this.subtract(item1);
          inventoryList = [];
          for (const key in this.inventory) {
            const element = this.inventory[key];
            if (element > 0) {
              inventoryList.push(key);
            }
          }
          prompt({
            type: "list",
            name: "action",
            message: "what to do",
            choices: [...inventoryList, "[Back]"],
          }).then(({ action }) => {
            if (action == "[Back]") {
              this.add(item1);
              reject(met);
            } else {
              let item2 = action;
              this.subtract(item2);
              store.trade(met, item1, item2)
                .then(({ met, item }) => {
                  message = `you gave 1 ${item1} and 1 ${item2} and received 1 ${item}`;
                  this.add(item);
                  met = { ...met, message, store };
                  resolve(met);
                })
                .catch((met) => {
                  this.add(item1);
                  this.add(item2);
                  reject(met);
                });
            }
          });
        }
      });
    });
  }
  give(construct, item) {
    this.subtract(item);
    construct.add(item);
  }
  will(player) {
    let item1 = this.pick();
    let item2 = this.pick();
    this.give(player, item1);
    this.give(player, item2);
  }
}
