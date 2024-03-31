import { Bungalow, Facebook, Instagram, X } from "@mui/icons-material"
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import React from "react";

function bottomNavBar() {
    return (
    <AppBar position='relative' sx={{top: "auto", bottom: 0, height: 100, backgroundColor : '#ffefde', color:'black', justifyContent:'center'}}>
      <Toolbar>
      <Typography width={500}>
            Supported and maintained by <Box fontStyle = 'italic' display = 'inline'>UF COE</Box>
          </Typography>
        <Grid width='100%' justifyContent="right">
          <Box display="flex" justifyContent="end" gap={5}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="https://education.ufl.edu/"
          >
            <Bungalow />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="https://www.instagram.com/uf_coe/"
          >
            <Instagram />
          </IconButton>
          
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="https://twitter.com/UF_COE"
            sx={{ mr: 0 }}
          >
            <X />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="https://www.facebook.com/UF.COE/"
          >
            <Facebook />
          </IconButton>
          </Box>
          </Grid>
      </Toolbar>
      </AppBar>
    );
}

export default bottomNavBar;