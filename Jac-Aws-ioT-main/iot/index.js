import { secretMasterName, host } from '../config.js';
import awsIot from 'aws-iot-device-sdk';
import AWS from 'aws-sdk';
import { saveLog } from '../mongodb/connection.js';
import * as os from 'os';

// setting aws region to connect
AWS.config.update({ region: 'eu-central-1' });

const iot = new AWS.Iot();

let device;
//configura il serve node come se fosse un device 
//gli diamo i certificati scaricati con certManager
export function initDevice() {
    device = awsIot.device({
        keyPath: `${os.tmpdir()}/${secretMasterName}.private.pem.key`,
        certPath: `${os.tmpdir()}/${secretMasterName}.certificate.pem.crt`,
        caPath: `${os.tmpdir()}/AmazonRootCA1.pem`,
        host: host
    });
//una volta connesso
//chiamo il metodo subscribe e si mette in ascolto e quando è in ascolto console.log che è tutto pronto

    device.on('connect', function () {
        console.info('system connected to aws iot...');
        device.subscribe('machines');
        console.info('mqtt parser ready...');
    });

    device.on('error', function (e) {
        console.info({ e });
    });
//converte il messaggio da stringa e lo converte in oggetto 
//se c'è un errore, logga l'errore ma senza crashare 
    device.on('message', function (topic, payload) {
        console.info('message received');
        parser(payload.toString());
    });
}

async function parser(message) {
    let objectMessage;
    try {
        objectMessage = JSON.parse(message);
    } catch (err) {
        console.error(`error parsing message: ${message}`);
    }
    //creo un nuovo campo all'oggetto name, e asepetto che lo crea per usare la mia funzione saveLog
    objectMessage.name="stefano";
    await saveLog(objectMessage);
    console.log(objectMessage);

}
