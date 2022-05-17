<template lang="">
  
  <Navbar title="CRYPTO TRACKER" />
  
  <main>
      <CoinData symbol="BTCUSDT" name="Bitcoin" />
      <CoinData symbol="ETHUSDT" name="Ethereum" />
      <CoinData symbol="BNBUSDT" name="Binance-Coin" />
  </main>

</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue';
import CoinData from '@/components/CoinData.vue';

export default {

  components: {
    Navbar,
    CoinData
  }

}
</script>

<style lang="scss">
  @import './styles/base.scss';
</style>