import * as React from 'react';
import LayoutDashboard from '../Layout';

import '../Layout/layoutdashboard.sass'

interface ISmartProfileProps {
}

const SmartProfile: React.FunctionComponent<ISmartProfileProps> = (props) => {
  return (
    <LayoutDashboard activeKey='smart-profile'>
      <div className='smart_profile'>
        <div className='smart_profile__box_header'>
          <h4 className='title'>Simpan Data Penumpang</h4>
          <div className='search_box'>

          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default SmartProfile;
