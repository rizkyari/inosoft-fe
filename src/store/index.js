import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        inspections: [],
        dropdowns: {}
    },
    mutations: {
        setInspections(state, data) {
            state.inspections = data
        },
        setDropdowns(state, data) {
            state.dropdowns = data
        }
    },
    actions: {
        async fetchInspections({commit}) {
            const res = await axiox.get('/inspections.json')
            commit('setInspections', res.data)
        },
        async fetchDropdowns({commit}) {
            const res = await axios.get('/dropdowns.json')
            commit('setDropdowns', res.data)
        }
    },
    getters: {
        getInspections: (state) => state.inspections,
        getDropdowns: (state) => state.dropdowns,
    }
})