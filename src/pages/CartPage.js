import React, { useState, useEffect } from "react"
import { RxCross1 } from "react-icons/rx";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeDonut, editDonutCount } from "../store/slices/donutSlice"

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';

import { modelMap, paymentMethods } from "../constants"

import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import { setTotalPrice, setCardHolderName, setExDate, setCardNumber, setCode, setCartType } from "../store/slices/cartSlice";

function CartPage() {
    const dispatch = useDispatch()
    const userDonutList = useSelector((state) => {
        return state.donut.userDonutList;
    });

    const { totalPrice, cardHolderName, cardNumber, exDate, code, selectedCardType } = useSelector((state) => state.cart)
    
    const { modalMessage, isModalOpen, openModal, closeModal } = useModal();

    const convertPrice = (price) => {
        return parseFloat(price.replace('$', ''));
    };


    useEffect(() => {
        let total = 0;
        userDonutList.forEach((donut) => {
            total += convertPrice(donut.price) * donut.count;
        });

        dispatch(setTotalPrice(total))
    }, [userDonutList]);

    const handleRemoveFromCart = (donutIndex) => {
        dispatch(removeDonut(donutIndex));
    };

    const handleChangeName = (event) => {
        dispatch(setCardHolderName(event.target.value))
    };

    const handleChangeNumber = (event) => {
        if (cardNumber.length < 16) {
            dispatch(setCardNumber(event.target.value))
        }
        
    };

    const handleChangeDate = (event) => {
        dispatch(setExDate(event.target.value))
    };

    const handleChangeCode = (event) => {
        dispatch(setCode(event.target.value))
    };

    const handleCheckOut = (event) => {
        event.preventDefault();

        if(parseInt(cardHolderName) || cardHolderName === "") {
            openModal('Name is not valid.');
        } else if(!parseInt(cardNumber)) {
            openModal('Card number is not valid.');
        } else if(!parseInt(code) && code.length !== 3) {
            openModal('CVC code is not valid');
        } else {
            const exDateList = exDate.split('/');
            console.log(!exDateList.length === 2)
            if (!exDateList.length === 2 || (!parseInt(exDateList[0]) && exDateList[0].length !== 2) || (!parseInt(exDateList[1]) && exDateList[1].length !== 2)) {
                openModal("Expiration date is not valid");
            } else {
                openModal("Your order is successful!");
            }
        }
    };

    const handleChangeCount = (operator, donut) => {
        if (operator === '+' && donut.count === 10) return;
        if (operator === '-' && donut.count === 0) return;

        let newDonutNumber = donut.count;
        if (operator === '+') {
            dispatch(editDonutCount({ donut, count: newDonutNumber + 1 }));
        } else {
            dispatch(editDonutCount({ donut, count: newDonutNumber - 1 }));
        }
    };

    const handleShowDots = (cardNumbersToShow) => {
        let showDots = ""
        let step = 0
        for (let index = 0; index < cardNumbersToShow.length; index++) {
            showDots += step % 4 === 0 ? ` ${cardNumbersToShow[index]}` : `${cardNumbersToShow[index]}`
            step += 1
        }
        return showDots
    }

    const handleSelectCartType = (index) => {
        dispatch(setCartType(index))
    }

    const renderedUserDonutList = userDonutList.map((donut, index) => {
        return (
            <div key={index} className='flex ml-1 md:ml-5 mt-5 justify-between items-center h-[10vh]'>
                <div className='flex justify-between w-[22vw] md:w-[30vw] items-center'>
                    {donut.img && (
                        <img className='w-[20vw] md:w-[6vw] mr-4' src={donut.img}/>
                    )}
                    {donut.modal && (
                        <div className="w-[22vw] md:w-[10vw] flex flex-row gap-3">
                            <Canvas shadows className="w-full">
                                <ambientLight intensity={0.3} />
                                <spotLight 
                                position={[10, 10, 10]} 
                                angle={0.5} 
                                penumbra={1} 
                                castShadow 
                                intensity={1.5} 
                                />
                                <directionalLight 
                                position={[0, 10, 5]} 
                                intensity={1.5} 
                                castShadow 
                                />
                                <hemisphereLight 
                                skyColor={0xFFFFFF} 
                                groundColor={0x444444} 
                                intensity={0.5} 
                                />
                                <OrbitControls 
                                enableZoom={false}
                                enableRotate={false} 
                                target={[0, -4, -2]} 
                                minDistance={10} 
                                maxDistance={30} 
                                />
                            
                                <Suspense fallback={null}>
                                {React.createElement(modelMap[donut.modal])}
                                </Suspense>
                            </Canvas>
                        </div>
                    )}
                    <p className='specialFont text-3xl w-[35vw]'>
                    {
                        donut.type === "Peace" 
                            ? donut.name.split(' ').map((word, idx) => (
                                <span key={idx} className={`${donut.styles?.[`highlight${idx + 1}`] || donut.styles?.name} ${donut.modal ? 'pl-3' : ''}`}>
                                {word}<br/>{' '}
                                </span>
                            ))
                            : donut.name.split(' ').map((word, idx) => (
                                <span key={idx} className={`${donut.styles?.[`highlight${idx + 1}`] || donut.styles?.name} text-[22px] ${donut.modal ? 'pl-5' : ''}`}>
                                {word}{(idx) % 2 === 0 || idx === 1 ? ' ' : ' / '}
                                </span>
                            ))
                    }
                    </p>
                </div>
                <div className="w-[1vw] md:w-[10vw] flex">
                    <div className='text-white specialFont text-xl border-[0.5px] rounded-full px-3 py-1 flex gap-7 items-center'>
                        <FaPlus onClick={() => handleChangeCount('+', donut)} className="h-3 w-2"/>
                        <p>{donut.count}</p>
                        <FaMinus onClick={() => handleChangeCount('-', donut)} className="h-3 w-2"/>
                    </div>
                </div>
                <div onClick={() => handleRemoveFromCart(index)} className='flex items-center gap-5 cursor-pointer mr-4 md:mr-0'>
                    <p className='text-white text-2xl specialFont'>{donut.price}</p>
                    <RxCross1 color="white" className="h-5 pr-1"/>
                </div>
            </div>
        )
    })    

    return(
        <div className='flex flex-col gap-10 md:gap-0 md:flex-row mt-20 md:mt-0 md:h-[86vh] items-center'>
            <div className='felx flex-col w-full'>
                <div className='flex flex-col md:flex-row items-start md:items-center md:justify-between mb-10 px-5 md:pl-0'>
                    <p className='text-white text-4xl md:text-5xl md:ml-5 specialFont uppercase'>Shopping Cart</p>
                    <span className='text-white gap-3 font-thin text-3xl flex md:self-end'>Subtotal: <span className='specialFont text-white'>${totalPrice.toFixed(2)}</span></span>
                </div>

                <div className='md:w-[60vw] flex flex-col'>
                    <div className='h-[30vh] md:h-[60vh] border-t-[0.5px] border-b-[0.5px] ml-3 overflow-y-auto flex flex-col gap-10'>
                        {renderedUserDonutList}
                    </div>
                </div>
            </div>
            <div className='flex w-[100vw] flex-col items-center md:items-end md:mr-7'>
                <div className='w-[90vw] md:w-[25vw] flex flex-col justify-between h-[75vh] text-white p-4 rounded-2xl bg-[#191920] border border-white/10' > 
                <div className='flex items-center'>
                    <span className='text-white font-thin text-2xl'>Payment Method</span>
                </div>
                <div className='flex md:w-[65%] items-center justify-between'>
                    {paymentMethods.map((method, index) => (
                        <div key={index} className={`w-[14vw] md:w-[5vw] ${selectedCardType === index ? "bg-white rounded-lg" : ""}`} onClick={() => handleSelectCartType(index)}>
                            <img src={method.src} alt={method.alt} />
                        </div>
                    ))}
                    </div>
                    <div className='w-[50vw] md:w-[20vw] h-[23vh] flex flex-col p-3 justify-between rounded-2xl border border-white/10 bg-white/10 ml-[-5.6vw] backdrop-blur-lg drop-shadow-2xl'>
                        <div className='h-[5vh] md:h-[6vh]'>
                            <img className='w-[12vw] md:w-[4vw]' src={paymentMethods[selectedCardType].src}/>
                        </div>
                        <div className='md:h-[9vh] flex'>
                            <p className='text-2xl'>
                                {cardNumber.length > 0 
                                    ? handleShowDots(cardNumber)
                                    : ".... .... .... ...."}
                            </p>
                        </div>
                        <div className='flex h-[6vh] items-end text-sm justify-between'>
                            <p>{cardHolderName.length > 0 ? cardHolderName : "Jane Doe"}</p>
                            <p>{exDate.length > 0 ? exDate : "12/20"}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <input onChange={handleChangeName} value={cardHolderName} placeholder='Cardholder Name' className='bg-transparent border-b-[0.5px] placeholder:text-white  custom-input'/>
                        <input onChange={handleChangeNumber} value={cardNumber} placeholder='Card Number' className='bg-transparent border-b-[0.5px]  placeholder:text-white  custom-input'/>
                        <div className='flex justify-between'>
                        <input onChange={handleChangeDate} value={exDate} placeholder='Expiration date' className='bg-transparent border-b-[0.5px] w-[40%] placeholder:text-white  custom-input'/>
                        <input onChange={handleChangeCode} value={code} placeholder='CVC code' className='bg-transparent border-b-[0.5px] w-[40%]  placeholder:text-white  custom-input'/>
                        </div>
                        <div className='flex flex-col items-center'>
                            <button onClick={handleCheckOut} className='bg-[#C42348] w-[50%] py-2 mt-10 rounded-xl'>Check Out</button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
        </div>
    )
}

export default CartPage;