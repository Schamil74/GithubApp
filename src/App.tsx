import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import RepoList from './components/list'
import Loader from './components/loader'
import Search from './components/search'
import { setClearHubData, thunkGetData } from './store/actions/github-actions'
import { AppThunkDispatch, PersistedState } from './store/types'

const getScrollHeight = (): number => {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    )
}
const App: FC = (props: any) => {
    const gitHubState = (state: PersistedState) => state.github
    const bookmarksState = (state: PersistedState) => state.bookmarks

    const { isFetching, items, total_count } = useSelector(gitHubState)
    const { bookmarks } = useSelector(bookmarksState)

    const thunkDispatch: AppThunkDispatch = useDispatch()
    const dispatch: Dispatch = useDispatch()

    const [value, setValue] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const isInitialMount = useRef<boolean>(true)

    useEffect(() => {
        if (isInitialMount.current) {
            thunkDispatch(thunkGetData('', 4, 1))
            isInitialMount.current = false
        } else {
            thunkDispatch(thunkGetData(searchValue.trim(), 4, currentPage))
        }
    }, [currentPage])

    useEffect(() => {
        if (!isFetching) {
            const scrollHeight = getScrollHeight()
            setTimeout(function () {
                window.scrollTo(0, scrollHeight)
            }, 100)
        }
    }, [isFetching])

    const handleClick = () => {
        setCurrentPage(currentPage => currentPage + 1)
    }

    const handleChangeSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(ev.target.value)
    }

    const handleClickSearch = () => {
        if (searchValue.trim() !== '') {
            setCurrentPage(1)
            dispatch(setClearHubData())
            thunkDispatch(thunkGetData(searchValue.trim(), 4, currentPage))
        }
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box mt={3}>
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Search
                            onClick={handleClickSearch}
                            onToggle={handleChangeSearch}
                        />
                    </Grid>
                </Box>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                centered
                            >
                                <Tab label="Результаты поиска" />
                                <Tab label="Закладки" />
                            </Tabs>

                            <Typography>
                                Показано {items.length} из {total_count}
                            </Typography>

                            {isFetching ? (
                                <Box display="flex">
                                    <Loader />
                                </Box>
                            ) : (
                                <>
                                    <RepoList items={items} />
                                    <br />
                                    <br />
                                    <RepoList items={bookmarks} />
                                </>
                            )}
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Button
                                onClick={handleClick}
                                size="large"
                                variant="contained"
                                color="primary"
                                disabled={4 - total_count === 0 ? true : false}
                            >
                                Загрузить еще
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default App
