<template lang="">
    <div class="container">
        <div class="wrapper">
            <div class="header">
                <div class="left">
                    <!-- Try to display cryptocurrency icon. Hide if the image cannot be loaded. -->
                    <img v-if="name" :src="`https://raw.githubusercontent.com/condacore/cryptocurrency-icons/master/64x64/${name.toLowerCase()}.png`" @error="(e) => handleImageLoadingError(e)"/>
                    <h2>{{name}}</h2>
                </div>
                <div class="right">
                    <span class="price">{{price}}</span>
                    <span v-bind:class="{'variation positive': variation >= 0, 'variation negative': variation < 0}">{{variation.toFixed(2)}}</span>
                </div>
            </div>
            <LineChart :chart-data="chartData" />
        </div>
    </div>
</template>

<script lang="ts">
import { Endpoints, Timeframe } from '../endpoints';
import { defineComponent } from "vue";
import LineChart from './LineChart';
import moment from 'moment';
export default defineComponent({
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
        this.priceHistory = await this.getPriceHistory(this.symbol, Timeframe.Daily, 50);
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
            variation: 0,
            chartData: {
                labels: Array<String>(),
                datasets: Array<Object>()
            }
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
            const data = await this.getPriceHistory(this.symbol, Timeframe.Daily, 2);
            this.price = +Number.parseFloat(data[data.length - 1][4]).toFixed(2);
            this.variation = this.dayVariation(this.price, data[data.length - 2][4]);
            this.updateChart();
        },

        updateChart() {
            let labels : string[] = this.priceHistory.map(x => { return (moment(x[0]).format('l')) });
            let data : number[] = this.priceHistory.map(x => { return Number.parseFloat(x[4]) });

            // Update current price
            data[data.length - 1] = this.price;

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
        },

        // Calculate price variation based on current price and yesterday close price
        dayVariation(currentPrice : number, yesterdayPrice : number) : number {
            return (currentPrice - yesterdayPrice) / yesterdayPrice * 100;
        }
    },

    beforeUnmount() {
        clearInterval(this.timer);
    },
});
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: auto;
        max-width: 800px;
        min-height: 300px;
        background-color: #2d254a;
        border-radius: 5px;
        padding: 1rem;
        margin: auto;

        .header {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;

            .left {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                
                img {
                    max-width: 50px;
                    max-height: 50px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    margin: 1rem;
                }
            }

            .right {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .price {
                    font-weight: bold;
                    font-size: 1.5rem;  
                    transition: opacity 0.5s ease;
                    margin: 0 4px;

                    &::before {
                        content:'$'
                    }
                }

                .variation {
                    font-size: 1rem;
                    margin: 0 4px;

                    &::after {
                        content:'%'
                    }

                    &.positive {
                        color: #35b42e;
                    }

                    &.negative {
                        color: #b4352e;
                    }
                }
            }
        }

        @media only screen and (max-width: 400px) {
            padding: 0.5rem;
            .header {
                flex-direction: column;

                h2 {
                    font-size: 1rem;
                }
                
                .left {
                    img {
                        max-width: 32px;
                        max-height: 32px;
                        margin: 0.5rem;
                    }
                }

                .right {
                    .price {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
</style>