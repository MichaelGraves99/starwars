//privete
import Person from "../models/Person.js";

let _peopleApi = axios.create({
  baseURL: 'https://swapi.co/api/people'
})

let _state = {
  people: [],
  nextPrevPeople: {
    nextUrl: '',
    previousUrl: ''
  },
  activePerson: {}
}

let _subscribers = {
  people: [],
  nextPrevPeople: [],
  activePerson: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn());
}

//public
export default class StarWarsService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }
  // get local data
  get People() {
    // breaks reference
    return _state.people.map(p => new Person(p))
  }
  get Next() {
    return _state.nextPrevPeople.nextUrl
  }
  get Previous() {
    return _state.nextPrevPeople.previousUrl
  }
  get ActivePerson() {
    //Creates a new object that is a copy of the active person (breaking refrence)
    return new Person(_state.activePerson)
  }

  // make call to swapi api to gat all people
  getAllApiPeople(url = '') {
    _peopleApi.get(url)
      //happens after data comes back
      .then(response => {
        // all axios requests return 'data' in the response // . results are API dependant
        let people = response.data.results.map(d => new Person(d))
        let urlData = {
          nextUrl: response.data.next,
          previousUrl: response.data.previous
        }
        setState('nextPrevPeople', urlData)
        setState('people', people)
      })
      .catch(err => {
        console.error(err)
      })
  }
  // make call to swapi api to get specific people
  getOneApiPerson(url) {
    _peopleApi.get(url)
      .then(res => {
        setState('activePerson', new Person(res.data))
      })
      .catch(err => {
        console.error(err);
      })
  }

}