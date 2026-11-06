# React — Séance 7 : projet de départ

**Location de locaux** — projet de la séance 6 repris pour la séance 7 : **fetch et synchronisation avec useEffect**.

## Démarrer

Nécessite Node.js et npm.

```bash
npm install
npm start
```

L'application fonctionne initialement **sans API**, grâce aux 20 locaux du fichier `src/local.js`.

## Ce qui est déjà fait (séance 6)

- Catalogue de locaux, filtre des disponibilités et sélection.
- Formulaire de réservation avec validations et montant total.
- Ajout d'une réservation avec `crypto.randomUUID()`.
- Suppression par `filter` et renommage par `map`.

## Travail de la séance 7 — suivre les diapositives dans cours/

### Exercice 1 : lire une ressource avec fetch (diapositives 4 à 7)
1. Créer **vous-même** `public/locaux.json` avec les **trois premiers objets** de `src/local.js` (sans `export`, propriétés entre guillemets doubles).
2. Définir une fonction asynchrone `lireLocaux(url)` (à l'extérieur du composant, dans `src/App.js`).
3. Utiliser `fetch`, tester `reponse.ok` et lire `reponse.json()`.
4. Appeler `lireLocaux('/locaux.json')` et afficher les données dans la console.
5. Réessayer avec une URL inexistante et observer l'erreur.

### Exercice 2 : synchroniser avec useEffect (diapositives 9 à 12)
1. Ajouter `useEffect` à l'import React.
2. Retirer l'import statique `locaux` et créer l'état `const [locaux, setLocaux] = useState([])`.
3. Charger `/locaux.json` dans un effet, puis mettre à jour `locaux`.
4. Traiter et afficher l'erreur de lecture.
5. Ajouter le nettoyage indiqué dans la présentation afin d'ignorer les réponses périmées.
6. Vérifier que le filtre, la sélection et la réservation continuent de fonctionner.

### TP (diapositives 16 à 19)
Reprendre ces deux notions sans recopier le corrigé. Tester aussi une URL invalide.

**Important :** les solutions `fetch` et `useEffect` ne figurent volontairement pas dans ce projet de départ. Le chargement et l'état vide seront approfondis en séance 8, conformément au support.

## Source

Base : https://github.com/saraelg1/React-seance-6
