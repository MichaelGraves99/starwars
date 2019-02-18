export default class Peson {
  constructor(data) {
    this.name = data.name
    this.gender = data.gender
    this.hairColor = data.hair_color || data.hairColor
    this.eyeColor = data.eye_color || data.eyeColor
    this.movies = data.movies || data.films.length
    this.url = data.url
  }

  get BasicTemplate() {
    return `<li onclick="app.controllers.swController.getPerson('${this.url}')" class="${this.gender}">${this.name}</li>`
  }

  get DetailedTemplate() {
    return `
        <h3>${this.name}</h3>
        <h4>Hair: ${this.hairColor}</h4>
        <h4>Eyes: ${this.eyeColor}</h4>
        <h4>Movies: ${this.movies}</h4>
        `
  }
}