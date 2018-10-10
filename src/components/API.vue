<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <h2>{{ item.title }}</h2>
        <div></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('hello', ['list'])
  },
  asyncData ({ store, route, cookies }) {
    let config = {}
    config.cookies = cookies
    return store.dispatch('hello/getTopic', config)
  },
  // mounted() {
  //   this.getTopic({})
  // },
  methods: {
    ...mapActions('hello', ['getTopic'])
  }
}
</script>

<style>

</style>
