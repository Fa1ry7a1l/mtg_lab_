import React from 'react';
import { CardDetails } from './CardDetails';
import { Deck } from './Deck';

function DeckPanel({ selectedCard, deck, onDeckUpdate }) {
    
    const handleAddCard = () => {
        if (!selectedCard) return;

        onDeckUpdate(prevDeck => {
            const card = prevDeck.get(selectedCard.id);

            if (card) {
                let newCount = card.count + 1;

                if (!card.data.types.includes('Land')) {
                    newCount = Math.min(newCount, 4);
                }

                const updatedCard = { ...card, count: newCount };
                return new Map(prevDeck).set(selectedCard.id, updatedCard);
            }

            const newCard = { data: selectedCard, count: 1 };
            return new Map(prevDeck).set(selectedCard.id, newCard);
        });
    };

    const handleRemoveCard = (cardId) => {
        onDeckUpdate(prevDeck => {
            const card = prevDeck.get(cardId);
            
            if (card.count > 1) {
                card.count -= 1;
            } else {
                prevDeck.delete(cardId);
            }
    
            return new Map(prevDeck);
        });
    };

    return (
        <div className="deck-panel">
            <CardDetails selectedCard={selectedCard} onAddCard={handleAddCard} />
            <Deck deck={deck} onRemoveCard={handleRemoveCard} />
        </div>
    );
}

export { DeckPanel };