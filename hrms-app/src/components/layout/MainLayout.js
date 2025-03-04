import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon,
  Business as BusinessIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Employees', icon: <PeopleIcon />, path: '/employees' },
    { text: 'Attendance', icon: <EventNoteIcon />, path: '/attendance' },
    { text: 'Leave Requests', icon: <AssignmentIcon />, path: '/leave-requests' },
    { text: 'Announcements', icon: <AnnouncementIcon />, path: '/announcements' },
    { text: 'Company Profile', icon: <BusinessIcon />, path: '/company-profile' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
          HRMS
        </Typography>
      </Toolbar>
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: theme.shape.borderRadius,
              '&:hover': {
                backgroundColor: `${theme.palette.primary.main}15`,
              },
              ...(window.location.pathname === item.path && {
                backgroundColor: `${theme.palette.primary.main}15`,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              }),
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: 40,
                color: theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{
            mt: 2,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: `${theme.palette.error.main}15`,
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '0.95rem',
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            {menuItems.find(item => window.location.pathname === item.path)?.text || 'Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
