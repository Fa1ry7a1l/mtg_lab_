import * as d3 from "d3";
const map = {
    "W":  0,
    "U":  1,
    "B":  2,
    "R":  3,
    "G":  4,
};

class ColorStats {

    constructor(deck) {
        this.deck = deck
    }

    buildStats(element){
        element.innerHTML = ""
        const data = [
            { color: 'White', count: 0 },
            { color: 'Blue', count: 0 },
            { color: 'Black', count: 0 },
            { color: 'Red', count: 0 },
            { color: 'Green', count: 0 },
            { color: 'Colorless', count: 0 }
        ];



        for (const [_, card] of this.deck){
            console.log(card)
            const colors = card.data.colors;
            if (colors !== undefined)
            {
                colors.forEach(color => {
                    var index = map[color] !== undefined ? map[color] : 5;
                    data[index].count += card.count;
                });
            }
        }

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.color))
            .range(['#F0E68C', '#4682B4', '#2F4F4F', '#B22222', '#228B22', '#A9A9A9']);

        const pie = d3.pie()
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        const label = document.createElement('label')
        label.textContent = "Deck Mana Color Distribution";
        label.classList.add("colorLabel");
        element.appendChild(label)
        const svg = d3.select(element)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const arcs = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.color));

    }

}
export { ColorStats };