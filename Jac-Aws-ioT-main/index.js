import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";
import { datiSchema } from "./mongodb/connection.js";
import express from "express";
import cors from "cors"
const app = express();

app.use(cors())
// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();

app.post("/addDati", async (request, response) => {
    const dati = new datiSchema(request.body);
  
    try {
      await dati.save();
      response.send(dati);
    } catch (error) {
      response.status(500).send(dati);
    }
});

app.get("/dati", async (request, response) => {
    const dati = await datiSchema.find({});
  
    try {
      response.send(dati);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});

//esportare tutto nell'index per avere tutte le chiamate insieme 