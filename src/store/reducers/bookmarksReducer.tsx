import {
    IInitialType,
    SET_ADD_BOOKMARK,
    SET_DELETE_BOOKMARK,
} from '../types/bookmarks-types'

const initialState: IInitialType = {
    bookmarks: [],
}

export function bookmarksReducer(
    state = initialState,
    action: any
): IInitialType {
    switch (action.type) {
        case SET_ADD_BOOKMARK:
            return {
                bookmarks: [...state.bookmarks, action.bookmark],
            }
        case SET_DELETE_BOOKMARK:
            return {
                bookmarks: [
                    ...state.bookmarks.filter(
                        item => item.id !== action.idBookmark
                    ),
                ],
            }
        default:
            return state
    }
}
