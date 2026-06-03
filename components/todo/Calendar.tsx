import { useEffect, useState } from "react";
import { motion } from "motion/react";

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface CalendarDay {
  status: string;
  date: number;
  isToday?: boolean;
}

interface CalendarProps {
  items?: any;
}

export default function Calendar({ items }: CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [curDate, setCurDate] = useState<String>("");

  const setCalendarDays = () => {
    const newDays = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const lastDay = new Date(year, month, lastDate).getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    const today = new Date();

    // Previous month days
    for (let i = firstDay; i > 0; i--) {
      newDays.push({ 
        status: 'inactive', 
        date: prevMonthLastDate - i + 1 
      });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      const isToday = i === today.getDate() && 
                     month === today.getMonth() && 
                     year === today.getFullYear();
      
      newDays.push({ 
        status: isToday ? 'active' : '', 
        date: i,
        isToday 
      });
    }

    // Next month days
    for (let i = lastDay; i < 6; i++) {
      newDays.push({ 
        status: 'inactive', 
        date: i - lastDay + 1 
      });
    }

    setDays(newDays);
    setCurDate(`${MONTHS[month]} ${year}`);
  };

  const handleMonthChange = (change: number) => {
    let newMonth = month + change;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  useEffect(() => {
    setCalendarDays();
  }, [month, year]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
      {/* Calendar Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => handleMonthChange(-1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold">{curDate}</h2>
          <button 
            onClick={() => handleMonthChange(1)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map(({ date, status, isToday }, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-sm
                transition-colors relative
                ${status === 'inactive' ? 'text-gray-400' : 'text-gray-700'}
                ${isToday ? 'bg-primary text-white' : 'hover:bg-gray-100'}
              `}
            >
              <span>{date}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}