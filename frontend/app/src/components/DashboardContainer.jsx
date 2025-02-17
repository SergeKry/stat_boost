import React from 'react'
import { Container } from "@mui/material";

const DashboardContainer = ({children}) => {
  return (
    <Container sx={{ borderRadius: "8px", border: " 2px solid #E9E9E9",  flexGrow: 1, }}> {children} </Container>
  )
}

export default DashboardContainer