import Roll from "./Roll.js";
const FgCyan = "\x1b[36m%s\x1b[0m";
export default class Trail {
  constructor(entry, exit, type) {
    this.id = Math.random().toString(36).slice(-6);
    this.owner;
    this.type = type;

    this.entry = entry;
    this.exit = exit;
    this.trailPic = this.pickTrailCharacter(entry, exit);

    this.rotatedEntry = this.rotate(exit);
    this.rotatedExit = this.rotate(entry);
    this.rotatedTrailPic = this.pickTrailCharacter(
      this.rotatedEntry,
      this.rotatedExit
    );
    this.complication = this.pickComplication(this.type);
    this.rotated = false;
  }
  pickTrailCharacter(entry, exit) {
    const direction = entry + exit;
    let text;
    switch (direction) {
      case "LL":
        text = "¯¯";
        break;
      case "LM":
        text = "¯-";
        break;
      case "LR":
        text = "¯\\_";
        break;
      case "ML":
        text = "-¯";
        break;
      case "MM":
        text = "--";
        break;
      case "MR":
        text = "-_";
        break;
      case "RL":
        text = "_/¯";
        break;
      case "RM":
        text = "_-";
        break;
      case "RR":
        text = "__";
        break;
      case "FF":
        text = "[FORT]";
        break;
      case "TT":
        text = "[TOWN]";
        break;

      default:
        text = "";
        break;
    }
    if (this.type == "river")
      text = `${text.substring(0, 1)}░${text.substring(1)}`;
    if (this.type == "deadlyRiver")
      text = `${text.substring(0, 1)}▒${text.substring(1)}`;
    return text;
  }
  pickComplication(typeKey) {
    switch (typeKey) {
      case "calamity":
        return (met) => {
          let { message } = met;
          message = "calamity";
          //draw from calamity deck
          //check all players
          //check wagon
          //update calamity owner
          return { ...met, message };
        };
      case "river":
        return (met) => {
          let { message } = met;
          const roll = Roll();
          if (roll % 2 == 0) {
            message = "pass without issue";
          } else {
            const availableItems = [];
            for (const key in this.owner.inventory) {
              const element = this.owner.inventory[key];
              if (element > 0) {
                availableItems.push(`${key}`);
              }
            }
            const lostItem =
              availableItems[Math.floor(Math.random() * availableItems.length)];
            this.owner.subtract(lostItem);
            message = `${lostItem} was lost`;
          }
          return { ...met, message };
        };
      case "deadlyRiver":
        return (met) => {
          let { message } = met;
          console.log("deadlyRiver");
          const roll = Roll();
          if (roll == 1) {
            this.owner.die();
          }
          console.log(roll);
          return { ...met, message };
        };
      case "fort":
        return (met) => {
          let { message } = met;
          message = "gain 2 random items from store"
          return { ...met, message };
        };
      case "town":
        return (met) => {
          let { message } = met;
          message = "choose to get rid of a calamity or gain one random item"
          return { ...met, message };
        };

      default:
        return (met) => {
          let { message } = met;
          message ="you progress with no issue";
          return { ...met, message };
        }
    }
  }
  rotate(point) {
    let res;
    switch (point) {
      case "R":
        res = "L";
        break;

      case "L":
        res = "R";
        break;

      case "M":
        res = "M";
        break;

      case "F":
        res = "F";
        break;

      case "T":
        res = "T";
        break;

      default:
        break;
    }
    return res;
  }
  updateOwner(owner) {
    this.owner = owner;
  }
}
