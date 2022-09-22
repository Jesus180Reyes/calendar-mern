import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from "../components/Navbar"
import { addHours } from 'date-fns'
import { localizer, getMessagesEs } from '../../helpers';
import { CalendarEvent } from '../components/CalendarEvent';
import { useState } from 'react';
import { CalendarModa } from '../components/CalendarModa';
import { uiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabButton } from '../components/FabButton';
import { FabDelete } from '../components/FabDelete';




export const CalendarPage = () => {
  const { openDateModal } = uiStore();
  const { events, setActiveName } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const onDoubleClick = (event) => {
    // console.log({ doubleClick: event });
    openDateModal();
  }
  const onSelect = (event) => {
    // console.log({ click: event })
    openDateModal(true);
    setActiveName(event);
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    return {
      style
    }


  }
  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={
          {
            event: CalendarEvent
          }
        }
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

      />

      <CalendarModa></CalendarModa>
      <FabButton />
      <FabDelete />

    </>
  )
}
