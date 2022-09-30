import { FC, ReactNode, createElement, useState } from 'react';
import Footer from 'shared/Footer/Footer';
import HeaderDashboard from './Header'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import './layoutdashboard.sass'
import { COOKIES, SITE_COOKIES } from '../../../utils/cookies';
import { useHistory } from 'react-router-dom';

const { Content, Sider } = Layout;

interface ILayoutDashboardProps {
  children: ReactNode
  activeKey: string
}

interface SidebarType {
  icon?: any
  label?: string | ReactNode
  type?: any
  link?: string
}

interface IButtonProps {
  key: string
  // domEvent?: ReactEventHandler<HTMLButtonElement>
  // keyPath?: any
}

const sidebarItem: SidebarType[] = [
  {
    label: (
      <div className='profile'>
        <h4 className='profile_name'>{COOKIES.get(SITE_COOKIES.FULLNAME)}</h4>
        <h4 className='verified'>Verified</h4>
      </div>
    ),
  },
  {
    icon: LaptopOutlined,
    label: 'Akun',
    link: 'my-account'
  },
  {
    icon: LaptopOutlined,
    label: 'My Order',
    link: 'my-order'
  },
  {
    icon: LaptopOutlined,
    label: 'Elite Rewards',
    link: 'elite-rewards'
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Smart Profile',
    link: 'smart-profile'
  },
  {
    icon: LaptopOutlined,
    label: 'Smart Pay',
    link: 'smart-pay'
  },
  {
    icon: LaptopOutlined,
    label: 'Daftar Refund',
    link: 'daftar-refund'
  },
  {
    icon: LaptopOutlined,
    label: 'My Review',
    link: 'my-review'
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Loyalty Program',
    link: 'loyalty-program'
  },
  {
    icon: LaptopOutlined,
    label: 'Pengaturan',
    link: 'pengaturan'
  },
  {
    icon: LaptopOutlined,
    label: 'Pusat Bantuan',
    link: 'pusat-bantuan'
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Keluar',
    link: 'keluar'
  },
]

const listMenu: MenuProps['items'] = sidebarItem.map(
  (item, index) => {
    const key = String(index + 1);

    if (item.icon === undefined) return item

    return {
      key: item.link || key,
      // key: item.link,
      icon: createElement(item.icon),
      label: item.label,
    };
  },
);

const LayoutDashboard: FC<ILayoutDashboardProps> = ({ children, activeKey }) => {
  const history = useHistory()

  const handleClick = (e: IButtonProps) => {
    const { key } = e
    console.log(key);

    history.push(`/dashboard/${key}`)
  }

  return (
    <>
      <HeaderDashboard  />
      <Layout className='p-14 layout-dashboard'>
        <section className='container flex items-start'>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={listMenu}
              className='sidebar'
              onClick={handleClick}
              activeKey={activeKey}
            />
          </Sider>
          <Content>{children}</Content>
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default LayoutDashboard;
