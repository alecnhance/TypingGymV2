import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';
import { usePracticeDates } from '../../hooks/usePracticeDates';

const TypingCalendar = ( {className }) => {
  const [date, setDate] = useState(new Date());
  const { loading, dates} = usePracticeDates();

  // Example practice days (replace with actual data later)
  const practiceDays = [
    new Date(2025, 3, 15), // April 15, 2025
    new Date(2025, 3, 20), // April 20, 2025
  ];

  // Function to check if a day is a practiced day
  const isPracticed = (day) => {
    return dates.some(practiceDay => 
      practiceDay.getDate() === day.getDate() &&
      practiceDay.getMonth() === day.getMonth() &&
      practiceDay.getFullYear() === day.getFullYear());
  };

  // Function to style practiced days
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isPracticed(date)) {
      return 'relative text-white [&>abbr]:relative [&>abbr]:z-10 before:content-[""] before:absolute before:bg-orange-500 before:w-6 before:h-6 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-0';
    }
    return '';
  };

  // Handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
    console.log('Selected Date:', newDate);
  };

  return (
    <div className={`${className} bg-headerGray p-6 shadow-lg max-w-full flex flex-col justify-center overflow-auto`}>

      <h2 className="text-lg">Practice Log</h2>
      <div className="grid grid-cols-1 place-items-center w-full">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileClassName={tileClassName}
          className="react-calendar w-full h-full"
        />
      </div>
    </div>
  );
};

export default TypingCalendar;
