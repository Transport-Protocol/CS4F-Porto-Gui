import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#005A9C',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    color: '#FFFFFF',
}));

const StyledMenuButton = styled(IconButton)(({ theme }) => ({
    color: '#FFFFFF',
}));

const StyledDesktopMenuButton = styled(Button)(({ theme }) => ({
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
}));

const StyledSelectedLanguage = styled(Typography)(({ theme }) => ({
    textDecoration: 'underline',
    color: '#FFFFFF',
    fontWeight: 'bold',
}));

const StyledLanguageSwitcher = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginLeft: theme.spacing(2),
}));

const StyledDrawerList = styled(Box)(({ theme }) => ({
    width: 250,
    backgroundColor: '#005A9C',
    color: '#FFFFFF',
    height: '100%',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'flex-end',
}));

export {
    StyledAppBar,
    StyledTitle,
    StyledMenuButton,
    StyledDesktopMenuButton,
    StyledSelectedLanguage,
    StyledLanguageSwitcher,
    StyledDrawerList,
    StyledToolbar,
};