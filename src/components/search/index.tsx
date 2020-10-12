import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React, { FC } from 'react'

type TSearch = {
    onToggle(ev: React.ChangeEvent<HTMLInputElement>): void
    onClick(): void
}
const Search: FC<TSearch> = props => {
    const { onToggle, onClick } = props

    return (
        <>
            <Grid item xs={10}>
                <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    onChange={onToggle}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <Button
                    type="button"
                    size="large"
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={onClick}
                >
                    Find
                </Button>
            </Grid>
        </>
    )
}

export default Search
