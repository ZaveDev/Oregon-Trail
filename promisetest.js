class Me {
  constructor() {
    name: "Mono"

  }

  prom(key) {
    console.log("loading...")
    return new Promise((res, rej) => {
      switch (key) {
        case "a":
          setTimeout(res, 3000)
          break;
        case "b":
          setTimeout(rej, 3000)
          break;
      }
    })
  }
}
const person = new Me()

person.prom("a").then((res) => console.log("approved")).catch((err) => console.log("rejected"))