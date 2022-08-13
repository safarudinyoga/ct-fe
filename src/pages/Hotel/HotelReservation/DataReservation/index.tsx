import React, { FC } from 'react';
import './style.scss';
import { Form } from 'react-bootstrap';

export interface IsRadioProps {
  mr: boolean,
  mrs: boolean
}

export interface DataProps {
  name: string,
  hp: string,
  email: string
}

export interface SalutationErrProps {
  isFilled?: string
}

export interface DataReservationProps {
  title?: string,
  state?: string,
  salutation?: string,
  isRadio?: IsRadioProps,
  data?: DataProps,
  setSalutation: React.Dispatch<React.SetStateAction<any>>;
  setIsRadio: React.Dispatch<React.SetStateAction<any>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
  salutationErr?: SalutationErrProps
}

const DataReservation: FC<DataReservationProps> = (p) => {
  return (
    <>
      <div className="mt-3 mb-1">
        <span className="text-title purple">{p.title}</span>
        { p.state == 'guest' ?
          (
            <div className="row mb-2">
              <div className="col">
              <span>Sama dengan pemesan?</span>
              </div>
              <div className="col d-flex justify-content-end">
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                />
              </div>
            </div>
          ) : ( null )
        }
      </div>
      <div className="card datres-wrapper">
          <Form>
              <div className="mb-3">
                  <Form.Check
                    inline
                    label="Mr"
                    name="mr"
                    type="radio"
                    onClick={()=> {
                      p.setSalutation('Mr')
                      p.setIsRadio({
                        ...p?.isRadio,
                        mr: true,
                        mrs: false
                      })
                    }}
                    checked={p?.isRadio?.mr}
                  />
                  <Form.Check
                    inline
                    label="Mrs"
                    name="mrs"
                    type="radio"
                    onClick={()=> {
                      p.setSalutation('Mrs')
                      p.setIsRadio({
                        ...p?.isRadio,
                        mr: false,
                        mrs: true
                      })
                    }}
                    checked={p?.isRadio?.mrs}
                  />
              </div>
          </Form>

          <Form>
            <div className="mb-3">
              <span>Nama Pemesan</span>
              <div className="mt-1">
                <input 
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                  type="text" 
                  placeholder="Masukkan nama pemesan"
                  value={p?.data?.name}
                  onChange={(e)=> p.setData({
                    ...p.data,
                    name: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="mb-3">
              <span>No Handphone</span>
              <div className="mt-1">
                <input 
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                  type="number" 
                  placeholder="Masukkan no handphone"
                  value={p?.data?.hp}
                  onChange={(e)=> p.setData({
                    ...p.data,
                    hp: e.target.value
                  })}
                />
              </div>
            </div>
            <div className="mb-3">
              <span>Email</span>
              <div className="mt-1">
              <input 
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                type="text" 
                placeholder="Masukkan email"
                value={p?.data?.email}
                onChange={(e)=> p.setData({
                  ...p.data,
                  email: e.target.value
                })}
              />
              </div>
            </div>
          </Form>
      </div>
    </>
  )
}

export default DataReservation;
