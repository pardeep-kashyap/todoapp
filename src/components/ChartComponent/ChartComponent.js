import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
export const extractElement = (data, element) => {
    return data.map((idx) => {
        return idx[element];
    });
};

export const extractDate = (data) => {
    return data.map((idx) => {
        console.log(idx);
        var x = `${idx.Date.getDate()}-${idx.Date.getMonth()}-${idx.Date.getFullYear()}`;
        return x;
    });
};
const textStyle = {
    color: '#ffffff',
};
const ChartComponent = (props) => {
    console.log('dsada', props);
    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#ffffff',
        },
        title: {
            text: 'Your Weekly Fitness Data',
            style: textStyle,
        },
        credits: {
            text: '',
        },
        xAxis: {
            categories: extractDate(props.data),
            labels: {
                style: textStyle,
            },
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
        },
        tooltip: {
            backgroundColor: '#272727',
            headerFormat:
                '<span style="font-size:10px; color:white">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0"><b>{series.name}: </b></td>' +
                '<td style="padding:0; color:white"><b>{point.y} units</b></td></tr>',
            footerFormat: '</table>',
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                stacking: 'percent',
            },
        },
        colors: ['#ff3d00'],
        series: [
            {
                name: 'Steps',
                data: extractElement(props.data, 'Steps'),
            },
        ],
    };

    
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default ChartComponent;
