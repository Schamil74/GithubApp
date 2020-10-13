import messages from '@/messages'
import { setIsError } from '@/store/actions/github-actions'
import { IIsErrorType } from '@/store/types/github-types'
import { Modal } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'

type ModalProps = {
    data: IIsErrorType
}

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            maxWidth: 400,
            backgroundColor: theme.palette.background.paper,
            border: '3px solid #3f51b5',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        text: {
            textAlign: 'center',
        },
    })
)

const ModalApp: FC<ModalProps> = props => {
    const { data } = props
    const dispatch: Dispatch = useDispatch()
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)

    const handleClose = () => {
        dispatch(setIsError({ error: false, msg: '' }))
    }

    return (
        <Modal open={data.error} onClose={handleClose}>
            <div style={modalStyle} className={classes.paper}>
                <h2 className={classes.text}>Ошибка</h2>
                <p className={classes.text}>{messages(data.msg)}</p>
            </div>
        </Modal>
    )
}

export default ModalApp
