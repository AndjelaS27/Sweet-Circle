import React, {useState} from 'react';
import Donut from '../models/Donut';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { languages } from '../languages';
import { useSelector, useDispatch } from 'react-redux';
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { setFilling, setGlaze, setSprinkles, setNumber } from '../store/slices/createDonutSlice';
import { useAddToCart } from '../hooks/useAddToCart';
import { modelMap } from "../constants"

function CreateDonutPage() {
  const donutRef = useRef();
  const dispatch = useDispatch();
  const { handleAddToCart } = useAddToCart();

  const [createdDonnutCOunt, setCreatedDonutCount] = useState(1)
  const { activeFilling, activeGlaze, activeSprinkles } = useSelector((state) => {
    return state.createDonut;
  })

  const selectedLanguage = useSelector((state) => {
    return state.language.selectedLanguage;
  })
  
  const handleFilling = (idFilling) => {
      dispatch(setFilling(idFilling))
  }

  const handleGlaze = (idGlaze) => {
    dispatch(setGlaze(idGlaze))
  }

  const handleSprinkles = (idSprinkles) => {
    dispatch(setSprinkles(idSprinkles))
  }

  function getModelName(glaze, sprinkles) {
    console.log(`${glaze}${sprinkles}`)
    return `${glaze}${sprinkles}`;
  }

  const handleValueChange = (event) => {
    const value = Number(event.target.value); 

    if (isNaN(value) || value < 0 || value > 10) {
        return
    }

    dispatch(setNumber(value))
}

const handleChangeCount = (operator) => {
  if(operator === '+' && createdDonnutCOunt === 10) {
      return
  }
  if(operator === '-' && createdDonnutCOunt === 0) {
      return
  }
  let newDonutNumber = createdDonnutCOunt
  if(operator === '+') {
    setCreatedDonutCount(newDonutNumber += 1)
  } 
  else {
    setCreatedDonutCount(newDonutNumber -= 1)
  }
}

const handleAdd = () => {
  const donutToAdd = {
    name: 'My Donut',
    price: '$3.19',
    flavor: [activeGlaze],
    type: "Peace",
    count: createdDonnutCOunt,
    modal: `${activeGlaze}${activeSprinkles}`,
    styles: { name: 'text-[#b49a87]', highlight1: 'text-[#d6ad60]' }
  }
  handleAddToCart([donutToAdd])
}
  
  const activeTag = 'bg-white rounded-lg';
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-[90%] md:w-[60%] md:h-[100vh]'>
        <div className='flex ml-5 mt-16 h-[75vh] gap-5 md:gap-0 md:justify-between flex-col'>
          <div className='w-full md:w-[50vw] h-[15vh] bg-white p-3 rounded-2xl text-black'>
            <p className='font-extrabold'>Filling</p>
            <div className='flex text-black p-[3px] text-center mt-2 items-center bg-gray-200 rounded-xl justify-between'>
              <p onClick={(event) => handleFilling(event.target.textContent)} className={`flex items-center justify-center md:w-[9vw] h-[6vh] cursor-pointer ${activeFilling === 'Chocolate' ? activeTag : 'bg-tranpsarent'}`}>Chocolate</p>
              <p onClick={(event) => handleFilling(event.target.textContent)} className={`flex items-center justify-center md:w-[9vw] h-[6vh] cursor-pointer ${activeFilling === 'Strawberry' ? activeTag : 'bg-tranpsarent'}`}>Strawberry</p>
              <p onClick={(event) => handleFilling(event.target.textContent)} className={`flex items-center justify-center md:w-[7vw] h-[6vh] cursor-pointer ${activeFilling === 'Vanilla' ? activeTag : 'bg-tranpsarent'}`}>Vanilla</p>
              <p onClick={(event) => handleFilling(event.target.textContent)} className={`flex items-center justify-center md:w-[7vw] h-[6vh] cursor-pointer ${activeFilling === 'None' ? activeTag : 'bg-tranpsarent'}`}>None</p>
            </div>
          </div>
          <div className='w-full md:w-[50vw] h-[15vh] bg-white p-3 rounded-2xl text-black'>
            <p className='font-extrabold'>Glaze</p>
            <div className='flex p-[10px] items-center h-[8vh] rounded-xl justify-between'>
              <div className='flex p-[10px] mt-2 relative items-center w-full h-[8vh] rounded-xl justify-between'>
                <div className='flex flex-col justify-center items-center'>
                {activeGlaze === 'Strawberry' && (
                  <div className='border-[2px] border-red-500 w-9 h-9 rounded-full absolute top-0 z-10'/>
                )}
                <div onClick={(event) => handleGlaze(event.target.id)} id='Strawberry' className='flex items-center border-[1px] bg-red-500 justify-center rounded-full h-[30px] w-[30px]'/>
                  <p className={`mt-1 text-sm ${activeGlaze === 'Strawberry' ? 'text-black' : 'text-white'}`}>Strawberry</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                {activeGlaze === 'Vanilla' && (
                  <div className='border-[2px] border-amber-200 w-9 h-9 rounded-full absolute top-0 z-10'/>
                )}
                <div onClick={(event) => handleGlaze(event.target.id)} id='Vanilla' className='flex items-center border-[1px] justify-center bg-amber-100 rounded-full h-[30px] w-[30px]'/>
                  <p className={`mt-1 text-sm ${activeGlaze === 'Vanilla' ? 'text-black' : 'text-white'}`}>Vanilla</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  {activeGlaze === 'Chocolate' && (
                    <div className='border-[2px] border-amber-950 w-9 h-9 rounded-full absolute top-0 z-10'/>
                  )}
                  <div onClick={(event) => handleGlaze(event.target.id)} id='Chocolate' className='flex items-center border-[1px] justify-center border-white border-[3px] bg-amber-950 rounded-full h-[30px] w-[30px] box-content'/>
                  <p className={`mt-1 text-sm ${activeGlaze === 'Chocolate' ? 'text-black' : 'text-white'}`}>Chocolate</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  {activeGlaze === 'Caramel' && (
                    <div className='border-[2px] border-yellow-600 w-9 h-9 rounded-full absolute top-0 z-10'/>
                  )}
                  <div onClick={(event) => handleGlaze(event.target.id)} id='Caramel' className='flex z-50 items-center border-[1px] justify-center bg-yellow-600 rounded-full h-[30px] w-[30px]'/>
                  <p className={`mt-1 text-sm ${activeGlaze === 'Caramel' ? 'text-black' : 'text-white'}`}>Caramel</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-[50vw] h-[15vh] bg-white px-2 pt-3 md:p-3 rounded-2xl text-black'>
            <p className='font-extrabold'>Sprinkles</p>
            <div className='flex text-black p-[3px] text-center mt-2 items-center bg-gray-200 rounded-xl justify-between'>
              <p onClick={(event) => handleSprinkles(event.target.textContent)} className={`${activeSprinkles === 'Caramel' ? activeTag : 'bg-transparent'} flex items-center justify-center md:w-[7vw] h-[6vh] cursor-pointer`}>Caramel</p>
              <p onClick={(event) => handleSprinkles(event.target.textContent)} className={`${activeSprinkles === 'Sugar' ? activeTag : 'bg-transparent'} flex items-center justify-center md:w-[7vw] h-[6vh] cursor-pointer`}>Sugar</p>
              <p onClick={(event) => handleSprinkles(event.target.textContent)} className={`${activeSprinkles === 'Chocolate' ? activeTag : 'bg-transparent'} flex items-center justify-center md:w-[6vw] h-[6vh] cursor-pointer`}>Chocolate</p>
              <p onClick={(event) => handleSprinkles(event.target.textContent)} className={`${activeSprinkles === 'Strawberry' ? activeTag : 'bg-transparent'} flex items-center justify-center md:w-[6vw] h-[6vh] cursor-pointer`}>Strawberry</p>
              <p onClick={(event) => handleSprinkles("")} className={`${activeSprinkles === '' ? activeTag : 'bg-transparent'} flex items-center justify-center w-[6vw] h-[6vh] cursor-pointer`}>None</p>
            </div>
          </div>
          <div className='flex items-center justify-between md:w-[50vw] z-50'>
            <div className='flex bg-[#C42348] w-[15%] md:w-[10%] rounded-xl p-1 items-center justify-between gap-3'>
              <input 
                onChange={(event) => handleValueChange(event)} 
                value={createdDonnutCOunt} 
                className='bg-transparent w-[45%] text-white text-2xl'
              />
              <div>
                  <GoChevronUp onClick={() => handleChangeCount('+')} color="white" size={20}/>
                  <GoChevronDown onClick={() => handleChangeCount('-')} color="white" size={20}/>
              </div>
            </div>
            <div>
               <button onClick={handleAdd} className="bg-[#C42348] text-white uppercase rounded-full px-5 py-1">{languages[selectedLanguage].addToCart}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-[40%]'>
        <div
          className='mt-[-30vh] md:mt-0 h-[70vh] md:h-[80vh] md:w-[80%]'
          style={{ touchAction: 'none' }}
        >
          <Canvas shadows>
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
              target={[0, -4, 0]} 
              minDistance={10} 
              maxDistance={30} 
            />

          <Suspense fallback={null}>
            {modelMap[getModelName(activeGlaze, activeSprinkles)] ? (
              React.createElement(modelMap[getModelName(activeGlaze, activeSprinkles)], { ref: donutRef })
            ) : (
              <Donut />
            )}
          </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default CreateDonutPage;
