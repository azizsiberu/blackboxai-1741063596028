import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  useTheme,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Notifications as NotificationsIcon,
  PushPin as PushPinIcon
} from '@mui/icons-material';

const AnnouncementsPage = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  // Mock data
  const [announcements] = useState([
    {
      id: '1',
      title: 'Company Holiday Schedule 2024',
      content: 'Please find attached the official holiday schedule for the year 2024. Plan your leaves accordingly.',
      date: '2024-01-22',
      author: 'HR Department',
      priority: 'High',
      pinned: true
    },
    {
      id: '2',
      title: 'New Project Kickoff',
      content: 'We are excited to announce the kickoff of our new project "Project Phoenix". All team members are requested to attend the briefing.',
      date: '2024-01-21',
      author: 'Project Management',
      priority: 'Medium',
      pinned: false
    },
    {
      id: '3',
      title: 'Office Maintenance Notice',
      content: 'The office will undergo maintenance this weekend. Please ensure you take your belongings with you on Friday.',
      date: '2024-01-20',
      author: 'Facilities',
      priority: 'Low',
      pinned: false
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary
          }}
        >
          Announcements
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            borderRadius: theme.shape.borderRadius,
            textTransform: 'none',
            px: 3,
            py: 1,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          New Announcement
        </Button>
      </Box>

      <Grid container spacing={3}>
        {announcements.map((announcement) => (
          <Grid item xs={12} key={announcement.id}>
            <Card
              elevation={0}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'visible'
              }}
            >
              {announcement.pinned && (
                <PushPinIcon 
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 20,
                    color: theme.palette.primary.main,
                    transform: 'rotate(45deg)',
                    fontSize: 24
                  }}
                />
              )}
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {announcement.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 24, 
                            height: 24,
                            bgcolor: theme.palette.primary.main,
                            fontSize: '0.875rem',
                            mr: 1
                          }}
                        >
                          {announcement.author.charAt(0)}
                        </Avatar>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            color: theme.palette.text.secondary
                          }}
                        >
                          {announcement.author}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: theme.palette.text.secondary
                        }}
                      >
                        {announcement.date}
                      </Typography>
                      <Chip
                        size="small"
                        label={announcement.priority}
                        sx={{
                          backgroundColor: `${getPriorityColor(announcement.priority)}15`,
                          color: getPriorityColor(announcement.priority),
                          fontWeight: 500,
                          borderRadius: '16px',
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: theme.palette.primary.main,
                        mr: 1
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: theme.palette.error.main
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body1">
                  {announcement.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* New Announcement Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>New Announcement</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                placeholder="Enter announcement title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={4}
                placeholder="Enter announcement content"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Priority"
                defaultValue=""
                SelectProps={{
                  native: true,
                }}
              >
                <option value="" disabled>Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Button
                  variant="outlined"
                  startIcon={<PushPinIcon />}
                  sx={{
                    textTransform: 'none',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: `${theme.palette.primary.main}10`,
                    },
                  }}
                >
                  Pin Announcement
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              color: theme.palette.text.secondary,
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<NotificationsIcon />}
            sx={{
              textTransform: 'none',
              px: 3,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Post Announcement
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnnouncementsPage;
