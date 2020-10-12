import {
    setAddBookmark,
    setDeleteBookmark,
} from '@/store/actions/bookmarks-actions'
import { setRemoveFromBookmarks } from '@/store/actions/github-actions'
import { TItem } from '@/store/types/github-types'
import {
    Avatar,
    Box,
    Checkbox,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

type TProps = {
    item: TItem
    value: number
}

const Repo: FC<TProps> = props => {
    const { item, value } = props
    const { id, login } = item
    const { avatar_url } = item.owner
    const labelId = `checkbox-list-secondary-label-${value}`

    const dispatch: Dispatch = useDispatch()

    const handleToggle = (
        ev: React.ChangeEvent<HTMLInputElement>,
        itemId: number
    ) => {
        const checkedItem = ev.target.checked

        if (checkedItem) {
            if (id === itemId) {
                item.isBookmarked = true
                dispatch(setAddBookmark(item))
            }
        } else {
            dispatch(setRemoveFromBookmarks(id))
            dispatch(setDeleteBookmark(id))
        }
    }

    return (
        <ListItem key={value}>
            <pre>{item.isBookmarked.toString}</pre>
            <ListItemAvatar>
                <Avatar alt={`Avatar for ${login}`} src={avatar_url} />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={login} />

            <ListItemIcon>
                <>
                    <StarIcon color="primary" />
                    {item.stargazers_count}
                </>
            </ListItemIcon>

            <ListItemSecondaryAction>
                <Box>
                    <Checkbox
                        edge="end"
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                            handleToggle(ev, id)
                        }}
                        checked={item.isBookmarked}
                        inputProps={{
                            'aria-labelledby': labelId,
                            'title': item.isBookmarked
                                ? 'Добавить в закладки'
                                : 'Удалить из закладок',
                        }}
                    ></Checkbox>
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default Repo
