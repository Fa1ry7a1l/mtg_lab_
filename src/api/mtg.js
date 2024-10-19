class Mtg {

    constructor(baseUrl = "https://api.magicthegathering.io/v1/") {
        this.baseUrl = baseUrl;
    }

    loadCards(){
        return this.toJson(fetch(`${this.baseUrl}cards`))
    }

    findCards(name){
        return this.toJson(fetch(`${this.baseUrl}cards/?${new URLSearchParams({
            name: name
        }).toString()}`))
    }

    toJson (prom){
        return prom.then(response=>response.json())
            .then(json=>json.cards)
    }
}


export {Mtg}
