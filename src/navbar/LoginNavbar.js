import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";

const translations = {
    en: {
        login: 'Login',
    },
    de: {
        login: 'Login',
    },
};

const LoginMenuBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [language, setLanguage] = useState('en');

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const t = translations[language];

    const mobileMenu = (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            <List sx={{ width: 250, backgroundColor: '#005A9C', color: '#FFFFFF', height: '100%' }}>
                <Divider />
                <ListItem>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel sx={{ color: 'white' }}>Language</InputLabel>
                        <Select
                            value={language}
                            onChange={handleLanguageChange}
                            label="Language"
                            sx={{ color: 'white' }}
                        >
                            <MenuItem value="en">EN</MenuItem>
                            <MenuItem value="de">DE</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
            </List>
        </Drawer>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#005A9C' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        CS4F-Porto
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }}}
                    />
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                        <FormControl variant="standard" sx={{ minWidth: 80 }}>
                            <InputLabel sx={{ color: 'white' }}>Language</InputLabel>
                            <Select
                                value={language}
                                onChange={handleLanguageChange}
                                label="Language"
                                sx={{ color: 'white' }}
                            >
                                <MenuItem value="en">EN</MenuItem>
                                <MenuItem value="de">DE</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <IconButton
                        edge="start"
                        sx={{ display: { xs: 'block', sm: 'none' }, color: 'white' }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {mobileMenu}
        </>
    );
};

export default LoginMenuBar;