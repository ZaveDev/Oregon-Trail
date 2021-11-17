import Roll from "./Roll.js";
const FgRed = "\x1b[31m%s\x1b[0m";
const FgGreen = "\x1b[32m%s\x1b[0m";
export default class Calamity {
  constructor(type) {
    this.id = Math.random().toString(36).slice(-6);
    this.type = type;
    this.roundLimit = 0;
    this.roundAge = 0;
    this.target;
    this.effect = this.defineEffect(type);
    this.secondaryEffect;
    this.remedy;
    this.owner;
    this.wagon;
  }
  defineEffect(type) {
    switch (type) {
      case "brokenAxle":
        this.remedy = {
          spare_parts: 1,
        };
        //or roll 3-6
        //if 1 round > party dies}
        this.target = "wagon";
        this.secondaryEffect = () => {
          this.wagon.killEveryone();
        };
        return () => {
          console.log(FgRed, "brokenAxle");
          if (Roll() > 3) {
            this.rectify();
          } else {
            console.log(FgRed, "you tired to fix it but you failed");
            this.wagon.calamity.push(this);
          }
        };

      case "badWater":
        this.remedy = {
          water: 1,
        };
        //if 2 drawn > wagon oxen dies}
        this.target = "wagon";
        this.secondaryEffect = () => {
          this.wagon.oxen -= 1;
        };
        return () => {
          console.log(FgRed, "badWater");
          this.wagon.calamity.push(this);
        };

      case "extremeCold":
        this.remedy = {
          clothes: 1,
        };
        //if 1 round without remedy > owner dies }
        this.target = "owner";
        this.roundLimit = 1;
        this.secondaryEffect = () => {
          // this.owner.die()
        };
        return () => {
          console.log(FgRed, "extremeCold");
          this.wagon.calamity.push(this);
        };

      case "cholera":
        this.remedy = {
          meds: 2,
        };
        //if 2 drawn > owner dies}
        this.target = "owner";
        this.secondaryEffect = () => {};
        return () => {
          console.log(FgRed, "cholera");
          this.wagon.calamity.push(this);
        };

      case "snakeBite":
        this.remedy = "";
        this.target = "owner";
        return () => {
          console.log(FgRed, "dead");
          // this.owner.die()
        };

      case "brokenWheel":
        this.remedy = {
          spare_parts: 1,
        };
        //or roll 3-6
        //if 1 round > party dies}
        this.target = "wagon";
        this.roundLimit = 1;
        this.secondaryEffect = () => {
          this.wagon.killEveryone();
        };

        return () => {
          console.log(FgRed, "brokenWheel");
          if (Roll() > 3) {
            this.rectify();
          } else {
            console.log(FgRed, "you tired to fix it but you failed");
            this.wagon.calamity.push(this);
          }
        };

      case "inadequateWater":
        //if 2 are drawn up > wagon oxen dies
        this.remedy = "";
        this.target = "wagon";
        this.secondaryEffect = () => {
          this.wagon.oxen -= 1;
        };
        return () => {
          console.log(FgRed, "inadequateWater");
          this.wagon.calamity.push(this);
        };

      case "dysentery":
        this.remedy = "";
        this.target = "owner";
        return () => {
          console.log(FgRed, "dead");
          // this.owner.die()
        };

      case "brokenTongue":
        this.remedy = {
          spare_parts: 1,
        };
        //or roll 3-6
        //if 1 round > party dies}
        this.target = "wagon";
        this.roundLimit = 1;
        this.secondaryEffect = () => {};
        return () => {
          console.log(FgRed, "brokenTongue");
          if (Roll() > 3) {
            this.rectify();
          } else {
            console.log(FgRed, "you tired to fix it but you failed");
            this.wagon.calamity.push(this);
          }
        };

      case "starvation":
        this.remedy = {
          food: 1,
        };
        //if 2 round without remedy > owner dies}
        this.target = "owner";
        this.roundLimit = 2;
        this.secondaryEffect = () => {
          // this.owner.die()
        };
        return () => {
          console.log(FgRed, "starvation");
          this.wagon.calamity.push(this);
        };

      case "typhoid":
        this.remedy = {
          water: 1,
          meds: 1,
        };
        //if 1 round without remedy > owner dies}
        this.target = "owner";
        this.roundLimit = 1;
        this.secondaryEffect = () => {
          // this.owner.die()
        };
        return () => {
          console.log(FgRed, "typhoid");
          this.wagon.calamity.push(this);
        };

      case "thief":
        this.remedy = "";
        this.target = "owner";
        this.secondaryEffect = () => console.log(FgRed, "no other effect");
        return () => {
          console.log(FgRed, "theif");
          //owner looses an item
        };

      case "deadOxen":
        this.remedy = {
          oxen: 1,
        };
        //if 1 round > party dies
        this.target = "wagon";
        this.roundLimit = 1;
        this.secondaryEffect = () => {
          this.wagon.killEveryone();
        };
        return () => {
          console.log(FgRed, "deadOxen");
          this.wagon.calamity.push(this);
        };

      case "food":
        this.remedy = "";
        this.target = "owner";
        this.secondaryEffect = () => console.log(FgRed, "no other effect");
        return () => {
          console.log(FgRed, "food");
          if (this.owner.inventory.bullets > 0) {
            this.owner.subtract("bullets");
            this.owner.add("food");
          }
        };

      case "measles":
        this.remedy = {
          meds: 1,
        };
        //if 2 are drawn up > owner dies
        this.target = "owner";
        this.secondaryEffect = () => {
          // this.owner.die()
        };
        return () => {
          console.log(FgRed, "measles");
          this.wagon.calamity.push(this);
        };

      case "brokenArm":
        this.remedy = "";
        // skip player for 2 rounds
        this.target = "owner";
        this.roundLimit = 2;
        this.secondaryEffect = () => console.log(FgRed, "no other effect");
        return () => {
          console.log(FgRed, "brokenArm");
          this.wagon.calamity.push(this);
        };

      default:
        break;
    }
  }
  updateOwner(owner, wagon) {
    this.owner = owner;
    this.wagon = wagon;
  }
  take(payment) {
    const zerosArray = [];
    const item = this.owner.subtract(payment.item);
    if (item) {
      this.remedy[item] -= 1;

      for (const key in this.remedy) {
        const value = this.remedy[key];
        zerosArray.push(value);
      }

      if (
        !zerosArray.includes(1) &&
        zerosArray.every((val, i, arr) => val === arr[0])
      ) {
        return { resolved: true, valid: true, message: "fixed" };
      } else {
        return {
          resolved: false,
          valid: true,
          message: "need more items to rectify...",
        };
      }
    } else {
      return { resolved: false, valid: false, message: "Not enough Items" };
    }
  }
  rectify() {}
}
