import { persistedReducer, rootReducer } from '@/store/reducers'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { GithubActionTypes } from './github-types'

export type RootState = ReturnType<typeof rootReducer>
export type PersistedState = ReturnType<typeof persistedReducer>

export type AppThunkDispatch = ThunkDispatch<
    PersistedState,
    any,
    Action<GithubActionTypes>
>

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    PersistedState,
    unknown,
    Action<string>
>
