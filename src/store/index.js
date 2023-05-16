import { createStore } from 'vuex'

export default createStore({
    state: {
        crd: null,
    },
    getters: {

    },
    mutations: {
        setCrd(state, crd) {
            state.crd = crd
        },
    },
    actions: {

    }

})
