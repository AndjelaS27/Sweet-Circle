import { Link } from 'react-router-dom';
import { languages } from '../languages';

function Main ({selectedLanguage}) {
    return (
        <div className='flex h-[90vh]'>
            <div className='w-[60%] ml-5 text-white flex flex-col justify-center z-10'>
                <h1 className='text-7xl font-thin'>{languages[selectedLanguage].grabYourFavorite}</h1>
                <p className='text-9xl specialFont uppercase font-bold'>{languages[selectedLanguage].donut}</p>
                <p className='text-xl mt-10 text-slate-300'>{languages[selectedLanguage].mainSubtitle}</p>
                <div>
                    <Link to='/shop'><button className='bg-[#C42348] mt-10 rounded-lg px-12 py-2'>{languages[selectedLanguage].orderNow}</button></Link>
                </div>
            </div>
            <div className='abosolute' style={{zIndex: -1}}>
                <video 
                    src='https://www.dropbox.com/scl/fi/mqezlsz64r4cbjd470vul/homeVideo.mp4?rlkey=4ckdcy9v9jnenh2t0rckhtda4&st=tkxzlmfo&dl=0&raw=1' 
                    autoPlay 
                    loop 
                    muted 
                    className='absolute z-10 left-0 top-0 size-full object-cover object-center'
                />
            </div>
        </div>
    )
}

export default Main;
