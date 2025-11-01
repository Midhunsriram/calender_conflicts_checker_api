const dateFns = require('date-fns');
const conflictsCheckService = require('./conflictsCheckService');

/**
 * 
 * @param {*} req 
 * Checks for the conflicts and suggests the available time slots.
 * bufferTime is used to define a gap between meetings.
 * Uses conflictsCheckService to check for the conflicts (tempSuggestion acts as a proposed event for that service).
 * @returns 
 * returns the Available timeslots.
 */
function suggestTimeService(req){
    const proposedEvent = req.body.proposedEvent;
    const existingEvents = req.body.existingEvents;
    const bufferTime = req.body.bufferTime? req.body.bufferTime : 15;
    const requestedStartTime = dateFns.parseISO(proposedEvent.start);

    //Hardcoded some values based on the requirements
    const workStart = dateFns.setHours(dateFns.startOfDay(requestedStartTime), 9);
    const workEnd = dateFns.setHours(dateFns.startOfDay(requestedStartTime), 17);
    const maxSuggestions = 3;

    const duration = dateFns.differenceInMinutes(
        dateFns.parseISO(proposedEvent.end),
        dateFns.parseISO(proposedEvent.start)
    );

    const suggestions = [];
    
    for (let start = workStart; start < workEnd; start = dateFns.addMinutes(start, bufferTime)) {
        const end = dateFns.addMinutes(start, duration);
        if (end > workEnd) break;
    
        //Keeps suggestions within the same day
        if (!dateFns.isSameDay(start, requestedStartTime)) continue;
    
        //Creates a temporary suggestion set to check for conflicts.
        //Slice is used to trim the milliseconds to match with input date time format.
        const tempSuggestion = {
          start: start.toISOString().slice(0, 19),
          end: end.toISOString().slice(0, 19),
          participants: proposedEvent.participants
        };
    
        //Calls conflictsCheckService service to check for the conflicts between tempSuggestion and existing events
        const conflict = conflictsCheckService(tempSuggestion, existingEvents, bufferTime);
        if (!conflict) {
          suggestions.push(tempSuggestion);
        }
    
        if (suggestions.length >= maxSuggestions) break;
      }

      return suggestions;
}

module.exports = suggestTimeService;