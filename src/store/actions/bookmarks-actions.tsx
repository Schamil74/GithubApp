import {
    SetAddBookmarkActionType,
    SetDeleteBookmarkActionType,
    SET_ADD_BOOKMARK,
    SET_DELETE_BOOKMARK,
    TBookmarkItem,
} from '../types/bookmarks-types'

export const addBookmark = async (bookmark: TBookmarkItem) => {
    setAddBookmark(bookmark)
}

export const deleteBookmark = (bookmark: TBookmarkItem, id: number) => {
    bookmark.isBookmarked = false
    setDeleteBookmark(id)
}

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
