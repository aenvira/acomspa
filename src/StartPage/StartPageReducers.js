import Data from '../utils/types'
import { ONLINE_REQ, ONLINE_SUCCESS } from './StartPageActions'

const { Remote } = Data

export const isOnline = (state = Remote.NotAsked, { type, payload }) => {
  switch (type) {
    case ONLINE_REQ:
      return Remote.Loading
    case ONLINE_SUCCESS:
      return Remote.Succeded(payload)
    default:
      return state
  }
}
