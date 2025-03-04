import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  useTheme,
  Avatar,
  IconButton,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Language as WebsiteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const CompanyProfilePage = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  // Mock company data
  const [companyData] = useState({
    name: 'TechCorp Solutions',
    logo: null,
    industry: 'Information Technology',
    phone: '+1 (555) 123-4567',
    email: 'contact@techcorp.com',
    website: 'www.techcorp.com',
    address: '123 Tech Street, Silicon Valley, CA 94025',
    description: 'TechCorp Solutions is a leading provider of innovative technology solutions, specializing in enterprise software development and digital transformation.',
    founded: '2010',
    employees: '250+',
    mission: 'To empower businesses through cutting-edge technology solutions while fostering innovation and sustainable growth.',
    vision: 'To be the global leader in delivering transformative technology solutions that shape the future of digital business.'
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Implement save functionality
  };

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
          Company Profile
        </Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
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
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{
                borderRadius: theme.shape.borderRadius,
                textTransform: 'none',
                px: 3,
                py: 1,
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: `${theme.palette.error.main}10`,
                  borderColor: theme.palette.error.dark,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                borderRadius: theme.shape.borderRadius,
                textTransform: 'none',
                px: 3,
                py: 1,
                backgroundColor: theme.palette.success.main,
                '&:hover': {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2.5rem',
                  mr: 3
                }}
              >
                {companyData.name.charAt(0)}
              </Avatar>
              <Box>
                <TextField
                  fullWidth
                  label="Company Name"
                  defaultValue={companyData.name}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  label="Industry"
                  defaultValue={companyData.industry}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                />
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Phone"
                    defaultValue={companyData.phone}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue={companyData.email}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WebsiteIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Website"
                    defaultValue={companyData.website}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Address"
                    defaultValue={companyData.address}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Company Details */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Company Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue={companyData.description}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Founded"
                  defaultValue={companyData.founded}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Number of Employees"
                  defaultValue={companyData.employees}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mission"
                  multiline
                  rows={3}
                  defaultValue={companyData.mission}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Vision"
                  multiline
                  rows={3}
                  defaultValue={companyData.vision}
                  disabled={!isEditing}
                  variant={isEditing ? "outlined" : "standard"}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyProfilePage;
