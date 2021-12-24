import React, { useState, useEffect} from "react";
import { fetchDailyData } from "../../Api";
import {Line, Bar} from "react-chartjs-2"
import Chart from 'chart.js/auto'
import {CategoryScale} from 'chart.js'

import styles from "./Chart.module.css";

function Charts({data: {confirmed,recovered, deaths}, country}){
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    },[])

    const lineChart = (
        dailyData.length
        ?(
            <Line 
            data = {{
                labels: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: "Infected",
                    borderColor: "#3333ff",
                    fill: true
                },{
                    data: dailyData.map(({deaths}) => deaths),
                    label: "Deaths",
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                    fill: true
                }]
            }}
        />
        ) : null
    )
    console.log(confirmed);
    const barchart = (
        confirmed
        ? (
          <Bar 
            data = {{
                labels : ["Infected", "Recovered", "Deaths"],
                datasets: [{
                   label: "people",
                   backgroundColor: ["rgba(0,0,255, 0.5)", "rgba(0,255,0, 0.5)", "rgba(255, 0, 0, 0.5)"],
                   data : [confirmed.value,recovered.value, deaths.value]
                }]
               
            }}
            options = {
                {
                    legend: {display: false},
                    title : {display: true, text: `current state in $(country) `}

                }
            }
           />
        ): null
    )
    return (
        <div className = {styles.container}>
           {country? barchart: lineChart}
        </div>
    )
    }
export default Charts;