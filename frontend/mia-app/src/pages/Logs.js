import React, { useEffect, useState } from 'react'
import { Grid} from "@mui/material"
import { getDataLogs } from '../api/request.js'
import ChartLine from '../components/ChartLine.js';
import {datalog_properties} from '../utils/const.js'

const Logs = () => {
    const [list, setList] = useState(null)

    const setLogsData = async ()=>{
        const list = await getDataLogs()
        setList(list)
    }
    useEffect(()=>{
        setLogsData()
    }, [])
    useEffect(()=>{
        console.log({list})
    }, [list])
  return (
    <Grid container spacing={3}>
        {/* stampo a video i grafici */}
        <Grid item xs={12} md={6}><ChartLine list={list} title={'Hum'} property={[datalog_properties.hum]} /></Grid>
        <Grid item xs={12} md={6} ><ChartLine list={list} title={'Values'} property={[datalog_properties.value]} /></Grid>
    </Grid>

  )
}

export default Logs