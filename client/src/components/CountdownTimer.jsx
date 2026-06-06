import { useState, useEffect } from 'react';

// Future: accept target time from API (flash sale end time)
function CountdownTimer({ initialHours = 13, initialMins = 34, initialSecs = 56 }) {
  const [time, setTime] = useState({
    days: 4,
    hours: initialHours,
    mins: initialMins,
    secs: initialSecs,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = n => String(n).padStart(2, '0');

  return (
    <div className="countdown">
      {[['Days', time.days], ['Hour', time.hours], ['Min', time.mins], ['Sec', time.secs]].map(([label, val]) => (
        <div key={label} className="countdown__block">
          <span className="countdown__num">{pad(val)}</span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default CountdownTimer;