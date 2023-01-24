export const datalog_properties = {
    timestamp: 'timestamp',
    value: 'value',
    hum: 'hum'
}

//costante per restituire il tempo in formato ora minuti secondi 
export const convertTimestamp = (unix_timestamp)=>{
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
  }