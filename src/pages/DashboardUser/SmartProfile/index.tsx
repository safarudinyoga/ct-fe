import * as React from 'react';
import LayoutDashboard from '../Layout';

import '../Layout/layoutdashboard.sass'

interface ISmartProfileProps {
}

const SmartProfile: React.FunctionComponent<ISmartProfileProps> = (props) => {
  return (
    <LayoutDashboard activeKey='smart-profile'>
      <div class>

      </div>
    </LayoutDashboard>
  );
};

export default SmartProfile;
