import generateDecks from "./generate.js";

export default function setup(mode) {
  const options = {
    playerCount: 0,
    supplyCount: 0,
    winCount: 0,
    calamityOptions: {
      brokenAxleCount: 2,
      badWaterCount: 2,
      extremeColdCount: 2,
      choleraCount: 2,
      snakeBiteCount: 2,
      brokenWheelCount: 2,
      inadequateWaterCount: 2,
      dysenteryCount: 2,
      brokenTongueCount: 2,
      starvationCount: 2,
      typhoidCount: 2,
      thiefCount: 2,
      deadOxenCount: 2,
      foodCount: 2,
      measlesCount: 2,
      brokenArmCount: 2,
    },
    calamityCount: 32,
    calamityDeck: [],

    trailOptions: {
      calamityCount: 0, //24
      riverCount: 0, //17
      deadlyRiverCount: 0, //3
      fortCount: 0, //2
      townCount: 0, //2
    },
    trailCount: 58,
    trailDeck: [],
    supplyGives: 1,
  };

  switch (mode) {
    case "test":
      options.playerCount = 2;
      options.supplyCount = 8;
      options.winCount = 50;
      options.supplyGives = 2;
      break;

    default:
      options.playerCount = 4; //5 > 6
      options.supplyCount = 5; //4 > 3
      options.winCount = 30;
      options.trailOptions = {
        calamityCount: 24,
        riverCount: 17,
        deadlyRiverCount: 3,
        fortCount: 2,
        townCount: 2,
      };
      break;
  }
  generateDecks(options);
  return options;
}
