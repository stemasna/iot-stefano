import mongoose from 'mongoose';
import {MONGODB_URI} from "../config.js"

mongoose.connect(MONGODB_URI);
import express from "express";
const app = express();

export const datiSchema=mongoose.model('datiSchema',{
    timestamp: String,
    hum: Number,
    value: Number,
    free_ram: Number,
    total_ram: Number,
    sensorCode: String,
    name: String,
});
//creato una funzione asincrona dove salvo il messaggio del server iot
export async function saveLog(messagge){
    await datiSchema.create(messagge)
}

//funzione getDati e stampo solo quelli col campo name uguale a stefano 
export async function getdati(){
    return await datiSchema.find({
        name:"stefano"
    });
}
