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

export interface DataGuestProps {
  title?: string,
  state?: string,
  salutationGuest?: string,
  isRadioGuest?: IsRadioProps,
  dataGuest?: DataProps,
  setSalutationGuest: React.Dispatch<React.SetStateAction<any>>;
  setIsRadioGuest: React.Dispatch<React.SetStateAction<any>>;
  setDataGuest: React.Dispatch<React.SetStateAction<any>>;
  isGuest?: boolean
  setIsGuest: React.Dispatch<React.SetStateAction<any>>;
}

const DataGuest: FC<DataGuestProps> = (p) => {
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
                  checked={p?.isGuest}
                  onClick={()=> {
                    p.setIsGuest(!p.isGuest)
                  }}
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
                      p.setSalutationGuest('Mr')
                      p.setIsRadioGuest({
                        ...p?.isRadioGuest,
                        mr: true,
                        mrs: false
                      })
                    }}
                    checked={p?.isRadioGuest?.mr}
                    disabled={p?.isGuest? true : false}
                  />
                  <Form.Check
                    inline
                    label="Mrs"
                    name="mrs"
                    type="radio"
                    onClick={()=> {
                      p.setSalutationGuest('Mrs')
                      p.setIsRadioGuest({
                        ...p?.isRadioGuest,
                        mr: false,
                        mrs: true
                      })
                    }}
                    checked={p?.isRadioGuest?.mrs}
                    disabled={p?.isGuest? true : false}
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
                  value={p?.dataGuest?.name}
                  onChange={(e)=> p.setDataGuest({
                    ...p.dataGuest,
                    name: e.target.value
                  })}
                  disabled={p?.isGuest? true : false}
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
                  value={p?.dataGuest?.hp}
                  onChange={(e)=> p.setDataGuest({
                    ...p.dataGuest,
                    hp: e.target.value
                  })}
                  disabled={p?.isGuest? true : false}
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
                value={p?.dataGuest?.email}
                onChange={(e)=> p.setDataGuest({
                  ...p.dataGuest,
                  email: e.target.value
                })}
                disabled={p?.isGuest? true : false}
              />
              </div>
            </div>
          </Form>
      </div>
    </>
  )
}

export default DataGuest;
