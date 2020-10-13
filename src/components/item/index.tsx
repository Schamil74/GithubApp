import {
    setAddBookmark,
    setDeleteBookmark,
} from '@/store/actions/bookmarks-actions'
import {
    setAddBookMarkGit,
    setRemoveFromBookmarks,
} from '@/store/actions/github-actions'
import { TItem } from '@/store/types/github-types'
import {
    Avatar,
    Box,
    Checkbox,
    Link,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
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
    const { id, name, html_url } = item
    const { avatar_url } = item.owner
    const matches = useMediaQuery('(max-width:767px)')

    const dispatch: Dispatch = useDispatch()

    const handleToggle = (
        ev: React.ChangeEvent<HTMLInputElement>,
        itemId: number
    ) => {
        const checkedItem = ev.target.checked

        if (checkedItem) {
            if (id === itemId) {
                const bookmarked = {
                    ...item,
                    isBookmarked: true,
                }
                dispatch(setAddBookMarkGit(id))
                dispatch(setAddBookmark(bookmarked))
            }
        } else {
            dispatch(setRemoveFromBookmarks(id))
            dispatch(setDeleteBookmark(id))
        }
    }

    return (
        <Box key={value} boxShadow={3} mb={2}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt={`Avatar for ${name}`} src={avatar_url} />
                </ListItemAvatar>

                <ListItemText primary={name} />

                {!matches ? (
                    <>
                        <Box ml={2}>
                            <Link
                                href={html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ссылка на репо
                            </Link>
                        </Box>
                        <Box ml={2} mr={2}>
                            <ListItemIcon>
                                <Box display="flex" alignItems="center">
                                    <StarIcon color="primary" />
                                    &nbsp;
                                    {item.stargazers_count}
                                </Box>
                            </ListItemIcon>
                        </Box>
                    </>
                ) : (
                    ''
                )}

                <ListItemSecondaryAction>
                    <Checkbox
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                            handleToggle(ev, id)
                        }}
                        checked={item.isBookmarked}
                        inputProps={{
                            'title': item.isBookmarked
                                ? 'Удалить из закладок'
                                : 'Добавить в закладки',
                        }}
                    ></Checkbox>
                </ListItemSecondaryAction>
            </ListItem>
        </Box>
    )
}

export default Repo
