import { FC } from 'react';
import { Button, Divider, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LayoutDashboard from '../Layout/index';

interface IMyOrderProps {
}

const MyOrder: FC<IMyOrderProps> = (props) => {

  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );

  const menuSort = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );

  return (
    <LayoutDashboard activeKey='my-order'>
      <div className='my-order'>
        <div className='my-order_header'>
          <div className='first_content flex justify-between'>
            <h2>My Order</h2>
            <div className='riwayat'>
              Riwayat Pesanan
            </div>
          </div>
          <Divider />
          <div className='second_content'>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              Filter
              <DownOutlined />
            </a>
          </Dropdown>
          <div className='filter-group flex items-center'>
            <p>Urutkan</p>
            <Dropdown overlay={menuSort} trigger={['click']}>
              <a onClick={e => e.preventDefault()}>
                Baru Saja Dibeli
                <DownOutlined />
              </a>
            </Dropdown>
            <Button>RESET</Button>
          </div>
          </div>
        </div>
        <div className='my-order_content'>
          <h4 className='title'>Ayo Jalan Jalan</h4>
          <h4 className='caption'>Setelah memesan perjalanan, kamu bisa mengatur pesanan dan melihat E-tiketmu di sini.</h4>
          <div className='button-area'>
            <Button className='yellow'>pesan perjalanan</Button>
            <Button className='grey'>lihat riwayat pesanan</Button>
          </div>
        </div>
        <div className='my-order_content_order_not_found'>
          <div className='header'><h2>Pesananmu tidak ada?</h2></div>
          <div className='wrapper_content'>
            <div className='card_content'>
              <img src="https://www.tiket.com/myorder/assets/3e3f2a7e.svg" alt="?" className='' />
              <div className='text'>
                <h2 className='title'>Pusat Bantuan</h2>
                <h4 className='desc'>Temukan solusi dari masalahmu dengan mudah.</h4>
              </div>
            </div>
            <div className='card_content'>
              <img src="https://www.tiket.com/myorder/assets/164afc7d.svg" alt="?" className='' />
              <div className='text'>
                <h2 className='title'>Hubungi Customer Care</h2>
                <h4 className='desc'>Customer Care kami 24/7 selalu ada untukmu.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};

export default MyOrder;
