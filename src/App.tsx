import { getScrollHeight } from '@/utils'
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from '@material-ui/core'
import 'fontsource-roboto'
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import Search from './components/search'
import TabsApp from './components/tabs'
import { setClearHubData, thunkGetData } from './store/actions/github-actions'
import { AppThunkDispatch, PersistedState } from './store/types'

export const perPage = 4

const App: FC = () => {
    const gitHubState = (state: PersistedState) => state.github
    const { isFetching } = useSelector(gitHubState)

    const thunkDispatch: AppThunkDispatch = useDispatch()
    const dispatch: Dispatch = useDispatch()

    const [searchValue, setSearchValue] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const isInitialMount = useRef<boolean>(true)

    useEffect(() => {
        if (isInitialMount.current) {
            thunkDispatch(thunkGetData(searchValue.trim(), perPage, 1))
            isInitialMount.current = false
        } else {
            thunkDispatch(
                thunkGetData(searchValue.trim(), perPage, currentPage)
            )
        }
    }, [currentPage])

    useLayoutEffect(() => {
        if (!isFetching) {
            const scrollHeight = getScrollHeight()

            setTimeout(function () {
                window.scrollTo(0, scrollHeight)
            }, 0)
        }
    }, [isFetching])

    const handleClickMore = () => {
        setCurrentPage(currentPage => currentPage + 1)
    }

    const handleChangeSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(ev.target.value)
    }

    const handleClickSearch = () => {
        if (searchValue.trim() !== '') {
            dispatch(setClearHubData())
            setCurrentPage(1)
            thunkDispatch(
                thunkGetData(searchValue.trim(), perPage, currentPage)
            )
        }
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box mt={3} mb={3}>
                    <Typography align="center" variant="h3" component="h1">
                        GitHub Finder Repos
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="md">
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Search
                        onClick={handleClickSearch}
                        onSeacrh={handleChangeSearch}
                    />
                </Grid>

                <Grid>
                    <TabsApp handleClick={handleClickMore} />
                </Grid>
            </Container>
        </>
    )
}

export default App
