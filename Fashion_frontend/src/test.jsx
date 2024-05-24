import React, { useState } from "react";
import "./test.css";

const cards = [
  "Card 1", "Card 2", "Card 3", "Card 4", "Card 5",
  "Card 6", "Card 7", "Card 8", "Card 9", "Card 10"
];

function Test() {
  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 5;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < cards.length - cardsToShow) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="carousel-container">
      <button className="nav-button" onClick={handlePrev}>&lt;</button>
      <div className="cards-container">
        {cards.slice(startIndex, startIndex + cardsToShow).map((card, index) => (
          <div className="card" key={index}>
            {card}
          </div>
        ))}
      </div>
      <button className="nav-button" onClick={handleNext}>&gt;</button>
    </div>
  );
}



export default Test