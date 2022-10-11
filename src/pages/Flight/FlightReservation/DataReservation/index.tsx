import React, { FC } from 'react';
import './style.scss';
import { Form, Modal } from 'react-bootstrap';

export interface DataReservationProps {
  showModalForm?: boolean
  setShowModalForm: React.Dispatch<React.SetStateAction<any>>;
  isTraveler?: boolean
  setIsTraveler: React.Dispatch<React.SetStateAction<any>>;
}

const DataReservation: FC<DataReservationProps> = (p) => {

  const handleClickDetailTraveler = () => {
    p.setShowModalForm(true)
    p.setIsTraveler(true)
  }

  const handleCloseModal = () => {
    p.setShowModalForm(false)
    p.setIsTraveler(false)
  }

  return (
    <>
      <div className="card datres-wrapper mt-2 mb-3">
        <span>Data Pemesan</span>
        <Form>
          <div className="mb-3">
            <div className="mt-1">
              <input 
                readOnly={true}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                type="text" 
                placeholder="Isi Data Pemesan"
                onClick={()=> p.setShowModalForm(true)}
              />
            </div>
          </div>
        </Form>
      </div>
      <div className="card datres-wrapper mt-2">
        <span>Data Traveler</span>
        <Form>
          <div className="mb-3">
            <div className="mt-1">
              <input 
                readOnly={true}
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                type="text" 
                placeholder="Dewasa 1"
                onClick={handleClickDetailTraveler}
              />
            </div>
          </div>
        </Form>
      </div>
      <Modal 
          show={p.showModalForm} 
          size="lg"
          centered
          onHide={handleCloseModal}
        >
          <div className="form-detail">
            <span className="text-title purple">{p?.isTraveler? 'Data Traveler' : 'Data Pemesan'}</span>
            <div className="card datres-wrapper mt-2 mb-3">
            <Form>
              <div className="mb-3">
                  <Form.Check
                    inline
                    label="Mr"
                    name="mr"
                    type="radio"
                  />
                  <Form.Check
                    inline
                    label="Mrs"
                    name="mrs"
                    type="radio"
                  />
                </div>
            </Form>
            <Form>
              <div className="mb-3">
                <span>Nama Depan</span>
                <div className="mt-1">
                  <input 
                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                    type="text" 
                    placeholder="Nama Depan"
                  />
                </div>
              </div>
            </Form>
            <Form>
              <div className="mb-3">
                <span>Nama Tengah</span>
                <div className="mt-1">
                  <input 
                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                    type="text" 
                    placeholder="Nama Tengah"
                  />
                </div>
              </div>
            </Form>
            <Form>
              <div className="mb-3">
                <span>Nama Belakang</span>
                <div className="mt-1">
                  <input 
                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                    type="text" 
                    placeholder="Nama Belakang"
                  />
                </div>
              </div>
            </Form>
            { !p.isTraveler ?
              (
                <>
                  <Form>
                    <div className="mb-3">
                      <span>Nomor Handphone</span>
                      <div className="mt-1">
                        <input 
                          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                          type="number" 
                          placeholder="Nomor Handphone"
                        />
                      </div>
                    </div>
                  </Form>
                  <Form>
                    <div className="mb-3">
                      <span>Email</span>
                      <div className="mt-1">
                        <input 
                          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                          type="number" 
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </Form>
                </>
              ) : null
            }
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DataReservation;
