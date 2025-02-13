import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ContactPageIcon from '@mui/icons-material/ContactPage';

function PlayerCard({ player }) {
  return (
    <Card sx={{ minWidth: 200, height: 200, display: "flex", alignItems: "center", justifyContent: "center"}}>
        <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", height: "100%"}}>
            <Typography variant="h5" component="div">{player.nickname}</Typography>
            <ContactPageIcon sx={{ fontSize: 60 }} />
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{player.wg_player_id}</Typography>
        </CardContent>
    </Card>
  )
}

export default PlayerCard