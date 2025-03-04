import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Assignment as AssignmentIcon,
  Announcement as AnnouncementIcon
} from '@mui/icons-material';

const DashboardCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: color,
      color: 'white'
    }}
  >
    <Box>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </Box>
    <Box sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
      {icon}
    </Box>
  </Paper>
);

const DashboardPage = () => {
  // Mock data - replace with actual data from your services
  const dashboardData = {
    totalEmployees: 25,
    presentToday: 22,
    pendingLeaves: 3,
    announcements: 2
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Employees"
            value={dashboardData.totalEmployees}
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Present Today"
            value={dashboardData.presentToday}
            icon={<EventNoteIcon sx={{ fontSize: 40 }} />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Pending Leaves"
            value={dashboardData.pendingLeaves}
            icon={<AssignmentIcon sx={{ fontSize: 40 }} />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Announcements"
            value={dashboardData.announcements}
            icon={<AnnouncementIcon sx={{ fontSize: 40 }} />}
            color="#f44336"
          />
        </Grid>
        
        {/* Add more dashboard content here */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary">
              No recent activities to display.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
