import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline-flex',
            margin: 'auto',
        },
    })
)

export default function Loader() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress size={160} thickness={2} color="primary" />
        </div>
    )
}
