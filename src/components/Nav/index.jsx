import { AppBar, Toolbar, Button, Box, Grid, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageToggle from '../LanguageToggle';
import { useTranslation } from 'react-i18next';
import mechanicImg from '../../assets/images/mechanic-logo5.png';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function Nav() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.contact'), href: '#contact' }
  ];

  return (
    <>
      <AppBar component='nav' position="sticky" style={{ backgroundColor: theme.palette.secondary.main }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '8px' }}>
          <Box
            component="img"
            src={mechanicImg}
            alt="Mechanic Logo"
            sx={{
              height: 75,
              width: 75,
              borderRadius: '25%',
              objectFit: 'cover',
            }}
          />

          {isMobile ? (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'hidden',
              px:1,
            }}>
              <IconButton edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: '#F5F1E6 '}}/>
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center',gap: 2 }}>
              {navItems.map((item) => (
                <Button key={item.href} href={item.href}>
                  {item.label}
                </Button>
              ))}
              <LanguageToggle />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, width: 250, height: '100%' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.href} component="a" href={item.href}>
                <ListItemText primary={item.label} sx={{ textAlign: 'center' }}/>
              </ListItem>
            ))}
            <ListItem sx={{ justifyContent: 'center' }}>
              <LanguageToggle />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
