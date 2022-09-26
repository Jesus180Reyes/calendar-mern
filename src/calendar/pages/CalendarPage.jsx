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
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks';




export const CalendarPage = () => {
  const { user, } = useAuthStore();
  const { openDateModal } = uiStore();
  const { events, setActiveName, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  useEffect(() => {
    startLoadingEvents();
  }, []);

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
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);


    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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
