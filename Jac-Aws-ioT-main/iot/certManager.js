import { secretMasterName, secretMasterUrl } from '../config.js';

import * as fs from 'fs';
import * as os from 'os';
import * as http from 'https';

// this part check if the server has the master cert or download it from the remote secure source
export function checkMasterCertificate() {
    //rpomise finisce quando chiama la funzione resolve 
    return new Promise((resolve, reject) => {
        try {
            //guardo se il certificato è gia stato scaricato, nella cartella temp e col nome messo nel .env 
            const file = fs.readFileSync(`${os.tmpdir()}/${secretMasterName}.pem.crt`);
            resolve();
        } catch (err) {
            const finishedActions = [];
            //certificato diviso in 3 parti
            //faccio 3 writeStream per scrivere questi 3 
            const cert = fs.createWriteStream(`${os.tmpdir()}/${secretMasterName}.certificate.pem.crt`);
            const privateKey = fs.createWriteStream(`${os.tmpdir()}/${secretMasterName}.private.pem.key`);
            const amazonRoot = fs.createWriteStream(`${os.tmpdir()}/AmazonRootCA1.pem`)
            //faccio per ognuna una chiamata http ottenendo una risposta non sincrona quindi con response.pipe li salva nel percorso sopra 
            http.get(`${secretMasterUrl}/${secretMasterName}.certificate.pem.crt`, function (response) {
                response.pipe(cert);
            });

            http.get(`${secretMasterUrl}/${secretMasterName}.private.pem.key`, function (response) {
                response.pipe(privateKey);
            });

            http.get(`${secretMasterUrl}/AmazonRootCA1.pem`, function (response) {
                response.pipe(amazonRoot);
            });
            //quando finsico di scrivere uno dei tre stampo e controllo se gli altri 2 hanno gia finito o meno e riotrno resolve 
            //questo porcesso ripetuto per tutti e tre 
            cert.on('finish', function () {
                console.log('finish download remote cert')
                finishedActions.push(true)

                if (finishedActions.length === 3) {
                    resolve();
                }
            });
            //per ogni certificato  se c'è un errore uso l'altra funzione della promise 
            cert.on('error', function () {
                reject();
            });

            amazonRoot.on('finish', function () {
                console.log('finish download amazon cert')
                finishedActions.push(true)

                if (finishedActions.length === 3) {
                    resolve();
                }
            });

            amazonRoot.on('error', function () {
                reject();
            });

            privateKey.on('finish', function () {
                console.log('finish download private key')
                finishedActions.push(true)

                if (finishedActions.length === 3) {
                    resolve();
                }
            });

            privateKey.on('error', function () {
                reject();
            });
        }
    });
}