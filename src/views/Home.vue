<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/hello-world.vue'
  import { requestDemo } from '@/api/request-demo'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    created() {
      // this._requestDemo()
    },
    methods: {
      _requestDemo() {
        requestDemo().then(() => {
        })
      }
    }
  }
</script>
