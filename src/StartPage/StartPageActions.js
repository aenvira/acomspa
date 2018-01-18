import { isOnline } from '../api'

export const ONLINE_REQ = 'ONLINE_REQ'
export const ONLINE_SUCCESS = 'ONLINE_SUCCESS'

export const isAppOnline = () => ({ type: ONLINE_REQ, payload: 'checking' })
export const checkOnlineStatus = action$ =>
  action$.ofType(ONLINE_REQ)
    .mergeMap(action =>
      isOnline()
        .map(res => ({ type: ONLINE_SUCCESS, payload: res ? 'online' : 'offline' }))
    )
