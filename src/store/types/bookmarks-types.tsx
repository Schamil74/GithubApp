export const SET_ADD_BOOKMARK = 'SET_ADD_BOOKMARK'
export const SET_DELETE_BOOKMARK = 'SET_DELETE_BOOKMARK'
export const SET_TOGGLE_BOOKMARK = 'SET_TOGGLE_BOOKMARK'

export type TBookmarkItem = {
    [key: string]: any
}
export type TBookmarks = Array<TBookmarkItem>

export interface IInitialType {
    bookmarks: TBookmarks
}

export interface SetToggleBookmarkActionType {
    type: typeof SET_TOGGLE_BOOKMARK
    idBookmark: number
}

export interface SetAddBookmarkActionType {
    type: typeof SET_ADD_BOOKMARK
    bookmark: TBookmarkItem
}

export interface SetDeleteBookmarkActionType {
    type: typeof SET_DELETE_BOOKMARK
    idBookmark: number
}

export type BookmarksActionTypes =
    | SetToggleBookmarkActionType
    | SetDeleteBookmarkActionType
    | SetAddBookmarkActionType
