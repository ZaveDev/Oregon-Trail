import Deck from "./Deck.js";
class Card {
  constructor(name) {
    this.name = name;
    this.owner = "";
    this.wagon = "";
  }
  updateOwner(eman, wagon = {}) {
    this.owner = eman;
    this.wagon = wagon;
  }
  effect() {
    console.log("poop");
  }
}
describe("class Deck()", () => {
  let topOfTheDeck;
  const o = "owner";
  const w = "wagon";

  const testDeck = new Deck([
    new Card("card1"),
    new Card("card2"),
    new Card("card3"),
    new Card("card4"),
    new Card("card5"),
    new Card("card6"),
    new Card("card7"),
    new Card("card8"),
    new Card("card9"),
  ]);

  test("new deck is init and all methods are on it", () => {
    expect(testDeck.length).toBe(9);
    expect(testDeck.draw).toBeDefined();
    expect(testDeck.drawCalamity).toBeDefined();
    expect(testDeck.shuffle).toBeDefined();
    expect(testDeck.reshuffle).toBeDefined();
  });

  test("test draw()", () => {
    const card = testDeck.draw(o);
    expect(testDeck.list.length).toBeLessThan(9);
    expect(card.owner).toBe("owner");
  });
  test("test drawCalamity()", () => {
    const card = testDeck.drawCalamity(o, w);
    expect(testDeck.list.length).toBeLessThan(8);
    expect(card.owner).toBe("owner");
    expect(card.wagon).toBe("wagon");
  });
  test("test reshuffle()", () => {
    testDeck.reshuffle();
    expect(testDeck.length).toBe(9);
    topOfTheDeck = testDeck.list[0];
  });
  test("test shuffle()", () => {
    testDeck.shuffle();
    expect(testDeck.list[0].name).not.toBe(topOfTheDeck.name);
  });
});
