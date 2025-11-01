const {parseISO, addMinutes} = require('date-fns');

/**
 * 
 * @param {*} proposedEvent 
 * @param {*} existingEvents 
 * @param {*} bufferTime 
 * Function compares the proposed event with existing event to check for conflicts between the given timeframe.
 * @returns 
 * Returns a boolean.
 * If there is a conflict between proposed and existing events, returns true.
 * For no conflicts it returns false.
 */
function conflictsCheckService(proposedEvent, existingEvents, bufferTime){
    let conflict;

    for (const i of existingEvents){
        const proposedEventStart = addMinutes(parseISO(proposedEvent.start), -bufferTime);
        const proposedEventEnd = addMinutes(parseISO(proposedEvent.end), bufferTime);
        const existingEventStart = parseISO(i.start);
        const existingEventEnd = parseISO(i.end);

        if(proposedEventStart < existingEventEnd && proposedEventEnd > existingEventStart){
            conflict = true;
        }
    }
    return conflict;
}

module.exports = conflictsCheckService;