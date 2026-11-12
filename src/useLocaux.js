import {useState, useEffect} from 'react';

export function useLocaux(url){

    const [locaux, setLocaux] = useState([]);
    const [chargement, setChargement] = useState("");
    const [erreur, seterreur] = useState("");

    useEffect(()=>{
        setChargement("Chargement en cours ...");
        lireLocaux(url).then(data => setLocaux(data));
    },[url]);

    async function lireLocaux(url){
        const response = await fetch(url);
        !response.ok ? seterreur("Erreur lors du listing !!!!!!") : seterreur("");
        return await response.json();
    }

    return {locaux, chargement, erreur};
}