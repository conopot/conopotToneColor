import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            name: 'kim',
            age: 20,
            likes: 30,
            isLiked: false,
            more: {},
        }
    },

    //state 변경은 항상 store.js만 합니다.
    mutations: {
        setMore(state, data) {
            state.more = data;
        },
        changeName(state) {
            state.name = 'park'
        },
        plusOneAge(state) {
            state.age++;
        },
        clickLike(state) {
            state.likes++;
        }
    },

    //ajax 하는 부분
    actions: {

    }

})

export default store;