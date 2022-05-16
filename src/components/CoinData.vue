<template lang="">
    <div class="container">
        <div class="wrapper">
            <div class="header">
                <!-- Try to display cryptocurrency icon. Hide if the image cannot be loaded. -->
                <img v-if="name" :src="`https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/64x64/${name.toLowerCase()}.png`" @error="(e) => handleImageLoadingError(e)"/>
                <h2>{{name}}</h2>
            </div>
            <LineChart :chartData="chartData" />
            <span>{{price}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Endpoints, Timeframe } from '../endpoints';
import LineChart from './LineChart';
import moment from 'moment';
export default {
    name: 'CoinData',
    props: [
        'symbol',
        'name'
    ],
    components: {
        LineChart
    },

    async created() {
        // Fetch data when the component is rendered
        await this.updateData();

        // Set a timer to update data each 5s
        this.timer = setInterval(async () => {
            await this.updateData();
        }, 5000);
    },

    data() {
        return {
            price : 0,
            priceHistory: Array<Number>(),
            timer: 0,
            chartData: {}
        }
    },

    methods: {
        async getPriceHistory(symbol : string, period : Timeframe, limit : number) : Promise<Array<any>> {
            const data = fetch(Endpoints.Binance.priceHistory(symbol, period, limit))
            .then(response => response.json())
            .then(data => { return data })
            .catch(error => {
                console.log(error);
            }); 

            return data;
        },

        handleImageLoadingError (e) {
            e.target.style = "display: none;";
        },

        async updateData() {
            this.priceHistory = await this.getPriceHistory(this.symbol, Timeframe.Daily, 50);
            this.price = +Number.parseFloat(this.priceHistory[this.priceHistory.length - 1][4]).toFixed(2);
            this.updateChart();
        },

        updateChart() {
            let labels : string[] = this.priceHistory.map(x => { return (moment(x[0]).format('l')) });
            let data : number[] = this.priceHistory.map(x => { return Number.parseFloat(x[4]) });

            this.chartData = {
                labels: labels,
                datasets: [
                    {
                    label: 'Price',
                    backgroundColor: '#f87979',
                    data: data
                    }
                ]
            }
        }
    },

    beforeUnmount() {
        clearInterval(this.timer);
    },
}
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: auto;
        max-width: 500px;
        min-height: 300px;
        background-color: #2d254a;
        border-radius: 5px;
        margin: auto;
        padding: 1rem;

        .header {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: flex-start;

            img {
                max-width: 64px;
                max-height: 64px;
                width: 100%;
                height: 100%;
                object-fit: cover;
                margin: 1rem;
            }
        }

        
        .linechart {
            width: 60vw;
            height: 50vh;
        }
    }
</style>