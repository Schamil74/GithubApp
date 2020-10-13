import {
    IData,
    SET_ADD_BOOKMARK_GIT,
    SET_CLEAR,
    SET_DATA,
    SET_FETCHING,
    SET_IS_ERROR,
    SET_REMOVE_FROM_BOOKMARK,
} from '@/store/types/github-types'

const initialState: IData = {
    isFetching: false,
    isError: {
        error: false,
        msg: '',
    },
    total_count: 0,
    items: [],
}

export function gitHubReducer(state = initialState, action: any): IData {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case SET_IS_ERROR:
            return {
                ...state,
                isError: {
                    error: action.isError.error,
                    msg: action.isError.msg,
                },
            }
        case SET_DATA:
            return {
                ...state,
                total_count: action.total_count,
                items: [...state.items, ...action.items],
            }
        case SET_ADD_BOOKMARK_GIT:
            return {
                ...state,
                items: [
                    ...state.items.map(item =>
                        item.id !== action.id
                            ? item
                            : { ...item, isBookmarked: !item.isBookmarked }
                    ),
                ],
            }
        case SET_REMOVE_FROM_BOOKMARK:
            return {
                ...state,
                items: [
                    ...state.items.map(item =>
                        item.id !== action.itemId
                            ? item
                            : { ...item, isBookmarked: !item.isBookmarked }
                    ),
                ],
            }
        case SET_CLEAR:
            return {
                ...state,
                items: [],
            }

        default:
            return state
    }
}
