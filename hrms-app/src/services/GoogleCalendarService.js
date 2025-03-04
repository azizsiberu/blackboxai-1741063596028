// Replace with your Google Calendar API credentials and configuration
const CALENDAR_API_KEY = 'YOUR_API_KEY';
const CALENDAR_ID = 'YOUR_CALENDAR_ID'; // Main company calendar

class GoogleCalendarService {
  constructor() {
    this.baseUrl = 'https://www.googleapis.com/calendar/v3';
  }

  async initialize() {
    // Load the Google Calendar API client library
    await window.gapi.client.init({
      apiKey: CALENDAR_API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    });
  }

  // Create leave event
  async createLeaveEvent(employeeId, employeeName, startDate, endDate, type) {
    try {
      const event = {
        summary: `${employeeName} - ${type}`,
        description: `Leave request for ${employeeName}`,
        start: {
          date: startDate, // Use date for all-day events
        },
        end: {
          date: endDate,
        },
        extendedProperties: {
          private: {
            employeeId: employeeId,
            type: 'leave',
            leaveType: type
          }
        },
        colorId: this.getColorIdForLeaveType(type)
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: event
      });

      return {
        id: response.result.id,
        htmlLink: response.result.htmlLink
      };
    } catch (error) {
      console.error('Error creating leave event:', error);
      throw error;
    }
  }

  // Get color ID based on leave type
  getColorIdForLeaveType(type) {
    const colorMap = {
      'Vacation': '2', // Blue
      'Sick': '4',     // Red
      'Personal': '6',  // Orange
      'Other': '8'     // Gray
    };
    return colorMap[type] || '8';
  }

  // Get employee leave events
  async getEmployeeLeaveEvents(employeeId, timeMin, timeMax) {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        privateExtendedProperty: `employeeId=${employeeId}`,
        singleEvents: true,
        orderBy: 'startTime'
      });

      return response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        start: event.start.date || event.start.dateTime,
        end: event.end.date || event.end.dateTime,
        type: event.extendedProperties.private.leaveType,
        url: event.htmlLink
      }));
    } catch (error) {
      console.error('Error fetching leave events:', error);
      throw error;
    }
  }

  // Create company event
  async createCompanyEvent(event) {
    try {
      const calendarEvent = {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: event.startDateTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: event.endDateTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        location: event.location,
        attendees: event.attendees.map(email => ({ email })),
        extendedProperties: {
          private: {
            type: 'company_event',
            eventType: event.type
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: calendarEvent,
        sendUpdates: 'all'
      });

      return {
        id: response.result.id,
        htmlLink: response.result.htmlLink
      };
    } catch (error) {
      console.error('Error creating company event:', error);
      throw error;
    }
  }

  // Get company events
  async getCompanyEvents(timeMin, timeMax) {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        privateExtendedProperty: 'type=company_event',
        singleEvents: true,
        orderBy: 'startTime'
      });

      return response.result.items.map(event => ({
        id: event.id,
        title: event.summary,
        description: event.description,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        location: event.location,
        attendees: event.attendees?.map(attendee => ({
          email: attendee.email,
          responseStatus: attendee.responseStatus
        })) || [],
        type: event.extendedProperties.private.eventType,
        url: event.htmlLink
      }));
    } catch (error) {
      console.error('Error fetching company events:', error);
      throw error;
    }
  }

  // Update event
  async updateEvent(eventId, updates) {
    try {
      // First get the existing event
      const event = await window.gapi.client.calendar.events.get({
        calendarId: CALENDAR_ID,
        eventId: eventId
      });

      // Merge updates with existing event
      const updatedEvent = {
        ...event.result,
        ...updates
      };

      const response = await window.gapi.client.calendar.events.update({
        calendarId: CALENDAR_ID,
        eventId: eventId,
        resource: updatedEvent,
        sendUpdates: 'all'
      });

      return {
        id: response.result.id,
        htmlLink: response.result.htmlLink
      };
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  // Delete event
  async deleteEvent(eventId) {
    try {
      await window.gapi.client.calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId: eventId,
        sendUpdates: 'all'
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  // Get event details
  async getEventDetails(eventId) {
    try {
      const response = await window.gapi.client.calendar.events.get({
        calendarId: CALENDAR_ID,
        eventId: eventId
      });

      return response.result;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  }
}

export default new GoogleCalendarService();
