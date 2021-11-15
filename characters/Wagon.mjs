export default class Wagon {
  constructor(players) {
    this.players = players;
    this.broken = false;
    this.oxen = 1;
    this.calamity = [];
  }

  killEveryone() {
    this.players.forEach((player) => {
      player.alive = false;
    });
  }
  addCalamity(addedCalamity) {
    this.calamity.push(addedCalamity);
  }
  removeCalamity(calamity) {
    this.calamity = this.calamity.filter((c) => c.type != calamity);
  }
}
