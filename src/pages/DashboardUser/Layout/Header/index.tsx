import { FC, isValidElement } from 'react';
import { Menu, Dropdown } from "antd";

// components & styles
import Logo from "shared/Logo/Logo";
import LangDropdown from "components/Header/LangDropdown";
import CurrencyDropdown from "components/Header/CurrencyDropdown";
import './headerdashboard.sass'
import { COOKIES, SITE_COOKIES } from '../../../../utils/cookies';
import { signOut } from "services/firebase";

interface IHeaderDashboardProps {
}

const HeaderDashboard: FC<IHeaderDashboardProps> = (props) => {

  const top_layer_items_first = [
    {
      name: 'Daftarkan Hotel Anda',
      link: '',
    },
    {
      name: 'Promo',
      link: ''
    },
    {
      name: 'Pusat Bantuan',
      link: ''
    },
  ]

  const bottom_layer_items_first = [
    {
      name: 'Pesawat',
      link: '',
    },
    {
      name: 'Hotel',
      link: '',
    },
    {
      name: 'To Do',
      link: '',
    },
    {
      name: 'Kereta Api',
      link: '',
    },
    {
      name: 'Sewa Mobil',
      link: '',
    },
    {
      name: 'Event',
      link: '',
    },
  ]

  const menu = (
    <Menu items={[
      {
        key: 'summary_profile',
        label: (
          <div className="dashboard_profile">
            <div className="rounded-profile-dashboard">
              {COOKIES.get(SITE_COOKIES.NAME)}
            </div>
            <h3>safarudin yoga</h3>
          </div>
        )
      },
      {
        type: 'divider',
      },
      {
        key: 'orders',
        label: (
          <a href="/dashboard/my-order">Your Orders</a>
        )
      },
      {
        key: 'smart_profile',
        label: 'Smart Profile'
      },
      {
        key: 'smart_pay',
        label: 'Smart Pay'
      },
      {
        key: 'refund',
        label: 'Daftar Refund'
      },
      {
        key: 'reviews',
        label: 'My Reviews'
      },
      {
        key: 'settings',
        label: 'Pengaturan'
      },
      {
        key: 'logout',
        label: <a onClick={signOut}>Keluar</a>
      },
    ]}>
    </Menu>
  )

  const bottom_layer_items_second = [
    {
      name: 'Elite Rewards',
      link: '',
    },
    {
      name: 'My Order',
      link: '',
    },
    {
      name: 'Inbox',
      link: '',
    },
    {
      name: (
        <Dropdown overlay={menu} trigger={["click"]} placement='bottomRight' overlayClassName="menus">
          <a style={{ marginLeft: 20 }} className="ant-dropdown-link" href="#">
            <div className="rounded-profile">
              {COOKIES.get(SITE_COOKIES.NAME)}
            </div>
          </a>
        </Dropdown>
      ),
      link: '',
    },
  ]

  return (
    <div className='headerContainer'>
      <div className='headerContainer_top_layer'>
        <div className='flex justify-between container pt-2 pb-2'>
          <div className='flex justify-center items-center'>
            {top_layer_items_first.map(({ name, link }, i): any =>
              <div className='pr-2 pl-2' key={i}><a href={link}>{name}</a></div>
            )}
          </div>
          <div className='flex justify-center items-center'>
            <LangDropdown />
            <CurrencyDropdown />
          </div>
        </div>
      </div>
      <div className='headerContainer_bottom_layer'>
        <div className='flex justify-between container pt-4 pb-4'>
          <div className='flex items-center'>
            <Logo />
            {bottom_layer_items_first.map(({ name, link }, i): any =>
              <div className='pr-3 pl-3' key={i}><a href={link}>{name}</a></div>
            )}
          </div>
          <div className='flex items-center'>
            {bottom_layer_items_second.map(({ name, link }, i): any =>
              isValidElement(name) ? name : (
                <div className='pr-2 pl-2 min-w-fit' key={i}><a href={link}>{name}</a></div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboard;
