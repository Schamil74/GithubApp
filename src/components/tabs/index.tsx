import { perPage } from '@/App'
import RepoList from '@/components/list'
import Loader from '@/components/loader'
import ModalApp from '@/modal'
import { PersistedState } from '@/store/types'
import { Box, Button, Tab, Tabs, Typography } from '@material-ui/core'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props

    return (
        <div hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    )
}

type PropsTabsApp = {
    handleClick(): void
}

const TabsApp: FC<PropsTabsApp> = props => {
    const { handleClick } = props
    const gitHubState = (state: PersistedState) => state.github
    const bookmarksState = (state: PersistedState) => state.bookmarks

    const { isFetching, isError, items, total_count } = useSelector(gitHubState)
    const { bookmarks } = useSelector(bookmarksState)
    const [value, setValue] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const getFetching = () => {
        if (!navigator.onLine) {
            return false
        }
        return isFetching
    }
    return (
        <>
            <Box mb={3}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Результаты поиска" />
                    <Tab label="Закладки" />
                </Tabs>
            </Box>
            <Box pb={3}>
                <TabPanel value={value} index={0}>
                    {getFetching() ? (
                        <Box display="flex" mt={3} mb={6}>
                            <Loader />
                        </Box>
                    ) : (
                        <>
                            <Box mb={3}>
                                <Typography align="center">
                                    Показано {items.length} из {total_count}
                                </Typography>
                            </Box>

                            <RepoList items={items} />
                        </>
                    )}

                    <Box display="flex" justifyContent="center" mt={3}>
                        <>
                            <ModalApp data={isError} />

                            <Button
                                onClick={handleClick}
                                size="large"
                                variant="contained"
                                color="primary"
                                disabled={
                                    perPage - total_count === 0 ||
                                    !navigator.onLine
                                        ? true
                                        : false
                                }
                            >
                                Загрузить еще
                            </Button>
                        </>
                    </Box>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    {bookmarks.length < 1 ? (
                        <Typography align="center">
                            Закладок пока нет
                        </Typography>
                    ) : (
                        <RepoList items={bookmarks} />
                    )}
                </TabPanel>
            </Box>
        </>
    )
}

export default TabsApp
