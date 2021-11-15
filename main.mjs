import Store from "./characters/Store.mjs";
import Player from "./characters/Player.mjs";
import Wagon from "./characters/Wagon.mjs";
import setup from "./mechanics/setup.mjs";
import loop from "./userInput.mjs";
import Deck from "./characters/Deck.mjs";
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
