import React from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD_PAGE, MESSAGE_LOGS, MESSAGE_TEMPLATE_PAGE, WHATSAPP_NUMBER_PAGE } from '../../utils/variables/urlPath';

interface SidebarProps {
    style?: React.CSSProperties
}

const Sidebar: React.FC<SidebarProps> = ({ style, ...props }) => {
  return (
    <aside style={style} {...props}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">WA Notif</h1>
        <ul className="space-y-4">
          <li>
            <Link to={DASHBOARD_PAGE} className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={WHATSAPP_NUMBER_PAGE} className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              WhatsApp Number
            </Link>
          </li>
          <li>
            <Link to={MESSAGE_TEMPLATE_PAGE} className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              Message Template
            </Link>
          </li>
          <li>
            <Link to={MESSAGE_LOGS} className='block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md'>
              Message History 
            </Link>
          </li>
         
          <li>
            <Link to="/api-token" className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              API Token
            </Link>
          </li>
       
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

