import React from 'react'

interface footerProps {
    style?: React.CSSProperties
}


const Footer: React.FC<footerProps> = ({ style, ...props }) => {
    return (
        <footer style={style} {...props}>
            Created with ❤️ by <a href='https://firmanasgani.id' target="_blank">Firmanagani</a>
        </footer>
    );
}

export default Footer;
