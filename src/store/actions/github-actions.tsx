import axios from '@/axios/'
import { AppThunkAction } from '@/store/types'
import {
    FetcingActionType,
    GetDataActionType,
    IGitHub,
    SetClearActionType,
    SetRemoveFromBookmark,
    SET_CLEAR,
    SET_DATA,
    SET_FETCHING,
    SET_REMOVE_FROM_BOOKMARK,
    TItem,
} from '@/store/types/github-types'

export const thunkGetData = (
    searchQuery: 'stars:%3E1' | string,
    perPage: number,
    currentPage: number
): AppThunkAction => async (dispatch, getState) => {
    if (searchQuery === '') {
        searchQuery = 'stars:%3E1'
    }

    const { bookmarks } = getState().bookmarks

    try {
        dispatch(setIsFetching(true))
        const response = await axios.get(
            `/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`
        )

        response.data.items.forEach((item: TItem) => {
            item.isBookmarked = false
        })

        if (bookmarks.length) {
            bookmarks.forEach((bookmark: TItem) => {
                response.data.items.forEach((item: TItem) => {
                    if (item.id === bookmark.id) {
                        item.isBookmarked = true
                    }
                })
            })
        }

        dispatch(setIsFetching(false))
        dispatch(setGitHubData(response.data))
    } catch (error) {
        console.log(error.message)
    }
}

export const setIsFetching = (isFetching: boolean): FetcingActionType => {
    return { type: SET_FETCHING, isFetching }
}

export const setGitHubData = (githubdata: IGitHub): GetDataActionType => {
    return {
        type: SET_DATA,
        ...githubdata,
    }
}

export const setRemoveFromBookmarks = (
    itemId: number
): SetRemoveFromBookmark => {
    return {
        type: SET_REMOVE_FROM_BOOKMARK,
        itemId,
    }
}

export const setClearHubData = (): SetClearActionType => {
    return {
        type: SET_CLEAR,
    }
}
