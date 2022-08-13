import { FC, ReactNode, createElement } from 'react';
import Footer from 'shared/Footer/Footer';
import HeaderDashboard from './Header'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import './layoutdashboard.sass'

const { Content, Sider } = Layout;

interface ILayoutDashboardProps {
  children: ReactNode
}

interface SidebarType {
  icon?: any
  label?: string,
  type?: any
}

const sidebarItem: SidebarType[] = [
  {
    icon: UserOutlined,
    label: 'Ini Account Space'
  },
  {
    icon: LaptopOutlined,
    label: 'Akun'
  },
  {
    icon: LaptopOutlined,
    label: 'My Order'
  },
  {
    icon: LaptopOutlined,
    label: 'Elite Rewards'
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Smart Profile'
  },
  {
    icon: LaptopOutlined,
    label: 'Smart Pay'
  },
  {
    icon: LaptopOutlined,
    label: 'Daftar Refund'
  },
  {
    icon: LaptopOutlined,
    label: 'My Review'
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Loyalty Program'
  },
  {
    icon: LaptopOutlined,
    label: 'Pengaturan'
  },
  {
    icon: LaptopOutlined,
    label: 'Pusat Bantuan'
  },
  {
    type: 'divider'
  },
  {
    icon: LaptopOutlined,
    label: 'Keluar'
  },
]

const items2: MenuProps['items'] = sidebarItem.map(
  (item, index) => {
    const key = String(index + 1);

    if (item.icon === undefined) return item

    return {
      key: `sub${key}`,
      icon: createElement(item.icon),
      label: item.label,
    };
  },
);

const LayoutDashboard: FC<ILayoutDashboardProps> = ({ children }) => {
  return (
    <>
      <HeaderDashboard  />
      <Layout className='p-14 layout-dashboard'>
        <section className='container flex'>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
              className='sidebar'
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>{children}</Content>
        </section>
      </Layout>
      <Footer />
    </>
  );
};

export default LayoutDashboard;
