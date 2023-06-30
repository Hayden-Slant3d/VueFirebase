<template>
  <nav>
    <ul>
      <li>
        <Login/>
      </li>
      <li>
        <router-link :to="{name:'Home'}">
          <button>homePage</button>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'Test'}">
          <button>testPage</button>
        </router-link>
      </li>
    </ul>
  </nav>
</template>


<script>
import Login from './Login.vue';

export default {
    setup() {
        return {};
    },
    components: { Login }
}
</script>


<style lang="scss" scoped>

</style>