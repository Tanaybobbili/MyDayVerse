import { useEffect, useState } from 'react';
import './Body.css';

function Body() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="page">
            <p>Hi</p>
            <p className="time">{time.toLocaleString()}</p>
        </div>
    );
}

export default Body;
