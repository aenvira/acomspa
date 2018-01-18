import { Observable } from 'rxjs'
import { getProfile } from '../api'

export const PROFILE_REQ = 'PROFILE_REQ'
export const PROFILE_FAILED = 'PROFILE_FAILED'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'

export const requestProfile = () => ({ type: PROFILE_REQ })
export const profileEpic = action$ =>
  action$.ofType(PROFILE_REQ)
    .mergeMap(action =>
      getProfile()
        .map(res => ({
          type: PROFILE_SUCCESS,
          payload: res
        }))
        .catch(error => Observable.of({
          type: PROFILE_FAILED,
          payload: error,
          error: true
        }) )
    )
