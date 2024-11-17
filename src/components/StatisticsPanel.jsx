import {ManaStats} from "./ManaStats.jsx";
import {ColorStats} from "./ColorStats.jsx";

function StatisticsPanel() {
   return <div id="stats">
        <h2>Stats</h2>
        <div className="widgets">
            <ManaStats/>
            <ColorStats/>
        </div>

    </div>
}

export {StatisticsPanel}