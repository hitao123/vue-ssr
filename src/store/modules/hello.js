import axios from 'axios'
import { GET_TOPICLIST } from '../mutation-types'

const state = {
  list: []
}

const getters = {
  list: state => state.list
}

const actions = {
  getTopic ({ commit }, params) {
    axios.get('https://cnodejs.org/api/v1/topics')
      .then(function (res) {
        let data = res.data
        if (data.success === true) {
          commit(GET_TOPICLIST, data.data)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
}

const mutations = {
  [GET_TOPICLIST](state, data) {
    state.list = data
  }
}

export default {
  getters,
  state,
  actions,
  mutations
}
