export const SET_FETCHING = 'SET_FETCHING'
export const SET_DATA = 'SET_DATA'
export const SET_CLEAR = 'SET_CLEAR'
export const SET_REMOVE_FROM_BOOKMARK = 'SET_REMOVE_FROM_BOOKMARK'
export const SET_ADD_BOOKMARK_GIT = 'SET_ADD_BOOKMARK_GIT'
export const SET_IS_ERROR = 'SET_IS_ERROR'

export type TItem = {
    [key: string]: any
}

export type IdType = number

export type TItems = Array<TItem>

export interface IIsErrorType {
    error: boolean
    msg: string
}

export interface IGitHub {
    total_count: number
    items: TItems
}

export interface IData extends IGitHub {
    isFetching: boolean
    isError: IIsErrorType
}

export interface GetDataActionType extends IGitHub {
    type: typeof SET_DATA
}

export interface SetAddBookMarkGit {
    type: typeof SET_ADD_BOOKMARK_GIT
    id: number
}

export interface FetcingActionType {
    type: typeof SET_FETCHING
    isFetching: boolean
}

export interface SetIsErrorActionType {
    type: typeof SET_IS_ERROR
    isError: IIsErrorType
}

export interface SetRemoveFromBookmark {
    type: typeof SET_REMOVE_FROM_BOOKMARK
    itemId: number
}

export interface SetClearActionType {
    type: typeof SET_CLEAR
}

export type GithubActionTypes =
    | GetDataActionType
    | FetcingActionType
    | SetClearActionType
    | SetRemoveFromBookmark
    | SetAddBookMarkGit
    | SetIsErrorActionType
