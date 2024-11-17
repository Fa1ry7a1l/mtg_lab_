import './App.css'
import {CardList} from "./components/CardList.jsx";
import {DeckPanel} from "./components/DeckPanel.jsx";
import {StatisticsPanel} from "./components/StatisticsPanel.jsx";

function App() {


  return (
      <>
          <header>
              <h1>MTG Deck Builder</h1>
          </header>
          <main className="main">
             <CardList/>
             <DeckPanel/>
             <StatisticsPanel/>
          </main>
      </>
  )
}

export default App
