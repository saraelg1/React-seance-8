import {useState, useEffect} from 'react';

export function useReservations(url){

    const [reservations, setReservations] = useState([]);
    const [chargement, setChargement] = useState("");
    const [erreur, seterreur] = useState("");

    useEffect(()=>{
        setChargement("Chargement en cours ...");
        lireReservations(url).then(data => setReservations(data));
    },[url]);

    async function lireReservations(url){
        const response = await fetch(url);
        !response.ok ? seterreur("Erreur lors du listing !!!!!!") : seterreur("");
        return await response.json();
    }

    return {reservations, chargement, erreur};
}