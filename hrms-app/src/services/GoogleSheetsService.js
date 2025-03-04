// Replace with your Google Sheets API credentials and configuration
const SHEETS_API_KEY = 'YOUR_API_KEY';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

class GoogleSheetsService {
  constructor() {
    this.baseUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;
  }

  async initialize() {
    // Load the Google Sheets API client library
    await window.gapi.client.init({
      apiKey: SHEETS_API_KEY,
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    });
  }

  async getEmployees() {
    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Employees!A2:F', // Adjust range based on your sheet structure
      });

      const rows = response.result.values || [];
      return rows.map(row => ({
        id: row[0],
        name: row[1],
        email: row[2],
        position: row[3],
        department: row[4],
        status: row[5]
      }));
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  async addEmployee(employee) {
    try {
      await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Employees!A2:F',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [[
            employee.id,
            employee.name,
            employee.email,
            employee.position,
            employee.department,
            employee.status
          ]]
        }
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }

  async updateEmployee(employee) {
    try {
      // Find the row for this employee
      const employees = await this.getEmployees();
      const rowIndex = employees.findIndex(e => e.id === employee.id) + 2; // +2 because sheet is 1-based and we have header row

      await window.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Employees!A${rowIndex}:F${rowIndex}`,
        valueInputOption: 'RAW',
        resource: {
          values: [[
            employee.id,
            employee.name,
            employee.email,
            employee.position,
            employee.department,
            employee.status
          ]]
        }
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }

  async deleteEmployee(employeeId) {
    try {
      // Find the row for this employee
      const employees = await this.getEmployees();
      const rowIndex = employees.findIndex(e => e.id === employeeId) + 2;

      await window.gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: {
          requests: [{
            deleteDimension: {
              range: {
                sheetId: 0, // Assuming Employees is the first sheet
                dimension: 'ROWS',
                startIndex: rowIndex - 1,
                endIndex: rowIndex
              }
            }
          }]
        }
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }

  // Attendance tracking methods
  async recordAttendance(employeeId, type, timestamp, location) {
    try {
      await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Attendance!A2:E',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [[
            employeeId,
            type, // 'CHECK_IN' or 'CHECK_OUT'
            timestamp,
            location,
            new Date().toISOString()
          ]]
        }
      });
    } catch (error) {
      console.error('Error recording attendance:', error);
      throw error;
    }
  }

  async getAttendanceRecords(employeeId, startDate, endDate) {
    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Attendance!A2:E',
      });

      const rows = response.result.values || [];
      return rows
        .filter(row => {
          const recordDate = new Date(row[4]);
          return (!employeeId || row[0] === employeeId) &&
                 (!startDate || recordDate >= new Date(startDate)) &&
                 (!endDate || recordDate <= new Date(endDate));
        })
        .map(row => ({
          employeeId: row[0],
          type: row[1],
          timestamp: row[2],
          location: row[3],
          recordedAt: row[4]
        }));
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    }
  }

  // Leave management methods
  async submitLeaveRequest(request) {
    try {
      await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'LeaveRequests!A2:H',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: [[
            request.id,
            request.employeeId,
            request.type,
            request.startDate,
            request.endDate,
            request.reason,
            request.status,
            new Date().toISOString()
          ]]
        }
      });
    } catch (error) {
      console.error('Error submitting leave request:', error);
      throw error;
    }
  }

  async updateLeaveRequest(requestId, status) {
    try {
      const requests = await this.getLeaveRequests();
      const rowIndex = requests.findIndex(r => r.id === requestId) + 2;

      await window.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `LeaveRequests!G${rowIndex}`,
        valueInputOption: 'RAW',
        resource: {
          values: [[status]]
        }
      });
    } catch (error) {
      console.error('Error updating leave request:', error);
      throw error;
    }
  }

  async getLeaveRequests(employeeId = null) {
    try {
      const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'LeaveRequests!A2:H',
      });

      const rows = response.result.values || [];
      return rows
        .filter(row => !employeeId || row[1] === employeeId)
        .map(row => ({
          id: row[0],
          employeeId: row[1],
          type: row[2],
          startDate: row[3],
          endDate: row[4],
          reason: row[5],
          status: row[6],
          submittedAt: row[7]
        }));
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    }
  }
}

export default new GoogleSheetsService();
