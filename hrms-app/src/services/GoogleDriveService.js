// Replace with your Google Drive API credentials and configuration
const DRIVE_API_KEY = 'YOUR_API_KEY';
const FOLDER_ID = 'YOUR_FOLDER_ID'; // Root folder for HRMS files

class GoogleDriveService {
  constructor() {
    this.baseUrl = 'https://www.googleapis.com/drive/v3';
  }

  async initialize() {
    // Load the Google Drive API client library
    await window.gapi.client.init({
      apiKey: DRIVE_API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    });
  }

  // Upload employee documents (e.g., profile pictures, contracts)
  async uploadEmployeeDocument(employeeId, file, type) {
    try {
      const metadata = {
        name: `${employeeId}_${type}_${file.name}`,
        mimeType: file.type,
        parents: [FOLDER_ID],
        appProperties: {
          employeeId: employeeId,
          documentType: type
        }
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      const response = await window.gapi.client.drive.files.create({
        resource: metadata,
        media: {
          mimeType: file.type,
          body: file
        },
        fields: 'id, name, webViewLink'
      });

      return {
        id: response.result.id,
        name: response.result.name,
        url: response.result.webViewLink
      };
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  // Get employee documents
  async getEmployeeDocuments(employeeId) {
    try {
      const response = await window.gapi.client.drive.files.list({
        q: `appProperties has { key='employeeId' and value='${employeeId}' }`,
        fields: 'files(id, name, webViewLink, appProperties)',
        spaces: 'drive'
      });

      return response.result.files.map(file => ({
        id: file.id,
        name: file.name,
        url: file.webViewLink,
        type: file.appProperties.documentType
      }));
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  // Upload attendance photos
  async uploadAttendancePhoto(employeeId, file, timestamp) {
    try {
      const metadata = {
        name: `attendance_${employeeId}_${timestamp}_${file.name}`,
        mimeType: file.type,
        parents: [FOLDER_ID],
        appProperties: {
          employeeId: employeeId,
          type: 'attendance',
          timestamp: timestamp
        }
      };

      const response = await window.gapi.client.drive.files.create({
        resource: metadata,
        media: {
          mimeType: file.type,
          body: file
        },
        fields: 'id, name, webViewLink'
      });

      return {
        id: response.result.id,
        name: response.result.name,
        url: response.result.webViewLink
      };
    } catch (error) {
      console.error('Error uploading attendance photo:', error);
      throw error;
    }
  }

  // Get attendance photos for a specific date range
  async getAttendancePhotos(employeeId, startDate, endDate) {
    try {
      const response = await window.gapi.client.drive.files.list({
        q: `appProperties has { key='employeeId' and value='${employeeId}' } and appProperties has { key='type' and value='attendance' }`,
        fields: 'files(id, name, webViewLink, appProperties)',
        spaces: 'drive'
      });

      return response.result.files
        .filter(file => {
          const photoDate = new Date(file.appProperties.timestamp);
          return (!startDate || photoDate >= new Date(startDate)) &&
                 (!endDate || photoDate <= new Date(endDate));
        })
        .map(file => ({
          id: file.id,
          name: file.name,
          url: file.webViewLink,
          timestamp: file.appProperties.timestamp
        }));
    } catch (error) {
      console.error('Error fetching attendance photos:', error);
      throw error;
    }
  }

  // Delete a file
  async deleteFile(fileId) {
    try {
      await window.gapi.client.drive.files.delete({
        fileId: fileId
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Create folder
  async createFolder(name, parentFolderId = FOLDER_ID) {
    try {
      const metadata = {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId]
      };

      const response = await window.gapi.client.drive.files.create({
        resource: metadata,
        fields: 'id, name'
      });

      return {
        id: response.result.id,
        name: response.result.name
      };
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  }

  // Get file metadata
  async getFileMetadata(fileId) {
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, webViewLink, appProperties'
      });

      return response.result;
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      throw error;
    }
  }
}

export default new GoogleDriveService();
