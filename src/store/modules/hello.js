// import axios from 'axios'
import { fetchAPI } from '../../utils/http-server'
import { GET_TOPICLIST } from '../mutation-types'

// const state = () => ({
//   list: []
// })

const state = {
  list: []
}

const getters = {
  list: state => state.list
}

const actions = {
  getTopic ({ commit }, params) {
    if (!params.cookies) {
      params.cookies = {}
    }

    fetchAPI(params.cookies).get('https://cnodejs.org/api/v1/topics', {})
      .then(function (res) {
        if (res.success === true) {
          commit(GET_TOPICLIST, res.data)
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
  namespaced: true,
  getters,
  state,
  actions,
  mutations
}
