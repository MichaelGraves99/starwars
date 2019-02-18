import StarWarsController from "./components/starWarsController.js";

class App {
  constructor() {
    this.controllers = {
      swController: new StarWarsController()
    }
  }
}



window['app'] = new App()