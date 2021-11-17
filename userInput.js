import isValidCard from "./mechanics/isValidCard.js";
import inquirer from "inquirer";

const prompt = inquirer.createPromptModule();

const FgRed = "\x1b[31m%s\x1b[0m";
const FgCyan = "\x1b[36m%s\x1b[0m";
/*
                {
                  player: new Player(),
                  trailDeck: new Deck(materials.trailDeck),
                  calamityDeck: new Deck(materials.calamityDeck),
                  calamityDeckCount: 0,
met =========>>   trail: [],
                  displayedTrail: "[",
                  store: new Store(),
                  wagon: new Wagon(),
                  message: "",
                };
*/
const summonHUD = (met) => {
  let { player, displayedTrail, wagon, message } = met;
  let calamityList = "";
  for (let i = 0; i < wagon.calamity.length; i++) {
    const cCard = wagon.calamity[i];
    calamityList += `${cCard.type} `;
  }

  console.log(FgCyan, `message: ${message}`);
  console.log(displayedTrail);
  console.log(
    `============================================================================`
  );
  console.log(FgRed, calamityList);
  console.log(
    `bullets: ${player.inventory.bullets}  clothes: ${player.inventory.clothes}  food: ${player.inventory.food}  water: ${player.inventory.water}  oxen: ${player.inventory.oxen}  spare parts: ${player.inventory.spare_parts}  meds: ${player.inventory.meds}  `
  );
};
const summonCalamityHUD = (met) => {
  let { player, wagon } = met;
  const calamityList = [];
  const exportList = wagon.calamity;
  const exportTypeList = [];
  const exportRemedyList = {};

  for (let i = 0; i < wagon.calamity.length; i++) {
    const cCard = wagon.calamity[i];
    let remedy = "";
    const remedyArr = [];
    for (const key in cCard.remedy) {
      const value = cCard.remedy[key];
      remedy += `${key}: ${value} `;
      remedyArr.push(`${key}: ${value}`);
    }
    exportRemedyList[cCard.type] = remedyArr;
    exportTypeList.push(`${cCard.type}`);
    calamityList.push(`${cCard.type} => Remedied by: ${remedy}`);
  }

  console.log(FgRed, calamityList);
  console.log(
    `============================================================================`
  );

  console.log(
    `bullets: ${player.inventory.bullets}  clothes: ${player.inventory.clothes}  food: ${player.inventory.food}  water: ${player.inventory.water}  oxen: ${player.inventory.oxen}  spare parts: ${player.inventory.spare_parts}  meds: ${player.inventory.meds}  `
  );

  return { exportList, exportTypeList, exportRemedyList };
};
const loop = (met) => {
  console.clear();
  summonHUD(met);

  prompt({
    type: "list",
    name: "action",
    message: "what to do",
    choices: ["Place Trail", "Remedy Calamity", "Draw", "Trade"],
  }).then(({ action }) => {
    switch (action) {
      case "Place Trail":
        selectTrail(met);
        break;

      case "Remedy Calamity":
        remedyCalamity(met);
        break;

      case "Draw":
        draw(met);
        break;

      case "Trade":
        trade(met);
        break;

      default:
        break;
    }
  });
};

const selectTrail = (met, rotated = false) => {
  const picsAndDetails = [];
  let { player } = met;

  if (rotated) {
    player.trailDeck.forEach((card) => {
      picsAndDetails.push(`[${card.rotatedTrailPic}]`);
    });
    picsAndDetails;
  } else {
    player.trailDeck.forEach((card) => {
      picsAndDetails.push(`[${card.trailPic}]`);
    });
  }
  prompt({
    type: "list",
    name: "action",
    message: "which trail?",
    choices: [...picsAndDetails, "[Rotate]", "[Back]"],
  }).then(({ action }) => {
    if (action == "[Back]") {
      loop(met);
    } else if (action == "[Rotate]") {
      console.clear();
      summonHUD(met);
      selectTrail(met, !rotated);
    } else {
      let selection;
      if (rotated) {
        player.trailDeck.forEach((card) => {
          if (`[${card.rotatedTrailPic}]` == action) {
            selection = card;
          }
        });
      } else {
        player.trailDeck.forEach((card) => {
          if (`[${card.trailPic}]` == action) {
            selection = card;
          }
        });
      }
      isValidCard(selection, rotated, met).then((res) => loop(res));
    }
  });
};

const remedyCalamity = (met) => {
  let { wagon, message } = met;
  console.clear();
  const list = summonCalamityHUD(met);
  prompt({
    type: "list",
    name: "action",
    message: "which Calamity?",
    choices: [...list.exportTypeList, "[Back]"],
  }).then(({ action }) => {
    // leverage the remedyCalamity function on the card
    if (action == "[Back]") {
      loop(met);
    } else {
      let type = action;
      prompt({
        type: "list",
        name: "action",
        message: "which what item used to remedy this Calamity?",
        choices: [...list.exportRemedyList[type], "[Back]"],
      }).then(({ action }) => {
        if (action == "[Back]") {
          loop(met);
        } else {
          action = action.replace(":", "").split(" ");
          action = {
            item: action[0],
            amount: action[1],
          };

          list.exportList.forEach((card) => {
            if (card.type == type) {
              action = card.take(action);
            }
          });
          if (action.resolved && action.valid) {
            wagon.removeCalamity(type);
          }
          message = action.message;
          met = { ...met, wagon, message };
          loop(met);
        }
      });
    }
  });
};

const draw = (met) => {
  let { trailDeck, player } = met;
  prompt({
    type: "list",
    name: "action",
    message: "Are you sure?",
    choices: ["Yes", "No"],
  }).then(({ action }) => {
    if (action == "Yes") {
      player.addToDeck(trailDeck.draw(player));
    }

    met = { ...met, trailDeck, player, message: "card added" };
    loop(met);
  });
};

const trade = (met) => {
  const { player } = met;
  prompt({
    type: "list",
    name: "action",
    message: "which which items?",
    choices: ["[Pick]", "[Back]"],
  }).then(({ action }) => {
    switch (action) {
      case "[Pick]":
        player.pick(met).then((res) => loop(res));
        break;

      case "[Back]":
        loop(met);
        break;

      default:
        break;
    }
  });
};

export default loop;
