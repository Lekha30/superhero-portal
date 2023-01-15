import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SuperHeroCard = (props: any) => {
    return (
        <Card sx={{  width: '250px', maxHeight: '100px',}}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.id}
                </Typography>
                <Typography color="textSecondary">
                    {props.name || '(Not defined)'}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.powerstats}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.image}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SuperHeroCard;