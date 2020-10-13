import {
    SetAddBookmarkActionType,
    SetDeleteBookmarkActionType,
    SET_ADD_BOOKMARK,
    SET_DELETE_BOOKMARK,
    TBookmarkItem,
} from '../types/bookmarks-types'

export const setAddBookmark = (
    bookmark: TBookmarkItem
): SetAddBookmarkActionType => {
    return { type: SET_ADD_BOOKMARK, bookmark }
}

export const setDeleteBookmark = (
    idBookmark: number
): SetDeleteBookmarkActionType => {
    return { type: SET_DELETE_BOOKMARK, idBookmark }
}
