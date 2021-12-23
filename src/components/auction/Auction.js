import React, { useState, useEffect } from "react";
import styles from "./Auction.module.scss";
import stool from "../../assets/svenskt_tenn.jpeg";
import axios from "axios";

const Auction = ({ currency }) => {
  const [value, setValue] = useState("");
  const sendValue = async () => {
    await axios({
      url: "http://localhost:5050",
      method: "post",
      data: {
        value: value,
        currency: currency,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h3>Pall 647, Josef Frank, Svenskt Tenn</h3>
        <img src={stool} className={styles.stool} alt="stool" />
        <h3>Beskrivning</h3>
        <p className={styles.textColor}>
          Diameter 62 cm Höjd 38 cm, Körsbär, Teheran, Svart Körsbär. Sits av
          sadelgjord, stoppad med kallskum/polyeter och syntetvadd. Kederband.
          Pallen är hantverksmässigt tillverkad i Sverige.
        </p>
        <h3>Konditionsrapport</h3>
        <p className={styles.textColor}>Perfekt skick, inga skador.</p>
        <h3>Konstnär/Formgivare</h3>
        <p className={styles.textColor}>Josef Frank</p>
      </div>
      <div className={styles.rightSide}>
        <div>
          <input onChange={(e) => setValue(e.target.value)} />
          <span className={styles.currencySpan}>{currency}</span>
          <button onClick={sendValue}>Lägg Bud</button>
        </div>

        <h2>Budhistorik</h2>
        <div className={styles.line}></div>
        <p></p>
      </div>
    </div>
  );
};

export default Auction;
