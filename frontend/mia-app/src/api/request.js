import './axios'
import axios from 'axios'

//filtro, per filtrare i dati contenenti solo name:stefano
const creatorFilter = {
    Name: 'stefano'
}

//funzione per ritornarmi la lista dei dati 
export const getDataLogs = async ()=>{
    try {
    const {data: listDataLogs} = await axios.get('/dati', { params: creatorFilter})
    //con axios aspetta di aver trovato la ricerca col filtro per poi restituirmelo
    return listDataLogs
    } catch (error) {
        console.log({ErrorDataLogs: error})
        return null
    }
    
}