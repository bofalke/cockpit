import React, {useState} from 'react';
import {
    AppBar,
    Hidden,
    IconButton,
    Menu,
    MenuItem,
    Toolbar as MuiToolbar,
    Typography,
    makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import UpdateIcon from '@material-ui/icons/Update';
import CodeIcon from '@material-ui/icons/Code';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSystemSchema} from '../action/systemSchemaCommands';
import SettingsDialog from './SettingsDialog';
import {copyToClipboard} from '../util/copyToClipboard';
import {v4 as uuidv4} from 'uuid';
import {themeSwitched} from '../action/settingsEvents';
import {makeThemeSelector} from '../selector/settingsSelector';

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
        backgroundColor: (theme.palette.background as any).topBar,
        height: '64px',
    },
    icon: {
        color: 'white',
    },
    flexGrow: {
        flexGrow: 1,
    },
    headerText: {
        color: theme.palette.primary.main,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

interface TopBarProps {
    onOpenSideBar: () => void;
}

const TopBar = (props: TopBarProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useSelector(makeThemeSelector());
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [generateAnchorElement, setGenerateAnchorElement] = useState(null);

    const handleGenerateButtonClick = (event: React.MouseEvent<any>) => {
        setGenerateAnchorElement(event.currentTarget);
    };

    const closeGenerateMenu = () => {
        setGenerateAnchorElement(null);
    };

    const handleRefresh = () => {
        dispatch(fetchSystemSchema({}));
    };

    const openSettingsDialog = () => {
        setSettingsOpen(true) ;
    };

    const closeSettingsDialog = () => {
        setSettingsOpen(false);
    };

    const toggleTheme = () => {
        dispatch(themeSwitched({ theme: (theme === 'dark' ? 'light' : 'dark') }));
    };

    return (
        <AppBar position={'fixed'} color={'default'} className={classes.root}>
            <MuiToolbar>
                <Typography variant={'h1'} className={classes.headerText}>Event Engine UI</Typography>
                <div className={classes.flexGrow} />
                <IconButton className={classes.icon} title={'Generate ...'} onClick={handleGenerateButtonClick}>
                    <CodeIcon />
                </IconButton>
                <IconButton className={classes.icon} title={'Refresh Schema'} onClick={handleRefresh}>
                    <UpdateIcon />
                </IconButton>
                <IconButton className={classes.icon} title={'Settings'} onClick={openSettingsDialog}>
                    <SettingsIcon />
                </IconButton>
                <IconButton className={classes.icon} title={'Toggle Theme'} onClick={toggleTheme}>
                    {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                <Hidden lgUp={true}>
                    <IconButton onClick={props.onOpenSideBar} className={classes.icon}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                {settingsOpen && <SettingsDialog open={settingsOpen} onClose={closeSettingsDialog} />}

                <Menu
                    anchorEl={generateAnchorElement}
                    keepMounted={true}
                    open={Boolean(generateAnchorElement)}
                    onClose={closeGenerateMenu}
                    style={{ top: '40px' }}
                >
                    <MenuItem
                        onClick={() => {
                            window.setTimeout(() => copyToClipboard(uuidv4()), 200);
                            closeGenerateMenu();
                        }}
                        children={'UUID v4'}
                    />
                </Menu>
            </MuiToolbar>
        </AppBar>
    );
};

export default TopBar;
