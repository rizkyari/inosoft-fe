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
        dropdowns: {},
        detail: null,
    },
    mutations: {
        setInspections(state, data) {
            state.inspections = toArray(data)
        },
        setDropdowns(state, data) {
            state.dropdowns = data || {}
        },
        addInspection(state, data) {
            state.inspections.unshift(data)
        },
        setDetail(state, data) {
            state.detail = data
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
        },
        async createInspection({commit}, payload) {
            try {
                commit('addInspection', payload)
            } catch (error) {
                console.error(error);
            }
        },
        async fetchDetail({commit}, id) {
            try {
                const res = await axios.get(`/inspection-detail.json`)
                commit('setDetail', res.data)
            } catch (error) {
                console.error(error)
                commit('setDetail', null)
            }
        }
    },
    getters: {
        getInspections: (state) => state.inspections,
        getDropdowns: (state) => state.dropdowns,
        getDetail: (state) => state.detail,
    }
})