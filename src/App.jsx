import './App.css'
import {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import {CardList} from "./components/CardList.jsx";
import {DeckPanel} from "./components/Deck/DeckPanel.jsx";
import {StatisticsPanel} from "./components/StatisticsPanel.jsx";
import {Mtg} from "./api/mtg.js";

function App() {
    const [input, setInput] = useState("");
    const [deck, setDeck] = useState(new Map());
    const [searchList, setSearchList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    
    const mtg = new Mtg();


    const debouncedLog = useCallback(debounce((input) => {
        if (input == "") {
            mtg.loadCards()
                .then((cards) => {
                    cards.sort((a, b) => {
                        return a.name < b.name
                    })
                    setSearchList(cards);
                });
        } else {
            mtg.findCards(input)
                .then((cards) => {
                    cards.sort((a, b) => {
                        return a.name < b.name
                    })
                    console.log(cards);
                    setSearchList(cards);
                });
        }
    }, 500), []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        debouncedLog(value);
    };

    useEffect(() => {
        debouncedLog("")
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input);
    };

    const handleSelectCard = (card) => {
        setSelectedCard(card);
    };

    const handleDeckUpdate = (updateFunction) => {
        setDeck(prevDeck => updateFunction(prevDeck));
    };

    return (
        <>
            <header>
                <h1>MTG Deck Builder</h1>
            </header>
            <main className="main">
                <CardList searchList={searchList} selectCallback={handleSelectCard}/>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={input} onChange={handleInputChange}/>
                </form>
                <DeckPanel selectedCard={selectedCard} deck={deck} onDeckUpdate={handleDeckUpdate} />
                <StatisticsPanel deck={deck}/>
            </main>
        </>
    )
}

export default App
