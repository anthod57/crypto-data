<template lang="">
  <header>
    <nav>
      <div class="container">
        <div class="left">

        </div>
        <div class="center">
          <h2>{{title}}</h2>
        </div>
        <div class="right">

        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  props: [
      'title'
  ]
}
</script>

<style lang="scss" scoped>
  nav {
    width: 100%;
    height: 100px;
    background-color: #2d254a;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 1em;

      .center {
        display: flex;
        justify-content: center;
        align-content: center;
        gap: 0.5em;
        color: white;

        .icon {
          height: 100%;
          font-size: 2em;
          margin: auto;
        }

        h2 {
          margin: auto;
        }
      }
    }
  }
</style>

