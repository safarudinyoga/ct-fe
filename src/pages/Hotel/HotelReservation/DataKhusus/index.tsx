import React, { FC } from 'react';
import './style.scss';
import Form from 'react-bootstrap/Form';

export interface DataSpecialProps {
  bebasAsap: boolean,
  pintuPenghubung: boolean,
  lantaiAtas: boolean,
  lainnya: boolean
}

export interface DataReservationProps {
  specialRequest: string[];
  setSpecialRequest: React.Dispatch<React.SetStateAction<any>>;
  dataSpecial: DataSpecialProps;
  setDataSpecial: React.Dispatch<React.SetStateAction<any>>;
}

const DataReservation: FC<DataReservationProps> = (p) => {

  const handleClickCheckbox = (no: string) => {
    if(no == '1') {
      p?.setDataSpecial({
        ...p?.dataSpecial,
        bebasAsap: !p?.dataSpecial?.bebasAsap
      })
      if(!p?.dataSpecial.bebasAsap) {
        p.specialRequest.push('Kamar Bebas Asap Rokok')
      }
      else {
        let index = p.specialRequest.indexOf('Kamar Bebas Asap Rokok');
        p.specialRequest.splice(index, 1);
      }
    }
    else if(no == '2') {
      p?.setDataSpecial({
        ...p?.dataSpecial,
        pintuPenghubung: !p?.dataSpecial?.pintuPenghubung
      })
      if(!p?.dataSpecial.pintuPenghubung) {
        p.specialRequest.push('Kamar Dengan Pintu Penghubung')
      }
      else {
        let index = p.specialRequest.indexOf('Kamar Dengan Pintu Penghubung');
        p.specialRequest.splice(index, 1);
      }
    }
    else if(no == '3') {
      p?.setDataSpecial({
        ...p?.dataSpecial,
        lantaiAtas: !p?.dataSpecial?.lantaiAtas
      })
      if(!p?.dataSpecial.lantaiAtas) {
        p.specialRequest.push('Lantai Atas')
      }
      else {
        let index = p.specialRequest.indexOf('Lantai Atas');
        p.specialRequest.splice(index, 1);
      }
    }
    else if(no == '4') {
      p?.setDataSpecial({
        ...p?.dataSpecial,
        lainnya: !p?.dataSpecial?.lainnya
      })
      if(!p?.dataSpecial.lainnya) {
        p.specialRequest.push('Lainnya')
      }
      else {
        let index = p.specialRequest.indexOf('Lainnya');
        p.specialRequest.splice(index, 1);
      }
    }
  }
  return (
    <>
      <div className="mt-3 mb-1">
        <span className="text-title purple">Permintaan Khusus</span>
        <div className="mb-2">
          <span>Punya permintaan khusus? tulis disini</span>
        </div>
      </div>
      <div className="card datres-wrapper">
          <Form>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Kamar Bebas Asap Rokok"
                  name="mr"
                  type="checkbox"
                  checked={p?.dataSpecial?.bebasAsap}
                  onClick={()=> handleClickCheckbox('1')}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Kamar Dengan Pintu Penghubung"
                  name="mr"
                  type="checkbox"
                  checked={p?.dataSpecial?.pintuPenghubung}
                  onClick={()=> handleClickCheckbox('2')}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Lantai Atas"
                  name="mr"
                  type="checkbox"
                  checked={p?.dataSpecial?.lantaiAtas}
                  onClick={()=> handleClickCheckbox('3')}
                />
              </div>
              <div className="mb-3">
                <Form.Check
                  inline
                  label="Lainnya"
                  name="mr"
                  type="checkbox"
                  checked={p?.dataSpecial?.lainnya}
                  onClick={()=> handleClickCheckbox('4')}
                />
              </div>
          </Form>
      </div>
    </>
  )
}

export default DataReservation;
