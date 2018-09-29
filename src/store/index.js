import Vue from 'vue'
import Vuex from 'vuex'
import hello from './modules/hello'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    modules: {
      hello
    }
  })
}
