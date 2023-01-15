import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

const SearchBox = ({ handleSubmit }: any) => {
    const [superhero, setSuperhero] = useState(null)
    const handleSearch= (event: any) => {
      setSuperhero(event.target.value);
    }
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            spacing={2}
        >
            <Grid item>
                <TextField id="superhero-id-text" label="Superhero name" variant="outlined" autoFocus margin="dense" onChange={handleSearch} required />
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" onClick={() => handleSubmit(superhero)}>Submit </Button>
            </Grid>
        </Grid>
    )
};

export default SearchBox;
