import { FC, ReactNode, createElement, MouseEventHandler, ReactEventHandler } from 'react';
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
    )
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
    link: ''
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Smart Profile',
    link: ''
  },
  {
    icon: LaptopOutlined,
    label: 'Smart Pay',
    link: ''
  },
  {
    icon: LaptopOutlined,
    label: 'Daftar Refund',
    link: ''
  },
  {
    icon: LaptopOutlined,
    label: 'My Review',
    link: ''
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Loyalty Program',
    link: ''
  },
  {
    icon: LaptopOutlined,
    label: 'Pengaturan',
    link: ''
  },
  {
    icon: LaptopOutlined,
    label: 'Pusat Bantuan',
    link: ''
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Keluar',
    link: ''
  },
]

const listMenu: MenuProps['items'] = sidebarItem.map(
  (item, index) => {
    const key = String(index + 1);

    if (item.icon === undefined) return item

    return {
      key: item.link || key,
      icon: createElement(item.icon),
      label: item.label,
    };
  },
);

const LayoutDashboard: FC<ILayoutDashboardProps> = ({ children }) => {
  const history = useHistory()

  const handleClick = (e: IButtonProps) => {
    const { key } = e

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
