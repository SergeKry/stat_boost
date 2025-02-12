import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ContactPageIcon from '@mui/icons-material/ContactPage';

function PlayerCard({ player }) {
  return (
    <Card sx={{ minWidth: 150, maxWidth: 200 }}>
        <CardContent>
            <Typography variant="h5" component="div">{player.nickname}</Typography>
            <ContactPageIcon sx={{ fontSize: 60 }} />
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{player.wgId}</Typography>
        </CardContent>
    </Card>
  )
}

export default PlayerCard