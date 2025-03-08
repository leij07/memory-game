import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';
const cardImages = [
    {"src" : "/img/books.jpg", matched: false},
    {"src" : "/img/butterfly.jpg", matched: false},
    {"src" : "/img/ribbon.jpg", matched: false},
    {"src" : "/img/rose.jpg", matched: false},
    {"src" : "/img/teddy.jpg", matched: false},
    {"src" : "/img/telephone.jpg", matched: false}
    

]

export function App() {
const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [optOne, setOptOne] = useState(null);
const [optTwo, setOptTwo] = useState(null);
const [disabled, setDisabled] = useState(false);

    //shuffle cards
    const shuffleCards = () =>{
        const shuffledCards = [...cardImages,...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() }));
        setCards(shuffledCards);
        setTurns(0);
    }
  
    //handle a choice
    const handleOption = (card) =>{
      optOne ? setOptTwo(card) : setOptOne(card);
    }
    
    //compare 2 selected cards
    useEffect(() => {
    
      if(optOne && optTwo){
        setDisabled(true)
        if(optOne.src === optTwo.src){
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === optOne.src){
                return{...card, matched: true}
              }else{
                return card
              }
            })
          })
          resetTurn()
        }else{
    
          setTimeout(() => resetTurn(), 500) 
        }
      }
    }, [optOne, optTwo])

    //reset options and increase turns
    const resetTurn =() =>{
      setOptOne(null);
      setOptTwo(null);
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
    }

    

  return (
    <div className="App">
     <h1>Magic Match</h1>

     <button onClick={shuffleCards}> New Game</button>
     <div className="card-grid">
        {cards.map(card => (
           <SingleCard key={card.id} card={card}
           handleOption={handleOption}
           flipped={card === optOne || card === optTwo || card.matched}
           disabled={disabled}
           />
        ))}
     </div>
    </div>
  );
}

export default App
