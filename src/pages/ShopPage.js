import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link, useLocation } from "react-router-dom";
import { languages } from "../languages";
import { useSelector, useDispatch } from 'react-redux';
import { changeActiveSlide, setDonutList, setFlavors } from '../store/slices/donutSlice';
import { staticDonutList } from "../store/slices/donutSlice";
import { useAddToCart } from '../hooks/useAddToCart';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';

function ShopPage({ selectedLanguage }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const { handleAddToCart } = useAddToCart();

    const { flavors, donutList, activeSlide, userDonutList } = useSelector((state) => state.donut);

    console.log(activeSlide)
    const donutParam = new URLSearchParams(location.search).get('donut');

    const { modalMessage, isModalOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        console.log(donutParam)
        if (donutParam) {
            const donutIndex = staticDonutList.findIndex(donut => donut.name.toLowerCase() === donutParam.toLowerCase());
            if (donutIndex !== -1) {
                dispatch(changeActiveSlide(donutIndex));
            }
        } else {
            dispatch(changeActiveSlide(0));
        }

        const filteredDounuts = staticDonutList.filter((donut) => {
            if (flavors.length === 0) {
                return donut;
            }
            return donut.flavor.some((x) => flavors.includes(x));
        });

        dispatch(setDonutList(filteredDounuts));

    }, [flavors, donutParam, dispatch]);

    const renderedDonuts = donutList.map((donut, index) => (
        <SwiperSlide key={index}>
            <div className="h-[40vh] md:h-[100%] flex justify-center items-center">
                <img 
                    src={donut.img} 
                    className={`
                        transition-all duration-300 ease-in-out 
                        ${index === activeSlide ? 
                            "scale-125 md:scale-100" : ""}
                        w-[130px] h-[130px] md:w-[20vw] md:h-auto
                    `}
                    alt="Donut" 
                />
            </div>
        </SwiperSlide>
    ));

    const handleSlideChange = (swiper) => {
        dispatch(changeActiveSlide(swiper.realIndex));
    };

    const handleSelectFlavors = (flavorId) => {
        if (flavors.includes(flavorId)) {
            const newList = flavors.filter((flavor) => flavor !== flavorId);
            dispatch(setFlavors(newList));
        } else {
            const newList = [...flavors, flavorId];
            dispatch(setFlavors(newList));
        }
    };

    console.log(activeSlide)

    const handleAdd = (donut) => {
        if (userDonutList.find((d) => d.id === donut.id)) {
            openModal("You already added this donut to cart, if you want multiple pieces of this donut please adjust the count number for this donut in the cart page. Thank you!");
        } else {
            const donutToAdd = { ...donut, type: 'Piece', count: 1 };
            handleAddToCart([donutToAdd]);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:justify-between md:flex-row items-center mt-20 md:mt-10 gap-10">
                <div className='flex flex-row gap-5 md:ml-5'>
                    <div className='flex w-full w-1/3 md:w-1/5'>
                        <img className='w-[15vw] md:w-[5vw]' src="/images/vanilla.png" alt="Vanilla" />
                        <input onChange={(event) => handleSelectFlavors(event.target.id)} id='vanilla' type="checkbox" />
                    </div>
                    <div className='flex w-full w-1/3 md:w-1/5'>
                        <img className='w-[15vw] md:w-[5vw]' src="/images/strawberry.png" alt="Strawberry" />
                        <input onChange={(event) => handleSelectFlavors(event.target.id)} id='strawberry' type="checkbox" />
                    </div>
                    <div className='flex w-full w-1/3 md:w-1/5'>
                        <img className='w-[15vw] md:w-[5vw]' src="/images/chocolate.png" alt="Chocolate" />
                        <input onChange={(event) => handleSelectFlavors(event.target.id)} id='chocolate' type="checkbox" />
                    </div>
                    <div className='flex w-full w-1/3 md:w-1/5'>
                        <img className='w-[15vw] md:w-[5vw]' src="/images/caramel.png" alt="Caramel" />
                        <input onChange={(event) => handleSelectFlavors(event.target.id)} id='caramel' type="checkbox" />
                    </div>
                </div>
                <div className="flex flex-row text-white gap-5 md:w-[30vw] justify-end">
                    <Link to='/createDonut'>
                        <button className="bg-[#C42348] rounded-full py-2 px-8">
                            {languages[selectedLanguage].createDonut}
                        </button>
                    </Link>
                    <Link to='/createBox'>
                        <button className="bg-[#C42348] rounded-full py-2 px-8">
                            {languages[selectedLanguage].createBox}
                        </button>
                    </Link>
                </div>
            </div>

            <div className="h-[70vh] flex flex-col justify-center w-[100%]">
                <div className="flex flex-col justify-between bg-white/10 drop-shadow-xl border border-white/20 backdrop-blur-lg shadow-3xl ml-5 rounded-3xl w-[90vw] h-[30vh] md:w-[35vw] z-50 md:h-[50vh] mt-[-15vh] md:mt-10 absolute">
                    <div>
                        <h1 className="mt-[-5vh] ml-2 text-white text-5xl md:text-6xl specialFont uppercase">
                            {donutList[activeSlide].name.split(' ').map((word, idx) => (
                                <span key={idx} className={donutList[activeSlide].styles[`highlight${idx + 1}`] || donutList[activeSlide].styles.name}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-white text-xl mt-3 ml-2">{donutList[activeSlide].description}</p>
                    </div>
                    <div className="flex items-center justify-between md:px-8">
                        <p className="text-white text-5xl md:text-8xl mb-[-5vh] md:mb-[-5vh] specialFont md:ml-2">{donutList[activeSlide].price}</p>
                        <button onClick={() => handleAdd(donutList[activeSlide])} className="bg-[#C42348] mb-5 md:mb-0 mr-2 text-[13px] text-white uppercase rounded-full px-5 py-1">
                            {languages[selectedLanguage].addToCart}
                        </button>
                    </div>
                </div>
                <div className="w-full mt-[40vh] md:mt-0 mh-[40vh] md:h-full text-white">
                <Swiper
                    initialSlide={donutParam ? staticDonutList.findIndex((donut) => donut.name.toLowerCase() === donutParam.toLowerCase()) : 0}
                    key={donutList.length}
                    activeSlide={activeSlide}
                    slidesPerView={2.5}
                    loop={flavors.length === 0}
                    centeredSlides={true}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    style={{ width: '100%', height: '100%' }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        
                        768: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    <div className="swiper-pagination"></div>
                    {renderedDonuts}
                </Swiper>

                </div>
            </div>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
        </div>
    );
}

export default ShopPage;

