import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaLocationDot } from 'react-icons/fa6'; 
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs";
import {languages} from '../languages';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 
import ReactDOMServer from 'react-dom/server';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';

const DarkMap = ({selectedLanguage}) => {
  const iconHtml = ReactDOMServer.renderToStaticMarkup(<FaLocationDot size={40} color={'#C42348'} />);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const { modalMessage, isModalOpen, openModal, closeModal } = useModal();

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value)
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value)
  }

  const handleSendForm = (event) => {
    event.preventDefault();

    if(parseInt(name) || name === "") {
        openModal("Name is not valid.")
    } else if(!email.includes('@')) {
        openModal("Email is not valid.")
    } else if(!parseInt(phone)) {
        openModal("Phone is not valid.")
    } else if (address === "") {
        openModal("Address must be filled")
    }
    else {
        openModal("Your form was successful sent!")
    }
  }
  
  const customIcon = new L.DivIcon({
    className: 'custom-icon',  
    html: `<div style="font-size: 24px; color: red; text-align: center;">${iconHtml}</div>`,
    iconSize: [32, 32],  
    iconAnchor: [16, 32], 
  });

  return (
    <div className='mt-10 md:mt-5 relative'>
        <MapContainer center={[44.8176, 20.4633]} zoom={13} className="h-[70vh] md:h-[60vh]" style={{ zIndex: 1 }} attributionControl={false}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[44.8176, 20.4633]} icon={customIcon}>
                <Popup>
                Beograd, Srbija
                </Popup>
            </Marker>
            <Marker position={[44.8116, 20.4133]} icon={customIcon}>
                <Popup>
                Beograd, Srbija
                </Popup>
            </Marker>
            <Marker position={[44.7956, 20.5100]} icon={customIcon}>
                <Popup>
                Beograd, Srbija
                </Popup>
            </Marker>
        </MapContainer>
        <div className='h-[65vh] md:h-[70vh] flex flex-col text-white absolute right-0 md:right-5 md:right-20 top-[2vh] md:top-[-3vh] w-[60vw] md:w-[30vw] border border-white/10 bg-white/10 rounded-2xl backdrop-blur-sm' style={{zIndex: 2}}>
            <div className='p-5 flex flex-col gap-10 mt-5'>
                <input value={name} onChange={handleChangeName} className='bg-transparent border-b-[0.5px] custom-input w-[80%]' placeholder={languages[selectedLanguage].name}/>
                <input value={email} onChange={handleChangeEmail} className='bg-transparent border-b-[0.5px] custom-input w-[80%]' placeholder={languages[selectedLanguage].email}/>
                <input value={phone} onChange={handleChangePhone} className='bg-transparent border-b-[0.5px] custom-input w-[80%]' placeholder={languages[selectedLanguage].phone}/>
                <input value={address} onChange={handleChangeAddress} className='bg-transparent border-b-[0.5px] custom-input w-[80%]' placeholder={languages[selectedLanguage].address}/>
                <textarea className='bg-transparent border-b-[0.5px] custom-input w-[80%]' placeholder={languages[selectedLanguage].message}/>
            </div>
            <div onClick={handleSendForm} className='pl-3 bg-white flex text-black gap-5 rounded-l-2xl md:w-[13vw] mt-10 py-3 justify-center items-center self-end cursor-pointer'>
                <p>{languages[selectedLanguage].sendForm}</p>
                <MdOutlineArrowRightAlt size={30} />
            </div>
        </div>
        <div className="w-[100vw] h-[25vh] flex flex-wrap items-center justify-between px-[5vw]" style={{ color: "grey" }}>
            <div className="flex gap-20">
                <div className='text-sm'>
                    <p className='uppercase mb-6'>{languages[selectedLanguage].ourAddress}</p>
                    <p>123456 Belgrade</p>
                    <p>Milutina Milankovića 110</p>
                    <p>Francuska 6</p>
                    <p>Milana Rakića 12</p>
                </div>
                <div className='text-sm'>
                    <p className='uppercase mb-6'>{languages[selectedLanguage].ourContact}</p>
                    <p>donut@name.com</p>
                    <p>+381 123 456 78 90</p>
                </div>
            </div>
            <div className="flex gap-8 text-white">
                <BsInstagram size={25} color="gray"/>
                <BsFacebook size={25} color="gray"/>
                <BsTwitterX size={25} color="gray"/>
            </div>
            <div>
                <p>{languages[selectedLanguage].followUs}</p>
            </div>
        </div>
        {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default DarkMap;
