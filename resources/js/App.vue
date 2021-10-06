<template>
    <div id="app">
        <v-main-wrapper />
    </div>
</template>

<script>
    import vMainWrapper from "./components/v-main-wrapper";
    export default {
        name: "App",
        components: {
            vMainWrapper
        }
    };
</script>

<style lang="scss">
 #app{
     background: url("../images/bg.jpeg") no-repeat center/cover;
     position: relative;
     min-height: 100vh;
     z-index: 0;

     &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.78);
          z-index: -1;
      }
 }
</style>
