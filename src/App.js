import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFirst: 0,
      currentScnd: 0,
      finished: [],
      turn: 0,
      card: [
        {
          idCard: 1,
          src: process.env.PUBLIC_URL + "/dialga.webp",
        },
        {
          idCard: 2,
          src: process.env.PUBLIC_URL + "/palkia.webp",
        },
        {
          idCard: 3,
          src: process.env.PUBLIC_URL + "/rayquaza.webp",
        },
        {
          idCard: 4,
          src: process.env.PUBLIC_URL + "/lugia.webp",
        },
        {
          idCard: 5,
          src: process.env.PUBLIC_URL + "/lucario.webp",
        },
        {
          idCard: 6,
          src: process.env.PUBLIC_URL + "/mewtwo.webp",
        },
      ],
      cardList: [],
    };
    this.click = this.click.bind(this);
    this.check = this.check.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }
  componentDidMount() {
    let copyCard = this.state.card.map((card) => {
      return Object.assign({}, card);
    });
    let newCardList = [...this.state.card, ...copyCard];
    newCardList.forEach((card) => {
      card.id = uuidv4();
    });
    let newCardListShuffled = this.shuffle(newCardList);
    this.setState({
      cardList: [...this.state.cardList, ...newCardListShuffled],
    });
  }
  check() {
    if (this.state.currentFirst && this.state.currentScnd) {
      let indexFirst = this.state.cardList.findIndex(
        (x) => x.id === this.state.currentFirst
      );
      let indexScnd = this.state.cardList.findIndex(
        (x) => x.id === this.state.currentScnd
      );
      if (
        this.state.cardList[indexFirst].idCard ===
        this.state.cardList[indexScnd].idCard
      ) {
        let cardFinished = this.state.cardList[indexFirst].idCard;
        this.setState({
          finished: [...this.state.finished, cardFinished],
        });
      }
      this.setState({
        currentFirst: 0,
        currentScnd: 0,
        turn: this.state.turn + 1,
      });
    }
  }
  componentWillUpdate() {
    this.check();
  }
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  click(id) {
    if (!this.state.currentFirst) {
      this.setState({
        currentFirst: id,
      });
    } else {
      this.setState({
        currentScnd: id,
      });
    }
  }
  render() {
    let list = this.state.cardList.map((card) =>
      this.state.currentFirst === card.id ||
      this.state.currentScnd === card.id ||
      this.state.finished.includes(card.idCard) ? (
        <img alt="pokemon" className="card" src={card.src} />
      ) : (
        <img
          alt="hidden card"
          onClick={() => this.click(card.id)}
          className="card"
          src={process.env.PUBLIC_URL + "/pokeball.png"}
        />
      )
    );
    return <div className="container">{list}</div>;
  }
}

export default App;
