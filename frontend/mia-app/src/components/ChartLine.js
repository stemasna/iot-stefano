import React, { useEffect, useState } from 'react'
//import { Grid} from "@mui/material"
//import { getDataChartLine } from '../api/request.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {datalog_properties} from '../utils/const.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  
const ChartLine = ({list, title, property}) => {
    const [datasetList, setDatasetList] = useState([])
    const convertTimestamp = (unix_timestamp)=>{
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
      }
      //mappo i log e li sistemo come label
    const labels = list ? list.map((log)=>convertTimestamp(log[datalog_properties.timestamp])) : [];
    const data = {
        labels,
        datasets: datasetList
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
      };
      
      //ritorno la linea del mio grafico
      const loadDataset= ()=>{
        const listData = property.map((p)=>{
            return {
                label: p,
                data: list ? list.map((log)=>log[datalog_properties[p]]) : [],
                borderColor: p===datalog_properties.value? 'red': 'green',
                backgroundColor: p===datalog_properties.value? 'red': 'green'
              }
        })
        setDatasetList(listData)
      }

    useEffect(()=>{
        console.log({list})
        console.log(property + ' updated')
        loadDataset()
    }, [list])

  return (
    <Line options={options} data={data} />
  )
}











export default ChartLine