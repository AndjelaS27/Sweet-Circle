import { useState, useEffect } from "react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { languages } from "../languages";
import { useSelector, useDispatch } from "react-redux";
import { setTotalCount, setActiveBox, setCountList } from "../store/slices/createBoxSlice";
import { useAddToCart } from "../hooks/useAddToCart";
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';

function CreateBoxPage({selectedLanguage}) {
    const { modalMessage, isModalOpen, openModal, closeModal } = useModal();

    const dispatch = useDispatch();
    const {totalCount, activeBox, countList} = useSelector((state) => {
        return state.createBox;
    })

    const { handleAddToCart } = useAddToCart();

    useEffect(() => {
       dispatch(setTotalCount([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
        dispatch(setTotalCount(0))
    }, [activeBox])
    const handleClick = (event) => {
        dispatch(setActiveBox(event.target.id))
    }

    const donutInformations = [
        {
            id: 1,
            img: '/images/3.PNG',
            name: 'Vanilla Whisk',
            description: languages[selectedLanguage].text1, 
            price: '$2.49',
            count: countList[0],
            styles: { name: 'text-[#fcfff3]', highlight1: 'text-[#fff4bd]' }
        },
        {
            id: 2,
            img: '/images/10.PNG',
            name: 'Berry Melt',
            description: languages[selectedLanguage].text2, 
            price: '$3.29',
            count: countList[1],
            styles: { name: 'text-[#FB6090]', highlight1: 'text-[#94c973]', highlight2: 'text-[#fbe698]', highlight3: 'text-[#fa26a0]', highlight4: 'text-[#2ff3e0]' }
        },
        {
            id: 3,
            img: '/images/1.PNG',
            name: 'Caramel Dream',
            description: languages[selectedLanguage].text3, 
            price: '$3.29',
            count: countList[2],
            styles: { name: 'text-orange-100', highlight1: 'text-yellow-600' }
        },
        {
            id: 4,
            img: '/images/2.PNG',
            name: 'Chocolate Wish',
            description: languages[selectedLanguage].text4,
            price: '$2.99',
            count: countList[3],
            styles: { name: 'text-[#a47551]', highlight1: 'text-[#e4d4c8]' }
        },
        {
            id: 5,
            img: '/images/4.PNG',
            name: 'Berry Bliss',
            description: languages[selectedLanguage].text5, 
            price: '$2.99',
            count: countList[4],
            styles: { name: 'text-pink-300', highlight1: 'text-[#75e6da]' }
        },
        {
            id: 6,
            img: '/images/6.PNG',
            name: 'Choco Swirl',
            description: languages[selectedLanguage].text6, 
            price: '$3.19',
            count: countList[5],
            styles: { name: 'text-[#935f4c]', highlight1: 'text-[#fffae5]' }
        },
        {
            id: 7,
            img: '/images/5.PNG',
            name: 'Berry Chocolate',
            description: languages[selectedLanguage].text7, 
            price: '$3.49',
            count: countList[6],
            styles: { name: 'text-pink-300', highlight1: 'text-[#56382d]' }
        },
        {
            id: 8,
            img: '/images/8.PNG',
            name: 'Chocolate Delux',
            description: languages[selectedLanguage].text8, 
            price: '$3.19',
            count: countList[7],
            styles: { name: 'text-[#b49a87]', highlight1: 'text-[#d6ad60]' }
        },
        {
            id: 9,
            img: '/images/7.PNG',
            name: 'Vanilla Cloud',
            description: languages[selectedLanguage].text9, 
            price: '$2.79',
            count: countList[8],
            styles: { name: 'text-[#ebeae5]', highlight1: 'text-[#a1dbf1]' }
        },
        {
            id: 10,
            name: 'Double Chocolate',
            img: '/images/9.PNG',
            description: languages[selectedLanguage].text10, 
            price: '$3.49',
            count: countList[9],
            styles: { name: 'text-[#988686]', highlight1: 'text-[#5c4e4e]' }
        }
    ]

    const handleAdd = () => {
        const filteredDonuts = donutInformations.filter((donut) => donut.count > 0);
        if (filteredDonuts.length === 0) {
            openModal("You didnt select any donut")
        } else {
            console.log(filteredDonuts)
            let combinedName = "";
            let combinedPrice = 0;

            filteredDonuts.forEach((donut, index) => {
                combinedName += ` ${donut.name}`;
                combinedPrice += parseFloat(donut.price.replace('$', ''));

                if (index < filteredDonuts.length - 1) {
                    combinedName += " ";
                }
            });

            const donutBox = {
                name: combinedName,
                price: "$" + combinedPrice.toString(),
                count: 1,
                type: "Box",
                img: "/images/donutBox.png",
                styles: { name: 'text-[#fcfff3]', highlight1: 'text-[#fff4bd]' }
            };

            handleAddToCart([donutBox])
        }
        
    }

    const handleChangeCount = (operator, donutIndex) => {
        if(operator === '+' && totalCount === Number(activeBox)) {
            return
        }
        if(operator === '-' && countList[donutIndex] === 0) {
            return
        }
        let newList = []
        if(operator === '+') {
            newList = countList.map((count, index) => {
                if (donutIndex === index) {
                    return count + 1
                }
                return count
            })
            dispatch(setCountList(newList))
        } 
        else {
            newList = countList.map((count, index) => {
                if (donutIndex === index) {
                    return count - 1
                } 
                return count
            })
            dispatch(setCountList(newList))
        }
        let maxCount = 0
        newList.forEach((count) => {
            maxCount += count
        })
        dispatch(setTotalCount(maxCount))

    }

    const handleValueChange = (event, donutIndex) => {
        const value = Number(event.target.value); 

        if (isNaN(value) || value < 0 || value > Number(activeBox)) {
            return
        }
        const newList = countList.map((count, index) => {
            if (donutIndex === index) {
                return value
            } 
            return count
        })
        dispatch(setCountList(newList))
    }

    const renderedDonuts = donutInformations.map((donut, index) => {
        return (
            <div key={index} className='w-[55vw] md:w-[20vw] mb-10 flex flex-col items-center'>
                <div 
                    className="absolute mt-[-5vw] md:mt-[-2vw] flex justify-center items-center w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] rounded-full 
                        border-4 border-[#C42348] 
                        bg-transparent"
                    style={{ 
                        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%)'
                    }}
                />
                <img className='w-[40vw] md:w-[10vw]' src={donut.img}/>
                <div className='flex flex-col items-center'>
                    <h1 className="text-5xl text-center specialFont uppercase">
                        {donutInformations[index].name.split(' ').map((word, idx) => (
                            <span key={idx} className={donutInformations[index].styles[`highlight${idx + 1}`] || donutInformations[index].styles.name}>
                                {word}<br/>{' '}
                            </span>
                        ))}
                    </h1>
                    <div className='h-[32vh] flex flex-col justify-between'>
                        <p className="text-white text-center md:text-lg mt-3">{donutInformations[index].description}</p>
                        <div className='flex mt-3 items-center w-[100%] justify-between'>
                            <p className="text-white text-4xl md:text-5xl specialFont">{donutInformations[index].price}</p>
                            <div className='flex bg-[#C42348] w-[26%] md:w-[22%] rounded-xl p-1 items-center gap-3'>
                                <input 
                                    onChange={(event) => handleValueChange(event, index)} 
                                    onBlur={(event) => {
                                        if (event.target.value === "") {
                                          handleValueChange({ target: { value: "0" } }, index);
                                        }
                                      }}
                                    value={donutInformations[index].count} 
                                    className='bg-transparent w-[45%] text-white text-2xl'
                                />
                                <div>
                                    <GoChevronUp onClick={() => handleChangeCount('+', index)} color="white" size={20}/>
                                    <GoChevronDown onClick={() => handleChangeCount('-', index)} color="white" size={20}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    

    return(
        <div>
            <div className='text-white flex gap-5 mt-20 items-center justify-between px-10'>
                <div>
                    <div className="w-full"> 
                        <p className='mr-16 specialFont text-5xl uppercase' dangerouslySetInnerHTML={{ __html: languages[selectedLanguage].boxSize}}/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-5 mt-7 w-[35vw]">
                      <p id="3" onClick={handleClick} className={`${activeBox === '3' ? 'border-2 border-white' : ''} bg-[#C42348] cursor-pointer rounded-lg px-6 py-2`}>{languages[selectedLanguage].box3}</p>
                      <p id="6" onClick={handleClick} className={`${activeBox === '6' ? 'border-2 border-white' : ''} bg-[#C42348] cursor-pointer rounded-lg px-6 py-2`}>{languages[selectedLanguage].box6}</p>
                      <p id="10" onClick={handleClick}  className={`${activeBox === '10' ? 'border-2 border-white' : ''} bg-[#C42348] cursor-pointer rounded-lg px-6 py-2`}>{languages[selectedLanguage].box10}</p>
                    </div>
                </div>
                <div className='absolute right-10 md:relative right-0 pt-[15vh] flex flex-col md:flex-row justify-between md:w-[30vw]'>
                    <span className='text-3xl font-thin'>{languages[selectedLanguage].addedDonuts} {totalCount}</span>
                    <button onClick={handleAdd} className="bg-[#C42348] text-white uppercase rounded-full px-5 py-1">{languages[selectedLanguage].addToCart}</button>
                </div>
            </div>
            <div className='flex mt-20 flex-wrap gap-16 justify-center'>
                {renderedDonuts}
            </div>
            {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
        </div>
    )
}

export default CreateBoxPage;