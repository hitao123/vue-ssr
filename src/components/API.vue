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
    ...mapGetters(['list'])
  },
  asyncData ({ store, route }) {
    return store.dispatch('getTopic', { })
  },
  methods: {
    ...mapActions(['getTopic'])
  }
}
</script>

<style>

</style>
