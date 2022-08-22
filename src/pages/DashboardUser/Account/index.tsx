import { FC } from 'react';
import LayoutDashboard from '../Layout/index';
import { Row, Col, Divider, Form, Button } from 'antd';

import '../Layout/layoutdashboard.sass'
import { COOKIES, SITE_COOKIES } from 'utils/cookies';
import FloatingLabelInput from 'page-components/FloatingLabelInput';

interface IAccountProps {
}

const Account: FC<IAccountProps> = (props) => {
  return (
    <LayoutDashboard>
      <div className='account'>
        <h3>Detail Akun</h3>
        <h4>Di sini kamu bisa mengatur detail akunmu.</h4>
        <Row className='pt-4 items-start'>
          <Col span={12} className='detail-account flex flex-column'>
            <div className='title'>Email</div>
            <div className='content'>{COOKIES.get(SITE_COOKIES.EMAIL)}</div>
            <div className='title'>
              Nomor Ponsel
              <span className='verified pl-4'>
                Verified
              </span>
            </div>
            <div className='content'>{COOKIES.get(SITE_COOKIES.PHONE)}</div>
            <Divider />
            <div className='settings'>pengaturan akun</div>
          </Col>
          <Col span={12}>
            <Form>
              <FloatingLabelInput
                name='Title'
                label='Title'
                value=''
                onChange={() => {}}
              />
              <FloatingLabelInput
                name='Nama Depan'
                label='Nama Depan'
                value=''
                onChange={() => {}}
              />
              <FloatingLabelInput
                name='Nama Belakang'
                label='Nama Belakang'
                value=''
                onChange={() => {}}
              />
              <FloatingLabelInput
                name='Nomor KTP'
                label='Nomor KTP'
                value=''
                onChange={() => {}}
              />
              <Button className='uppercase flex justify-center button-save float-end'>Simpan</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </LayoutDashboard>
  )
};

export default Account;
