function CardList({searchList, selectCallback}) {

    return <div id="menu">
        <h2>Cards</h2>
        <div id="listContainer">
            {searchList.map(card => <li onClick={_ => {
                selectCallback(card)
            }} key={card.id}>{card.name}</li>)}
        </div>
    </div>
}

export {CardList}