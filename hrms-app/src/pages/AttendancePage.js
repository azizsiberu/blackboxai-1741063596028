import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip
} from '@mui/material';
import {
  Today as TodayIcon,
  AccessTime as AccessTimeIcon,
  PhotoCamera as PhotoCameraIcon,
  LocationOn as LocationOnIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const AttendancePage = () => {
  const theme = useTheme();
  const [currentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Mock attendance data
  const [attendanceRecords] = useState([
    {
      id: '1',
      date: '2024-01-22',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      status: 'Present',
      location: 'Office',
      photo: true
    },
    {
      id: '2',
      date: '2024-01-21',
      checkIn: '09:15 AM',
      checkOut: '05:30 PM',
      status: 'Present',
      location: 'Remote',
      photo: true
    },
    {
      id: '3',
      date: '2024-01-20',
      checkIn: '-',
      checkOut: '-',
      status: 'Absent',
      location: '-',
      photo: false
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return theme.palette.success.main;
      case 'absent':
        return theme.palette.error.main;
      case 'late':
        return theme.palette.warning.main;
      default:
        return theme.palette.info.main;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 4
        }}
      >
        Attendance
      </Typography>

      <Grid container spacing={3}>
        {/* Current Time & Date Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: theme.shape.borderRadius * 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TodayIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {currentDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {currentTime}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Check In/Out Actions */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: theme.shape.borderRadius * 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<CheckCircleIcon />}
                fullWidth
                sx={{
                  py: 2,
                  backgroundColor: theme.palette.success.main,
                  '&:hover': {
                    backgroundColor: theme.palette.success.dark,
                  },
                }}
              >
                Check In
              </Button>
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                fullWidth
                sx={{
                  py: 2,
                  backgroundColor: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.dark,
                  },
                }}
              >
                Check Out
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Attendance Records */}
        <Grid item xs={12}>
          <TableContainer 
            component={Paper}
            elevation={0}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: theme.shape.borderRadius * 2,
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Check In</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Check Out</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Photo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow 
                    key={record.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      },
                    }}
                  >
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status}
                        size="small"
                        sx={{
                          backgroundColor: `${getStatusColor(record.status)}15`,
                          color: getStatusColor(record.status),
                          fontWeight: 500,
                          borderRadius: '16px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon 
                          fontSize="small" 
                          sx={{ 
                            mr: 0.5,
                            color: theme.palette.text.secondary
                          }} 
                        />
                        {record.location}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {record.photo ? (
                        <IconButton 
                          size="small"
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <PhotoCameraIcon fontSize="small" />
                        </IconButton>
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendancePage;
