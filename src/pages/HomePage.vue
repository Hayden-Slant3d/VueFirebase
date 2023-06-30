<template>
  <div class="component">
  </div>
</template>


<script>
import TestCom from '../components/TestCom.vue';
import { logger } from '../utils/Logger';
import { Pop } from '../utils/Pop';


export default {
    setup() {
        return {
          testPop(){
            Pop.confirm()
            logger.log('hello')
          }
        };
    },
    components: { TestCom }
}
</script>


<style lang="scss" scoped>

</style>