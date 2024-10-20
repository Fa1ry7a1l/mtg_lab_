import * as d3 from "d3";
class ManaCostStats {
    constructor(deck) {
        this.deck = deck
    }
    buildStats(element){
        element.innerHTML = ""

        let data = [
            { cost: 0, count: 0 },
            { cost: 1, count: 0 },
            { cost: 2, count: 0 },
            { cost: 3, count: 0 },
            { cost: 4, count: 0 },
            { cost: 5, count: 0 },
            { cost: 6, count: 0 },
            { cost: '7+', count: 0 }
        ];

        console.log(this.deck);

        for (const [_, card] of this.deck) {
            const cmc = card.data.cmc;
            if (cmc >= 7) {
                data[7].count += card.count;
            } else {
                data[cmc].count += card.count;
            }
        }

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const width = 300 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.cost))
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)]) // Убедитесь, что здесь 0 внизу
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.cost))
            .attr("y", d => d.count > 0 ? y(d.count) : height) // Обеспечивает, что столбцы с 0 будут внизу
            .attr("width", x.bandwidth())
            .attr("height", d => d.count > 0 ? height - y(d.count) : 0) // Высота 0 для count 0
            .attr("fill", "#69b3a2");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2.5)
            .attr("y", -margin.top / 2)
            .text("MTG Deck Mana Cost Distribution");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -height / 2)
            .text("Number of Cards");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .text("Mana Cost");
    }
}
export {ManaCostStats};