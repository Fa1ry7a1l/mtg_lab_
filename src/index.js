import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

let deck = new Map();
let selectedCard = null

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const cardDisplay = document.getElementById('card-display');
    const cardImage = document.getElementById('card-image');
    const addToDeckButton = document.getElementById('add-to-deck');
    const cardDescription = document.getElementById('card-description');

    const deckContainer = document.getElementById('deck-container');
    const deckCountElement = document.getElementById('deck-count');
    addToDeckButton.addEventListener('click', () => {
        const card = deck.get(selectedCard.id)
        if (card !== undefined) {
            if (card.data.types.includes('Land'))
                card.count++;
            else{
                card.count = Math.min(++card.count, 4)
            }
        } else {
            deck.set(selectedCard.id,  {
                data: selectedCard,
                count: 1,
            });
        }
        redrawDeckAndStats()
    });

    const mtg = new Mtg();

    function addCard(card, list) {
        if (card.imageUrl !== undefined) {
            const listItem = document.createElement('li');
            listItem.innerHTML = card.name;
            listItem.addEventListener('dblclick', () => {
                showCard(card);
            });
            list.appendChild(listItem)
        }
    }

    function addCards(cards) {
        const menu = document.getElementById('listContainer');
        const list = document.createElement('ul');

        cards.forEach(card => {
            addCard(card, list);
        })
        menu.innerHTML = ''

        menu.appendChild(list);
    }

    mtg.loadCards()
        .then((cards) => {
            addCards(cards);
            redrawDeckAndStats()
        })

    document.getElementById('search-input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            executeSearch();
        }
    });

    document.getElementById('search-button').addEventListener('click', function () {
        executeSearch();
    });

    function executeSearch() {
        const query = document.getElementById('search-input').value;
        if (query.trim()) {
            const list = document.createElement('ul');
            mtg.findCards(query).then((cards) => {
                addCards(cards);
                menu.appendChild(list);
            })
        } else {
            mtg.loadCards()
                .then((cards) => {
                    addCards(cards);
                })
        }
    }

    function updateDeck() {
        deckContainer.innerHTML = ''; // Очищаем контейнер для колоды

        let totalCount = 0;

        for (const [key, card] of deck) {
            totalCount += card.count;

            const deckCardElement = document.createElement('div');
            deckCardElement.classList.add('deck-card');

            deckCardElement.addEventListener('dblclick', () => {
                removeCard(key);
            });

            const img = document.createElement('img');
            img.src = card.data.imageUrl;

            const count = document.createElement('span');
            count.innerText = `x${card.count}`;

            deckCardElement.appendChild(img);
            deckCardElement.appendChild(count);

            deckContainer.appendChild(deckCardElement);
        }

        deckCountElement.innerText = totalCount;
    }

    function removeCard(id) {
        const card = deck.get(id)
        card.count--;
        if (card.count === 0){
            deck.delete(id);
        }
        redrawDeckAndStats()
    }

    function showCard(card) {
        selectedCard = card
        cardImage.src = card.imageUrl
        cardDisplay.removeAttribute('hidden')
        cardDescription.innerHTML = card.text
    }

    function redrawDeckAndStats() {
        new ColorStats(deck).buildStats(document.getElementById("colorStats"));
        new ManaCostStats(deck).buildStats(document.getElementById("manaStats"));
        updateDeck()
    }
}
