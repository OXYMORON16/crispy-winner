import { ActionTree } from 'vuex'
import RootState from '@/store/RootState'
import UserState from './UserState'
import * as types from './mutation-types'

const actions: ActionTree<UserState, RootState> = {

  /**
 * Login user
 */
  async login ({ commit }, payload ) {
    commit(types.USER_INFO_UPDATED, payload);
  },

  /**
   * Logout user
   */
//   async logout ({ commit }) {
    
//   },

}  

export default actions;