const isValidCard = (card, rotated, met) => {
  let {
    trail,
    trailDeck,
    calamityDeck,
    wagon,
    player,
    displayedTrail,
    message,
  } = met;
  console.log(`from valid1 Store:${met.hasOwnProperty('store')} Trade:${met.store.hasOwnProperty('trade')}`)
  let valid = trail.length;
  if (trail.length == 0) {
    if (rotated) {
      displayedTrail += card.rotatedTrailPic;
      card.rotated = true;
      trail.push(card);
    } else {
      displayedTrail += card.trailPic;
      trail.push(card);
    }

    player.trailDeck = player.trailDeck.filter((deck) => card.id !== deck.id);
    met = card.complication(met);
    
    if (card.type == "calamity") {
      calamityDeck.drawCalamity(player, wagon);
    }
  } else {
    if (trail[trail.length - 1].rotated && !rotated) {
      // Last Rotated / Current NO
      if (
        card.entry == "F" ||
        card.entry == "T" ||
        trail[trail.length - 1].exit == "F" ||
        trail[trail.length - 1].exit == "T" ||
        card.entry == trail[trail.length - 1].rotatedExit
      ) {
        trail.push(card);
        displayedTrail += card.trailPic;
        player.trailDeck = player.trailDeck.filter(
          (deck) => card.id !== deck.id
        );

        met = card.complication(met);
        
        if (card.type == "calamity") {
          calamityDeck.drawCalamity(player, wagon);
        }
      }
    } else if (trail[trail.length - 1].rotated && rotated) {
      // Last Rotated / Current Rotated
      if (
        card.rotatedEntry == "F" ||
        card.rotatedEntry == "T" ||
        trail[trail.length - 1].exit == "F" ||
        trail[trail.length - 1].exit == "T" ||
        card.rotatedEntry == trail[trail.length - 1].rotatedExit
      ) {
        card.rotated = true;
        trail.push(card);
        displayedTrail += card.rotatedTrailPic;
        player.trailDeck = player.trailDeck.filter(
          (deck) => card.id !== deck.id
        );
        
        met = card.complication(met);
        
        if (card.type == "calamity") {
          calamityDeck.drawCalamity(player, wagon);
        }
      }
    } else if (rotated) {
      // Last NO / Current Rotated
      if (
        card.rotatedEntry == "F" ||
        card.rotatedEntry == "T" ||
        trail[trail.length - 1].exit == "F" ||
        trail[trail.length - 1].exit == "T" ||
        card.rotatedEntry == trail[trail.length - 1].exit
      ) {
        card.rotated = true;
        trail.push(card);
        displayedTrail += card.rotatedTrailPic;
        player.trailDeck = player.trailDeck.filter(
          (deck) => card.id !== deck.id
        );
        
        met = card.complication(met);
        
        if (card.type == "calamity") {
          calamityDeck.drawCalamity(player, wagon);
        }
      }
    } else {
      // Last NO / Current NO
      if (
        card.entry == "F" ||
        card.entry == "T" ||
        trail[trail.length - 1].exit == "F" ||
        trail[trail.length - 1].exit == "T" ||
        card.entry == trail[trail.length - 1].exit
      ) {
        trail.push(card);
        displayedTrail += card.trailPic;
        player.trailDeck = player.trailDeck.filter(
          (deck) => card.id !== deck.id
        );
        met = card.complication(met);
        if (card.type == "calamity") {
          calamityDeck.drawCalamity(player, wagon);
        }
      }
    }
    if (valid == trail.length) {
      message = "invalid card";
    }
  }
  console.log(`from valid2 Store:${met.hasOwnProperty('store')} Trade:${met.store.hasOwnProperty('trade')}`)
  return new Promise((resolve, reject) => {
    met = {
      ...met,
      trail,
      calamityDeck,
      wagon,
      player,
      displayedTrail,
      message,
      trailDeck,
    };
    resolve(met);
  });
};
export default isValidCard;
