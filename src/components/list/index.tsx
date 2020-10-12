import { TItems } from '@/store/types/github-types'
import { List } from '@material-ui/core'
import React, { FC } from 'react'
import Repo from '../item'

type TListProps = {
    items: TItems
}

const RepoList: FC<TListProps> = props => {
    const { items } = props

    return (
        <List>
            {items.map((item, value) => {
                return <Repo key={value} item={item} value={value} />
            })}
        </List>
    )
}

export default RepoList
