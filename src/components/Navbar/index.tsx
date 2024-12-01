import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
    style?: React.CSSProperties
}

const Sidebar: React.FC<SidebarProps> = ({ style, ...props }) => {
  const isAdmin = localStorage.getItem('administrator')
  return (
    <aside style={style} {...props}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">WA Notif</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/whatsapp-number" className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              WhatsApp Number
            </Link>
          </li>
          <li>
            <Link to="/message-template" className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              Message Template
            </Link>
          </li>
          <li>
            <Link to="/message-db" className='block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md'>
              Message History from database
            </Link>
          </li>
          <li>
            <Link to="/message" className='block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md'>
              History
            </Link>
          </li>
          <li>
            <Link to="/api-token" className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
              API Token
            </Link>
          </li>
          {isAdmin ? (
            <li>
              <Link to="/message-approval" className="block text-sm font-semibold hover:bg-black hover:text-white hover:rounded-md">
                Message Approval
              </Link>
            </li>
          ) : ''}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

