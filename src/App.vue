<template>
  <div id="app">
    <div id="nav">
      <div class="form-search">
      <formularioBusqueda/>
      </div>
      <div class="sideleft">
      <lista />
      </div>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <div class="content">
    <router-view/>
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.form-search{
  display:inline
}

.sideleft{
  
    width: 33%;
    float: left;
    height: 300px;

}

.content{
 display: grid;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
