import './SingleCard.css'

export default function SingleCard({card, handleOption, flipped}) {
  const handleClick = () =>{
    handleOption(card);
  }

  return (
    <div>
       <div className="card">
                <div className={flipped ? "flipped" : ""}>
                    <img className="front" src={card.src} alt="card front"></img>
                    <img className="back" src="/img/cover.jpg" alt="card back" onClick={handleClick}></img>
                </div>
            </div>
    </div>
  )
}
