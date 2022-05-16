<template lang="">
  
  <Navbar title="CRYPTO TRACKER" />
  
  <main>
      <CoinData symbol="BTCUSDT" name="Bitcoin" />
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
  @import './styles/base.css';
</style>