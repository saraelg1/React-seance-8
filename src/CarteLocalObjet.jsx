import { useState } from "react";

export function CarteLocalObjet({ localObject, onChoisirFunction, estChoisi }) {
  const classe = localObject.disponible ? "libre" : "occupe";
  const [duree, setDuree] = useState(1);
  const total = localObject.prix * duree;

  return (
    <article className={`fiche ${estChoisi ? "choisie" : ""}`}>
      <h2 className="titre">{localObject.nom}</h2>
      <p>Capacité : {localObject.capacite} personnes</p>
      <p className={classe}>Disponibilité : {localObject.disponible ? "Disponible" : "Indisponible"}</p>
      <p>Prix : {localObject.prix} DH / h</p>
      <p>Durée : {duree} heure(s)</p>
      <p className="prix">Prix total : {total} DH</p>
      <button type="button" onClick={() => alert("Tarif : " + localObject.prix + " DH / h")}>Voir le tarif</button>
      <button type="button" onClick={() => setDuree(d => d + 1)}>+</button>
      <button type="button" onClick={() => setDuree(d => Math.max(1, d - 1))}>-</button>
      <button type="button" disabled={!localObject.disponible} onClick={() => onChoisirFunction(localObject)}>
        {estChoisi ? "Sélectionné" : "Choisir"}
      </button>
    </article>
  );
}
