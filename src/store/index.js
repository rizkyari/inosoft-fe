import { createStore } from 'vuex'
import axios from 'axios'

function toArray(payload) {
    if (Array.isArray(payload)) return payload
    if (payload && Array.isArray(payload.data)) return payload.data
    return []
}

export default createStore({
    state: {
        inspections: [],
        dropdowns: {}
    },
    mutations: {
        setInspections(state, data) {
            state.inspections = toArray(data)
        },
        setDropdowns(state, data) {
            state.dropdowns = data || {}
        }
    },
    actions: {
        async fetchInspections({commit}) {
            try {
                const res = await axios.get('/inspection.json')
                commit('setInspections', res.data)
            } catch (error) {
                console.error(error)
                commit('setInspections', [])
            }
        },
        async fetchDropdowns({commit}) {
            try {
                const res = await axios.get('/dropdowns.json')
                commit('setDropdowns', res.data)
            } catch (error) {
                console.error(error)
                commit('setDropdowns', {})
            }
        }
    },
    getters: {
        getInspections: (state) => state.inspections,
        getDropdowns: (state) => state.dropdowns,
    }
})