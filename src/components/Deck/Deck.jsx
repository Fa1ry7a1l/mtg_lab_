import React from 'react';
import './DeckPanel.css';

function Deck({ deck, onRemoveCard }) {
    const totalCount = Array.from(deck.values()).reduce((sum, card) => sum + card.count, 0);

    return (
        <div className="deck-container">
            <h2>Колода (число карт: {totalCount})</h2>
            <div className="deck-cards">
                {Array.from(deck.entries()).map(([key, card]) => (
                    <div key={key} className="deck-card" onDoubleClick={() => onRemoveCard(key)}>
                        <img src={card.data.imageUrl} alt={card.data.name} className="small-card" />
                        <span className="card-count">{`x${card.count}`}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { Deck };