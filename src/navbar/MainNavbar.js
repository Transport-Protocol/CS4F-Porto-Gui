import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import for the logout icon
import { AuthContext } from '../login/AuthContext'; // Importiere den AuthContext
import { LanguageContext } from '../context/LanguageContext'; // Importiere den LanguageContext


const translations = {
    en: {
        dashboard: 'Dashboard',
        transactions: 'Transactions',
        cs4f_certificates: 'Certificates',
        overview: 'Overview',
        details: 'Details',
        newTransaction: 'New Transaction',
        history: 'History',
        viewCertificates: 'View Certificates',
        requestNew: 'Request New',
        logout: 'Logout',  // New Translation for Logout
    },
    de: {
        dashboard: 'Dashboard',
        transactions: 'Transaktionen',
        cs4f_certificates: 'Zertifikate',
        overview: 'Übersicht',
        details: 'Details',
        newTransaction: 'Neue Transaktion',
        history: 'Verlauf',
        viewCertificates: 'Zertifikate anzeigen',
        requestNew: 'Neues anfordern',
        logout: 'Abmelden',  // New Translation for Logout
    },
};

const MenuBar = ({ userRole }) => {
    const { logout } = useContext(AuthContext);  // Hole die logout-Funktion aus dem Kontext
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { language, setLanguage } = useContext(LanguageContext); // Verwende den LanguageContext

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [openDashboard, setOpenDashboard] = useState(false);
    const [openTransactions, setOpenTransactions] = useState(false);
    const [openCertificates, setOpenCertificates] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuClick = (event, menuName) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(menuName);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenu(null);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleToggleDashboard = () => {
        setOpenDashboard(!openDashboard);
    };

    const handleToggleTransactions = () => {
        setOpenTransactions(!openTransactions);
    };

    const handleToggleCertificates = () => {
        setOpenCertificates(!openCertificates);
    };

    const handleLogout = () => {
        // Implement logout logic here
        logout();  // Rufe die logout-Funktion auf, um den Benutzer abzumelden
        console.log('User logged out');
        navigate('/login');
    };

    const t = translations[language];

    const renderMenu = (menuName, items) => (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && openMenu === menuName}
            onClose={handleMenuClose}
            MenuListProps={{
                onMouseLeave: handleMenuClose,
            }}
        >
            {items.map((item, index) => (
                <MenuItem key={index} onClick={handleMenuClose}>
                    {item}
                </MenuItem>
            ))}
        </Menu>
    );

    const handleMouseOver = (event, menuName) => {
        if (openMenu !== menuName) {
            handleMenuClick(event, menuName);
        }
    };

    const mobileMenu = (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            <List sx={{ width: 250, backgroundColor: '#005A9C', color: '#FFFFFF', height: '100%' }}>
                <ListItem component="button" onClick={handleToggleDashboard}>
                    <ListItemText primary={t.dashboard} />
                    {openDashboard ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openDashboard} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component="button" sx={{ pl: 4 }}>
                            <ListItemText primary={t.overview} />
                        </ListItem>
                        <ListItem component="button" sx={{ pl: 4 }}>
                            <ListItemText primary={t.details} />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem component="button" onClick={handleToggleTransactions}>
                    <ListItemText primary={t.transactions} />
                    {openTransactions ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openTransactions} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component="button" sx={{ pl: 4 }}>
                            <ListItemText primary={t.newTransaction} />
                        </ListItem>
                        <ListItem component="button" sx={{ pl: 4 }}>
                            <ListItemText primary={t.history} />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem component="button" onClick={handleToggleCertificates}>
                    <ListItemText primary={t.certificates} />
                    {openCertificates ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCertificates} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem component="button" sx={{ pl: 4 }}>
                            <ListItemText primary={t.viewCertificates} />
                        </ListItem>
                        <ListItem component="button" sx={{ pl: 4 }}>
                            <ListItemText primary={t.requestNew} />
                        </ListItem>
                    </List>
                </Collapse>

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

                <Divider />
                <ListItem component="button" onClick={handleLogout}>
                    <ExitToAppIcon sx={{ color: 'white', marginRight: 1 }} />
                    <ListItemText primary={t.logout} />
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
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'flex' },
                            justifyContent: 'flex-start',
                            borderLeft: '1px solid white',
                            paddingLeft: 2,
                            marginLeft: 2,
                        }}
                    >
                        {userRole === 'admin' && (
                            <>
                                <Button
                                    sx={{ color: 'white', fontWeight: 'bold', marginRight: 2 }}
                                    onMouseOver={(event) => handleMouseOver(event, 'dashboard')}
                                >
                                    {t.dashboard}
                                </Button>
                                {renderMenu('dashboard', [t.overview, t.details])}

                                <Button
                                    sx={{ color: 'white', fontWeight: 'bold', marginRight: 2 }}
                                    onMouseOver={(event) => handleMouseOver(event, 'transactions')}
                                >
                                    {t.transactions}
                                </Button>
                                {renderMenu('transactions', [t.newTransaction, t.history])}

                                <Button
                                    sx={{ color: 'white', fontWeight: 'bold', marginRight: 2 }}
                                    onMouseOver={(event) => handleMouseOver(event, 'certificates')}
                                >
                                    <span>{t.cs4f_certificates}</span>
                                </Button>

                                {renderMenu('certificates', [t.viewCertificates, t.requestNew])}
                            </>
                        )}
                        <Button
                            sx={{ color: 'white', fontWeight: 'bold', marginLeft: 'auto' }}
                            onClick={handleLogout}
                            startIcon={<ExitToAppIcon />}
                        >
                            {/*{t.logout}*/}
                        </Button>
                    </Box>
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

export default MenuBar;
