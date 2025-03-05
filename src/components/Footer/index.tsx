import React, { useState, useEffect } from 'react';

interface footerProps {
    style?: React.CSSProperties
}

const Footer: React.FC<footerProps> = ({ style, ...props }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer style={style} {...props}>
           <div className='flex flex-row justify-between items-center p-2 bg-gray-100 text-gray-600'>
            <div className=''>
            Created with ❤️ by <a href='https://firmanasgani.id' rel='noopener' target="_blank">Firmanagani</a> 
            </div>
                <div>
                    Date: {date.toLocaleDateString()} Time: {date.toLocaleTimeString()}
                    </div>
          
           </div>
        </footer>
    );
}

export default Footer;