import { parseISO } from "date-fns/esm";

    export const ConvertsEventsToDate = (events = []) => {
        return events.map(event => {
            event.start = parseISO(event.start);
            event.end = parseISO(event.end);
            return event;
        });
}
