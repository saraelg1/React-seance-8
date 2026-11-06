import { useState } from "react";
export function CarteLocal({ nom, capacite, disponibilite, prix }) {
  const [duree, setDuree] = useState(1);
  return <article className="fiche">
    <h2>{nom}</h2><p>Capacité : {capacite}</p>
    <p className={disponibilite ? "libre" : "occupe"}>{disponibilite ? "Disponible" : "Indisponible"}</p>
    <p>Prix : {prix} DH/h</p><p>Total : {prix * duree} DH</p>
    <button onClick={() => setDuree(d => d + 1)}>+</button>
    <button onClick={() => setDuree(d => Math.max(1, d - 1))}>-</button>
  </article>;
}
