import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { FC } from 'react'

type TSearch = {
    onSeacrh(ev: React.ChangeEvent<HTMLInputElement>): void
    onClick(): void
}
const Search: FC<TSearch> = props => {
    const { onSeacrh, onClick } = props

    return (
        <>
            <Grid item xs={7} sm={8} md={10}>
                <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Поиск"
                    variant="outlined"
                    onChange={onSeacrh}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={5} sm={4} md={2}>
                <Button
                    type="button"
                    size="large"
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={onClick}
                >
                    Найти
                </Button>
            </Grid>
        </>
    )
}

export default Search
