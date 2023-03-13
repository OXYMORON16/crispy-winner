import { MutationTree } from 'vuex'
import UserState from './UserState'
import * as types from './mutation-types'

const mutations: MutationTree <UserState> = {
    [types.USER_INFO_UPDATED] (state, payload) {
        state.user = payload
    },
}
export default mutations;