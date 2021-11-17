import Store from "./characters/Store.js";
import Player from "./characters/Player.js";
import Wagon from "./characters/Wagon.js";
import setup from "./mechanics/setup.js";
import loop from "./userInput.js";
import Deck from "./characters/Deck.js";
// const rounds = {
//     turns,
//     roundcount,
//     increment,
//     checkwagon,
// }

function game() {
  const materials = setup();
  const gameMaterials = {
    player: new Player(),
    trailDeck: new Deck(materials.trailDeck),
    calamityDeck: new Deck(materials.calamityDeck),
    calamityDeckCount: 0,
    trail: [],
    displayedTrail: "[",
    store: new Store(),
    wagon: new Wagon(),
    message: "",
  };
  gameMaterials.store.givePlayerStartingSet(gameMaterials.player, 8);

  let i = 0;
  while (i < 5) {
    gameMaterials.player.addToDeck(
      gameMaterials.trailDeck.draw(gameMaterials.player)
    );
    i++;
  }

  loop(gameMaterials);
}

game();
