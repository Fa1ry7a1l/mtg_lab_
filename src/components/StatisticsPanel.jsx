import {ManaStats} from "./ManaStats.jsx";
import {ColorStats} from "./ColorStats.jsx";

function StatisticsPanel({deck}) {
   return <div id="stats">
        <h2>Stats</h2>
        <div className="widgets">
            <ManaStats deck={deck}/>
            <ColorStats deck={deck}/>
        </div>

    </div>
}

export {StatisticsPanel}