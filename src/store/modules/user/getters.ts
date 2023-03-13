import { GetterTree } from 'vuex'
import UserState from './UserState'
import RootState from '@/store/RootState'

const getters: GetterTree <UserState, RootState> = {
    getCurrentUser(state) {
        return state.user;
    }
}
export default getters;