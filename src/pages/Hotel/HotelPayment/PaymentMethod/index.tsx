import React, { FC, useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import './style.scss';
import img from "images/hero-right-3.png";

export interface PaymentMethodProps {
    showModal: boolean,
    onClick: React.MouseEventHandler,
    onHide: ()=> void
}
const PaymentMethod: FC<PaymentMethodProps> = p => {
  const data = [
    {
        account: "BCA",
        image: img
    },
    {
        account: "BRI",
        image: img
    },
    {
        account: "MANDIRI",
        image: img
    },
    {
        account: "BNI",
        image: img
    },
  ]


  return (
    <>
        <div className="card card-payment" onClick={p.onClick}>
            <div className="row">
                <div className="col">
                    <i className={`text-2xl text-neutral-6000 las la-chalkboard mr-1`}></i>
                    <span className="text-medium">Pilih Metode Pembayaran</span>
                </div>
                <div className="col text-end">
                    <i className={`text-2xl text-neutral-6000 las la-chevron-circle-right mr-1`}></i>
                </div>
            </div>
        </div>
        <Modal
            show={p.showModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={()=> p.onHide()}
            >
            <Modal.Body>
                <div className="text-center mb-4">
                    <h3>Metode Pembayaran</h3>
                </div>
                { data && data.map((a, index) => (
                    <div className="mb-2" key={index}>
                        <div className="row mb-1">
                            <div className="col col-md-2">
                                <img src={img} alt="" className="payment-img"/>
                            </div>
                            <div className="col d-flex align-items-end">
                                <span className="text-account">{a.account}</span>
                            </div>
                            <div className="col col-md-1 d-flex align-items-center">
                                o
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))}
       
            </Modal.Body>
        </Modal>
    </>
  )
}

export default PaymentMethod;
