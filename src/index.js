import {Mtg} from "./api/mtg";
import {ColorStats} from "./widgets/colorStats";
import {ManaCostStats} from "./widgets/manaCostStats";

let deck = []
let displayedCard = null

document.addEventListener("DOMContentLoaded", setup)

function setup() {
    const cardDisplay = document.getElementById('card-display');
    const cardImage = document.getElementById('card-image');
    const addToDeckButton = document.getElementById('add-to-deck');
    const cardDescription = document.getElementById('card-description');

    const deckContainer = document.getElementById('deck-container');
    const deckCountElement = document.getElementById('deck-count');
    addToDeckButton.addEventListener('click', () => {
        if (deck[displayedCard.id]) {
            deck[displayedCard.id].count++;
        } else {
            deck[displayedCard.id] = {
                card: displayedCard,
                count: 1
            };
        }
        redrawDeckAndStats()
    });

    const mtg = new Mtg();
    mtg.loadCards()
        .then((cards) => {
            const menu = document.getElementById('listContainer');
            const list = document.createElement('ul');

            cards.forEach(card => {
                const listItem = document.createElement('li');
                listItem.innerHTML = card.name;
                listItem.addEventListener('dblclick', () => {
                    showCard(card);
                });
                list.appendChild(listItem)
            })
            menu.innerHTML = ''

            menu.appendChild(list);


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
            mtg.findCards(query).then((searchResult) => {
                const menu = document.getElementById('listContainer');
                const list = document.createElement('ul');

                searchResult.forEach(card => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = card.name;
                    listItem.addEventListener('dblclick', () => {
                        showCard(card);
                    });
                    list.appendChild(listItem)
                })
                menu.innerHTML = ''

                menu.appendChild(list);

            })

        } else {
            alert('Please enter a search query.');
        }
    }

    function updateDeck() {
        deckContainer.innerHTML = ''; // Очищаем контейнер для колоды

        let totalCount = 0;

        for (const cardId in deck) {
            const deckCard = deck[cardId];
            totalCount += deckCard.count;

            const deckCardElement = document.createElement('div');
            deckCardElement.classList.add('deck-card');

            const img = document.createElement('img');
            img.src = deckCard.card.imageUrl;

            const count = document.createElement('span');
            count.innerText = `x${deckCard.count}`;

            deckCardElement.appendChild(img);
            deckCardElement.appendChild(count);

            deckContainer.appendChild(deckCardElement);
        }

        deckCountElement.innerText = totalCount;
    }

    function showCard(card) {
        displayedCard = card
        cardImage.src = card.imageUrl
        cardDisplay.removeAttribute('hidden')
        cardDescription.innerHTML = card.text
    }

    function redrawDeckAndStats() {
        new ColorStats().buildStats(document.getElementById("colorStats"));
        new ManaCostStats().buildStats(document.getElementById("manaStats"));
        updateDeck()
    }
}
