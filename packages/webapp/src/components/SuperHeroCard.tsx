import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PowerStats, SuperHeroTruncated } from 'typings/generated';

const SuperHeroCard = (props: SuperHeroTruncated) => {
    return (
        <Card sx={{  width: '350px', maxHeight: '150px'}}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.id}
                </Typography>
                <Typography color="textSecondary">
                    {props.name || '(Not defined)'}
                </Typography>
                    <Typography variant="body2" component="p">
                    {props.powerstats?.durability}
                </Typography>
                
                <Typography variant="body2" component="p">
                    {props.image?.url}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SuperHeroCard;