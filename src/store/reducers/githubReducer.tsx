import {
    IData,
    SET_CLEAR,
    SET_DATA,
    SET_FETCHING,
    SET_REMOVE_FROM_BOOKMARK,
} from '@/store/types/github-types'

const initialState: IData = {
    isFetching: false,
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

        case SET_DATA:
            return {
                ...state,
                total_count: action.total_count,
                items: [...state.items, ...action.items],
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
