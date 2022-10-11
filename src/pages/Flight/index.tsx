import React, { FC, useEffect, useState } from "react";
import bgImage from "../../images/flight.png";
import Axios from 'axios';
import Select from 'react-select';
import { Helmet } from "react-helmet";
import { Row, Col, Form, Modal, Button, Spinner } from "react-bootstrap";
import { BaseUrl } from "utils/helper";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker"; 
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

interface ListingFlightsPageProps {
  className?: string;
}

interface FlightOptionProps {
    code?: string,
    name?: string,
    cityCode?: string,
    city?: string,
    countryCode?: string,
    timezone?: string,
    latitude?: number,
    longitude?: number,
    countryName?: string
}

interface DataPostProps {
    departureAirportCode?: string,
    arrivalAirportCode?: string,
    departureDate?: string,
    returnDate?: string,
    noOfAdt?: number,
    noOfChd?: number,
    noOfInf?: number,
    cabin?: string
}

interface FlightValueProps {
    label?: string,
    value?: string
}

const dataPostDefault = {
    departureAirportCode: "",
    arrivalAirportCode: "",
    departureDate: "",
    returnDate: "",
    noOfAdt: 1,
    noOfChd: 0,
    noOfInf: 0,
    cabin: ""
}

const ListingFlightsPage: FC<ListingFlightsPageProps> = ({className = ""}) => {
  const history = useHistory()
  const [flightOptions, setFlightOptions] = useState<FlightOptionProps[] | any>(null)
  const [classOptions, setClassOptions] = useState<FlightOptionProps[] | any>(null)
  const [departureFlight, setDepartureFlight] = useState<FlightValueProps | any>(null)
  const [arrivalFlight, setArrivalFlight] = useState<FlightValueProps | any>(null)
  const [classValue, setClassValue] = useState<FlightValueProps | any>(null)
  const [dataPost, setDataPost] = useState<DataPostProps | any>(dataPostDefault)
  const [isRoundTrip, setIsRoundTrip] = useState<boolean | any>(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [totalPassenger, setTotalPassenger] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [passenger, setPassenger] = useState({
    adult: 1,
    child: 0,
    infant: 0
  })

  useEffect(() => {
    let dateNow = new Date()
    endDate.setDate(dateNow.getDate() + 1)
  }, [])

  useEffect(() => {
    const values = Object.values(passenger);
    const sum = values.reduce((accumulator, value) => {
    return accumulator + value;
    }, 0);
    setTotalPassenger(sum)
  }, [passenger])

  useEffect(() => {
    getListDropdown()
    getListClass()
  }, [])

  const handleChangeStartDate = (date: Date) => {
    setStartDate(date)
    let dateUpdate = new Date(date)
    endDate.setDate(dateUpdate.getDate() + 1)
  }

  const getListDropdown = async () => {
    setIsLoading(true)
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2MjQ0NTU4MywiZXhwIjoxNjkzOTgxNTgzfQ.gIQuU7VdjWdevFDuLrG97uL1gA0bddZK5QpEq034LcQ';
    Axios.get(BaseUrl + '/transport/flight/airport')
    .then(res=> {
        let data = res.data.data
        console.log('data: ', data)
        let convertData = data.map((a: FlightOptionProps, index:number) => (
            {
                "label": `${a?.name} (${a?.code})`,
                "value": a?.code
            }
        ))
        setFlightOptions(convertData)
        setIsLoading(false)
    })
    .catch(err => {
        console.log('errData: ', err)
    })
  }

  const getListClass = async () => {
    setIsLoading(true)
    Axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2MjQ0NTU4MywiZXhwIjoxNjkzOTgxNTgzfQ.gIQuU7VdjWdevFDuLrG97uL1gA0bddZK5QpEq034LcQ';
    Axios.get(BaseUrl + '/transport/flight/class')
    .then(res=> {
        let data = res.data.data
        console.log('dataClass: ', data)
        let convertData = data.map((a: FlightOptionProps, index:number) => (
            {
                "label": a.name,
                "value": a.code
            }
        ))
        setClassOptions(convertData)
        setIsLoading(false)
    })
    .catch(err => {
        console.log('errData: ', err)
    })
  }

  const onChangeFlightOptions = (e: FlightValueProps, param: string) => {
    if(param == 'departure') {
        setDepartureFlight(e)
        setDataPost({
            ...dataPost,
            departureAirportCode: e.value
        })
    }
    if(param == 'arrival') {
        setArrivalFlight(e)
        setDataPost({
            ...dataPost,
            arrivalAirportCode: e.value
        })
    }
    if(param == 'class') {
        setClassValue(e)
        setDataPost({
            ...dataPost,
            cabin: e.value
        })
    }
  }

  const onClickSwapFlightState = () => {
    let getDataDeparture = departureFlight
    let getDataArrival = arrivalFlight
    setDepartureFlight(getDataArrival)
    setArrivalFlight(getDataDeparture)
    setDataPost({
        ...dataPost,
        departureAirportCode: dataPost.arrivalAirportCode,
        arrivalAirportCode: dataPost.departureAirportCode
    })
  }

  const onClickSwitch = () => {
    setIsRoundTrip(!isRoundTrip)
  }

  const handleClickSearch = () => {
    let data = {
        departureAirportCode: departureFlight?.value,
        arrivalAirportCode: arrivalFlight?.value,
        departureDate : moment(startDate.toLocaleDateString()).format('YYYY-MM-DD'),
        returnDate: "",
        noOfAdt : passenger.adult,
        noOfChd : passenger.child,
        noOfInf : passenger.infant,
        cabin : classValue?.value
    }
    if(isRoundTrip) {
        data.returnDate = moment(endDate.toLocaleDateString()).format('YYYY-MM-DD')
    }
    if(data.departureAirportCode == undefined || data.arrivalAirportCode == undefined || data.cabin == undefined) {
        setShowAlert(true)
    }
    else {
        setIsLoading(true)
        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTY2MjQ0NTU4MywiZXhwIjoxNjkzOTgxNTgzfQ.gIQuU7VdjWdevFDuLrG97uL1gA0bddZK5QpEq034LcQ';
        Axios.post(BaseUrl + '/transport/flight/airport/availability', data)
        .then(res=> {
            console.log('dataPost: ', res.data)
            let data = res.data.data
            let noData = false
            if(data.errors[0].type == 'WARNING') {
                noData = true
            }
            setIsLoading(false)
            const values = Object.values(passenger);
            const passengerLength = values.reduce<number>((accumulator, value) => {
                return accumulator + value;
            }, 0);
            history.push({
                pathname: `/flights/list`,
                state: {
                    responseGetFlight: res.data.data,
                    noData: noData,
                    passenger: {
                        noOfAdt: passenger.adult,
                        noOfChd : passenger.child,
                        noOfInf : passenger.infant,
                    },
                    passengerLength: passengerLength,
                    cabin : classValue?.value,
                    isRoundTrip: isRoundTrip
                }
            })
        })
        .catch(err => {
            console.log('errData: ', err)
        })

    }
  }

  const handleClickPlus = (action: string) => {
    if(action == 'adult') {
        setPassenger({
            ...passenger,
            adult: passenger.adult + 1
        })
    }
    if(action == 'child') {
        setPassenger({
            ...passenger,
            child: passenger.child + 1
        })
    }
    if(action == 'infant') {
        setPassenger({
            ...passenger,
            infant: passenger.infant + 1
        })
    }
  }

  const handleClickMin = (action: string) => {
    if(action == 'adult') {
        if(passenger.adult < 1) {

        }
        else {
            setPassenger({
                ...passenger,
                adult: passenger.adult - 1
            })
        }
    }
    if(action == 'child') {
        if(passenger.child < 1) {

        }
        else {
            setPassenger({
                ...passenger,
                child: passenger.child - 1
            })
        }
    }
    if(action == 'infant') {
        if(passenger.infant < 1) {

        }
        else {
            setPassenger({
                ...passenger,
                infant: passenger.infant - 1
            })
        }
    }
  }


  return (
    <div>
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      <Row className="container flight-wrapper pt-4 pb-4">
        <Col className="left-content" xs={12} sm={12} md={7}>
            <Col className="content-wrapper" xs={12} sm={12} md={12}>
                <span className="label">Dari</span>
                <Row className="mt-2">
                    <Col xs={2} sm={2} md={1}>
                        <i className={`text-4xl text-neutral-6000 purple las la-plane-departure mr-1`} onClick={()=> console.log('dataPost: ', dataPost)}></i>
                    </Col>
                    <Col xs={8} sm={8} md={9}>
                        <Select options={flightOptions} value={departureFlight} onChange={(e)=> onChangeFlightOptions(e, 'departure')}/>
                    </Col>
                    <Col xs={2} sm={2} md={2} className="">
                        <div className=""  onClick={onClickSwapFlightState}>
                            <i className={`text-4xl text-neutral-6000 purple las la-sync mr-1`}></i>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col className="content-wrapper mt-2" xs={12} sm={12} md={12}>
                <span className="label">Ke</span>
                <Row className="mt-2">
                    <Col xs={2} sm={2} md={1}>
                        <i className={`text-4xl text-neutral-6000 purple las la-plane-arrival mr-1`}></i>
                    </Col>
                    <Col xs={8} sm={8} md={9}>
                        <Select options={flightOptions} value={arrivalFlight} onChange={(e)=> onChangeFlightOptions(e, 'arrival')}/>
                    </Col>
                </Row>
            </Col>
            <Col className="content-wrapper mt-2" xs={12} sm={12} md={12}>
                <div className="date-wrapper">
                    <span className="label">Tanggal Berangkat</span>
                    <span>Pulang pergi ?</span>
                </div>
                <Row className="mt-2">
                    <Col xs={2} sm={2} md={1}>
                        <i className={`text-4xl text-neutral-6000 purple las la-calendar mr-1`}></i>
                    </Col>
                    <Col xs={8} sm={8} md={9}>
                        <DatePicker 
                            selected={startDate} 
                            dateFormat="dd-MM-yyyy"
                            onChange={(date:Date) => handleChangeStartDate(date)} 
                        />
                    </Col>
                    <Col xs={2} sm={2} md={2} className="">
                        <Form>
                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                checked={isRoundTrip}
                                onClick={onClickSwitch}
                            />
                        </Form>
                    </Col>
                </Row>
            </Col>
            { isRoundTrip ?
              (
                <Col className="content-wrapper mt-2" xs={12} sm={12} md={12}>
                    <span className="label">Tanggal Kembali</span>
                    <Row className="mt-2">
                        <Col xs={2} sm={2} md={1}>
                            <i className={`text-4xl text-neutral-6000 purple las la-calendar mr-1`}></i>
                        </Col>
                        <Col xs={8} sm={8} md={9}>
                            <DatePicker 
                                selected={endDate} 
                                dateFormat="dd-MM-yyyy"
                                onChange={(date:Date) => setEndDate(date)} 
                            />
                        </Col>
                    </Row>
                </Col>
              )
              : null
            }
            <Col className="content-wrapper mt-2" xs={12} sm={12} md={12}>
                <span className="label">Penumpang</span>
                <Row className="mt-2">
                    <Col xs={2} sm={2} md={1}>
                        <i className={`text-4xl text-neutral-6000 purple las la-user-friends mr-1`}></i>
                    </Col>
                    <Col xs={8} sm={8} md={9}>
                        <input 
                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
                            type="text" 
                            placeholder="Masukkan Data Penumpang"
                            value={`${totalPassenger} Penumpang`}
                            onClick={()=> setShowModal(true)}
                            />
                    </Col>
                </Row>
            </Col>
            <Col className="content-wrapper mt-2" xs={12} sm={12} md={12}>
                <span className="label">Kelas Penerbangan</span>
                <Row className="mt-2">
                    <Col xs={2} sm={2} md={1}>
                        <i className={`text-4xl text-neutral-6000 purple las la-passport mr-1`}></i>
                    </Col>
                    <Col xs={8} sm={8} md={9}>
                        <Select options={classOptions} value={classValue} onChange={(e)=> onChangeFlightOptions(e, 'class')}/>
                    </Col>
                </Row>
            </Col>
            <Col className="content-wrapper mt-3" xs={12} sm={12} md={12}>
                <Col xs={10} sm={10} md={10}>
                    <div className="flight-search-wrapper">
                        <button 
                            className="btn btn-sm btn-warning btn-pilih" 
                            onClick={handleClickSearch}
                        >
                            Cari Pesawat
                        </button>
                    </div>
                </Col>
            </Col>
        </Col>
        <Col xs={12} sm={12} md={5} className="right-content">
          <div className="flex-grow">
            <img className="w-full" src={bgImage} alt="hero" />
          </div>
        </Col>
      </Row>
      <Row className="section-alert">
        <div className={showAlert ? 'alert-wrapper' : 'alert-wrapper-inactive'}>
          <div id="alert-2" className="alert flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
              Lengkapi form terlebih dahulu...
            </div>
            <button type="button" onClick={()=> setShowAlert(false)} className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
      </Row>
      <Modal 
        show={showModal} 
        onHide={()=> setShowModal(false)} 
        animation={true}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="modal-guest">
            <div className="guest-header text-center mb-4">
                <span className="guest-title">Jumlah Penumpang</span>
            </div>
            <div className="mb-3 guest-body">
                <div className="text">
                    <span>Dewasa</span>
                </div>
                <div className="counter">
                    <div className="btn btn-count" onClick={()=> handleClickMin('adult')}>-</div>
                    <span>{passenger.adult}</span>
                    <div className="btn btn-count" onClick={()=> handleClickPlus('adult')}>+</div>
                </div>
            </div>
            <div className="mb-3 guest-body">
                <div className="text">
                    <span>Anak</span>
                </div>
                <div className="counter">
                    <div className="btn btn-count" onClick={()=> handleClickMin('child')}>-</div>
                    <span>{passenger.child}</span>
                    <div className="btn btn-count" onClick={()=> handleClickPlus('child')}>+</div>
                </div>
            </div>
            <div className="mb-3 guest-body">
                <div className="text">
                    <span>Bayi</span>
                </div>
                <div className="counter">
                    <div className="btn btn-count" onClick={()=> handleClickMin('infant')}>-</div>
                    <span>{passenger.infant}</span>
                    <div className="btn btn-count" onClick={()=> handleClickPlus('infant')}>+</div>
                </div>
            </div>
            <div className="guest-footer">
                <button 
                    className="btn btn-sm btn-warning btn-pilih" 
                    onClick={()=> setShowModal(false)}
                >
                    Confirm
                </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal 
        show={isLoading} 
        onHide={()=> setIsLoading(false)} 
        animation={true}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex justify-content-center p-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Modal>
    </div>
  );
};

export default ListingFlightsPage;
