/**
 * Created by jiangjianming@bmkp.cn on 2018/4/27.
 */
import {
  getUser,
  getAddressList
} from '../service/getData'
import {
  GET_USERINFO,
  SAVE_ADDRESS
} from './mutation-types'
export default {
  async getUserInfo ({commit, state}) {
    let res = await getUser()
    commit(GET_USERINFO, res)
  },
  async saveAddress ({commit, state}) {
    if (state.removeAddres.length > 0) return
    let address = await getAddressList(state.getUserInfo.user_id)
    commit(SAVE_ADDRESS, address)
  }
}
