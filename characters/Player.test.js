import Player from "./Player";

describe("class Player()", () => {
  const player1 = new Player();
  const player2 = new Player();

  it("Player1 should be init with all methods", () => {
    expect(player1.alive).toBe(true);
    expect(player1.inventory.bullets).toBe(0);
    expect(player1.inventory.clothes).toBe(0);
    expect(player1.inventory.food).toBe(0);
    expect(player1.inventory.water).toBe(0);
    expect(player1.inventory.oxen).toBe(0);
    expect(player1.inventory.spare_parts).toBe(0);
    expect(player1.inventory.meds).toBe(0);
    expect(player1.supplyGives).toBe(1);
    expect(player1.trailDeck.length).toBe(0);
    expect(player1.add).toBeDefined();
    expect(player1.addToDeck).toBeDefined();
    expect(player1.subtract).toBeDefined();
    expect(player1.die).toBeDefined();
    expect(player1.pick).toBeDefined();
    expect(player1.give).toBeDefined();
    expect(player1.will).toBeDefined();
  });

  it("Player2 should be init with all methods", () => {
    expect(player2.alive).toBe(true);
    expect(player2.inventory.bullets).toBe(0);
    expect(player2.inventory.clothes).toBe(0);
    expect(player2.inventory.food).toBe(0);
    expect(player2.inventory.water).toBe(0);
    expect(player2.inventory.oxen).toBe(0);
    expect(player2.inventory.spare_parts).toBe(0);
    expect(player2.inventory.meds).toBe(0);
    expect(player2.supplyGives).toBe(1);
    expect(player2.trailDeck.length).toBe(0);
    expect(player2.add).toBeDefined();
    expect(player2.addToDeck).toBeDefined();
    expect(player2.subtract).toBeDefined();
    expect(player2.die).toBeDefined();
    expect(player2.pick).toBeDefined();
    expect(player2.give).toBeDefined();
    expect(player2.will).toBeDefined();
  });
  it("add()", () => {
    player1.add("bullets");
    expect(player1.inventory.bullets).toBe(1);
  });
  it("addToDeck()", () => {
    player1.addToDeck({ card: "ace" });
    expect(player1.trailDeck.length).toBe(1);
  });
  it("subtract()", () => {
    player1.subtract("bullets");
    expect(player1.inventory.bullets).toBe(0);
  });
  it("die()", () => {
    player1.die();
    expect(player1.alive).toBe(false);
  });
  it("pick()", () => {});
  it("give()", () => {});
  it("will()", () => {});
});
