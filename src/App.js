import { useState } from "react";
import { CarteLocalObjet } from "./CarteLocalObjet.jsx";
import {useLocaux} from "./useLocaux.js"
import {useReservations} from "./useReservations";

export default function App() {
  const [afficherLibres, setAfficherLibres] = useState(false);
  const [localChoisi, setLocalChoisi] = useState(null);
  const {locaux, chargement, erreur} = useLocaux("/locaux.json");
  const visibles = afficherLibres ? locaux.filter(l => l.disponible) : locaux;
  const {reservations : listeReservation,
    chargement : loading,
    erreur : error} = useReservations("/reservations.json");

  return (
    <main>
      <header className="entete">
        <h1>Location de locaux</h1>
      </header>

      <section className="panneau" aria-label="Réservations">
        <h2>Réservations enregistrées</h2>
        {listeReservation.length === 0 && <p className="attente">Aucune réservation enregistrée.</p>}
        {listeReservation.map(res => (
          <div key={res.id} className="reservation">
            <p>{res.id} : {res.nom}, {res.duree} h =&gt; {res.total} DH</p>
          </div>
        ))}
      </section>

      <section aria-label="Catalogue des locaux">
        <div className="barre-catalogue">
          <div><h2>Notre catalogue</h2>
            {visibles.length===0 && (
                <p>{chargement}</p>)}

            {visibles.length>0 && (<p>{visibles.length} locaux affichés</p>)}
          </div>
          <button type="button" onClick={() => setAfficherLibres(v => !v)}>
            {afficherLibres ? "Afficher tous les locaux" : "Afficher les disponibles"}
          </button>
        </div>
        <div className="catalogue">
          {visibles.map(local => (
            <CarteLocalObjet key={local.id} localObject={local}
              onChoisirFunction={setLocalChoisi} estChoisi={localChoisi?.id === local.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
