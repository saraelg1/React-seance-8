import { useState, useEffect } from "react";
import { CarteLocalObjet } from "./CarteLocalObjet.jsx";

export default function App() {
  const [afficherLibres, setAfficherLibres] = useState(false);
  const [localChoisi, setLocalChoisi] = useState(null);
  const [nom, setNom] = useState("Test");
  const [duree, setDuree] = useState("2");
  const [condition, setCondition] = useState(false);
  const [erreur, setErreur] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [listeReservation, setListeReservation] = useState([]);
  const [nouveauNom, setNouveauNom] = useState("");
  const [locaux, setLocaux] = useState([]);

  const visibles = afficherLibres ? locaux.filter(l => l.disponible) : locaux;
  const total = localChoisi ? localChoisi.prix * Number(duree) : 0;

  useEffect(()=>{
    lireLocaux("/locaux.json").then(data => setLocaux(data));
  },[duree]);

  function soumettre(e) {
    e.preventDefault();
    setErreur("");
    setConfirmation("");

    if (!nom.trim()) {
      setErreur("Le nom est obligatoire.");
      return;
    }
    if (!Number.isInteger(Number(duree)) || Number(duree) <= 0) {
      setErreur("La durée doit être un entier positif.");
      return;
    }
    if (!condition) {
      setErreur("Vous devez accepter les conditions.");
      return;
    }
    if (!localChoisi || !localChoisi.disponible) {
      setErreur("Choisissez un local disponible.");
      return;
    }

    const reservation = {
      id: crypto.randomUUID(),
      nom: nom,
      duree: duree,
      localId: localChoisi.id,
      total: localChoisi.prix * Number(duree)
    };
    setConfirmation("Formulaire valide !");
    setListeReservation(liste => [...liste, reservation]);
  }

  function supprimer(id) {
    setListeReservation(liste => liste.filter(r => r.id !== id));
  }

  function renommer(id, nomNew) {
    setListeReservation(liste => liste.map(r =>
      r.id === id ? { ...r, nom: nomNew } : r
    ));
  }

  async function lireLocaux(url){
    const response = await fetch(url);
    if(!response.ok) throw new Error("Erreur HTTP");
    return await response.json();
  }

  return (
    <main>
      <header className="entete">
        <span className="sur-titre">React · Séance 7 · Projet de départ</span>
        <h1>Location de locaux</h1>
        <p>Partons de la séance 6 pour découvrir fetch et useEffect.</p>
      </header>

      <section className="panneau" aria-label="Formulaire de réservation">
        <h2>Nouvelle réservation</h2>
        <p>Local choisi : <strong>{localChoisi ? localChoisi.nom : "Aucune sélection"}</strong></p>
        <form onSubmit={soumettre} noValidate>
          <label htmlFor="nom">Nom du client</label>
          <input id="nom" type="text" value={nom} onChange={e => setNom(e.target.value)} placeholder="Ex. : Atlas" />
          <label htmlFor="duree">Durée (heures)</label>
          <input id="duree" type="number" min="1" step="1" value={duree} onChange={e => setDuree(e.target.value)} />
          <p className="prix">Montant total : {total} DH</p>
          <label className="ligne-condition">
            <input type="checkbox" checked={condition} onChange={e => setCondition(e.target.checked)} />
            J'accepte les conditions de réservation.
          </label>
          {erreur && <p className="erreur" role="alert">{erreur}</p>}
          {confirmation && <p className="succes" role="status">{confirmation}</p>}
          <button type="submit" className="primaire">Valider le formulaire</button>
        </form>
      </section>

      <section className="panneau" aria-label="Réservations">
        <h2>Réservations enregistrées</h2>
        {listeReservation.length === 0 && <p className="attente">Aucune réservation enregistrée.</p>}
        {listeReservation.map(res => (
          <div key={res.id} className="reservation">
            <p>{res.id} : {res.nom}, {res.duree} h =&gt; {res.total} DH</p>
            <button type="button" onClick={() => supprimer(res.id)}>Supprimer</button>
            <input aria-label={`Nouveau nom pour ${res.nom}`} value={nouveauNom} onChange={e => setNouveauNom(e.target.value)} />
            <button type="button" onClick={() => renommer(res.id, nouveauNom)}>Renommer</button>
          </div>
        ))}
      </section>

      <section aria-label="Catalogue des locaux">
        <div className="barre-catalogue">
          <div><h2>Notre catalogue</h2><p>{visibles.length} locaux affichés</p></div>
          <button type="button" onClick={() => setAfficherLibres(v => !v)}>
            {afficherLibres ? "Afficher tous les locaux" : "Afficher les disponibles"}
          </button>
        </div>
        {/* EXERCICE 2 : afficher ici une éventuelle erreur de chargement. */}
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
