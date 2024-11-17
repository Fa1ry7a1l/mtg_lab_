import {useEffect, useState} from "react";
import {Mtg} from "../api/mtg.js";

function CardList() {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        const mtg = new Mtg();
        mtg.loadCards()
            .then((loadedCards) => {
                setCards(loadedCards)
            });
    }, []);
   return <div id="menu">
        <h2>Cards</h2>
        <div id="listContainer">
            {cards.map(card => <li key={card.id}>{card.name}</li>)}
        </div>
    </div>
}

export {CardList}