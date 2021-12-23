import React, { useState, useEffect } from "react";
import coins from "./assets/coins.png";
import styles from "./App.module.scss";
import Auction from "./components/auction/Auction";

function App() {
  const [currency, setCurrency] = useState("SEK");

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Favorit Auction</h1>
        <div className={styles.currency}>
          <img src={coins} className={styles.coins} alt="coins" />
          <select onChange={(e) => setCurrency(e.target.value)}>
            <option value="SEK">SEK</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </header>
      <Auction currency={currency} />
    </div>
  );
}

export default App;
