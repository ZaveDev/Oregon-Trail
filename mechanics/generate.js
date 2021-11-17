import Calamity from "./Calamity.js";
import shuffle from "./shuffle.js";
import Trail from "./Trail.js";

const generateDecks = (options) => {
  const generateTrail = ({ trailCount, trailOptions, trailDeck }) => {
    let i = 0;
    const direction = ["L", "M", "R"];
    const arr1 = new Array(trailOptions.calamityCount).fill("calamity");
    const arr2 = new Array(trailOptions.riverCount).fill("river");
    const arr3 = new Array(trailOptions.deadlyRiverCount).fill("deadlyRiver");
    const arr4 = new Array(trailOptions.fortCount).fill("fort");
    const arr5 = new Array(trailOptions.townCount).fill("town");
    const complications = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5];
    while (i < trailCount) {
      if (!complications[i]) {
        complications.push("none");
      }
      i++;
    }
    i = 0;
    shuffle(complications);
    shuffle(complications);
    shuffle(complications);

    while (i < complications.length) {
      if (complications[i] == "fort") {
        trailDeck.push(new Trail("F", "F", complications[i]));
      }
      if (complications[i] == "town") {
        trailDeck.push(new Trail("T", "T", complications[i]));
      } else {
        let entry = direction[Math.floor(Math.random() * direction.length)];
        let exit = direction[Math.floor(Math.random() * direction.length)];
        let type = complications[i];
        trailDeck.push(new Trail(entry, exit, type));
      }
      i++;
    }
  };

  const generateCalamities = ({
    calamityOptions,
    calamityCount,
    calamityDeck,
  }) => {
    let i = 0;
    const arr1 = new Array(calamityOptions.brokenAxleCount).fill("brokenAxle");
    const arr2 = new Array(calamityOptions.badWaterCount).fill("badWater");
    const arr3 = new Array(calamityOptions.extremeColdCount).fill(
      "extremeCold"
    );
    const arr4 = new Array(calamityOptions.choleraCount).fill("cholera");
    const arr5 = new Array(calamityOptions.snakeBiteCount).fill("snakeBite");
    const arr6 = new Array(calamityOptions.brokenWheelCount).fill(
      "brokenWheel"
    );
    const arr7 = new Array(calamityOptions.inadequateWaterCount).fill(
      "inadequateWater"
    );
    const arr8 = new Array(calamityOptions.dysenteryCount).fill("dysentery");
    const arr9 = new Array(calamityOptions.brokenTongueCount).fill(
      "brokenTongue"
    );
    const arr10 = new Array(calamityOptions.starvationCount).fill("starvation");
    const arr11 = new Array(calamityOptions.typhoidCount).fill("typhoid");
    const arr12 = new Array(calamityOptions.thiefCount).fill("thief");
    const arr13 = new Array(calamityOptions.deadOxenCount).fill("deadOxen");
    const arr14 = new Array(calamityOptions.foodCount).fill("food");
    const arr15 = new Array(calamityOptions.measlesCount).fill("measles");
    const arr16 = new Array(calamityOptions.brokenArmCount).fill("brokenArm");
    const fates = [
      ...arr1,
      ...arr2,
      ...arr3,
      ...arr4,
      ...arr5,
      ...arr6,
      ...arr7,
      ...arr8,
      ...arr9,
      ...arr10,
      ...arr11,
      ...arr12,
      ...arr13,
      ...arr14,
      ...arr15,
      ...arr16,
    ];
    shuffle(fates);
    shuffle(fates);
    shuffle(fates);

    while (i < calamityCount) {
      let type = fates[i];
      calamityDeck.push(new Calamity(type));
      i++;
    }
  };
  generateTrail(options);
  generateCalamities(options);
};
export default generateDecks;
