import React from 'react';

function CardDetails({ selectedCard, onAddCard }) {
    if (!selectedCard) return null;

    return (
        <div className="card-details">
            <img src={selectedCard.imageUrl} alt={selectedCard.name} />
            <p>{selectedCard.text}</p>
            <button onClick={onAddCard}>Добавить</button>
        </div>
    );
}

export { CardDetails };