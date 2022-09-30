import * as React from 'react';
import LayoutDashboard from '../Layout';

interface ISmartProfileProps {
}

const SmartProfile: React.FunctionComponent<ISmartProfileProps> = (props) => {
  return (
    <LayoutDashboard activeKey='smart-profile'>
      <div></div>
    </LayoutDashboard>
  );
};

export default SmartProfile;
