import { languages } from "../languages";

function AboutPage ({selectedLanguage}) {
    return (
        <div className='flex flex-col md:flex-row justify-between h-[85vh]'>
            <div className='md:mt-40 ml-5 z-20'>
                <h1 className='text-white mt-10 md:mt-0 mb-7 text-8xl specialFont'>Sweet Circle</h1>
                <p className='bg-[rgba(196,35,72,0.8)] md:bg-transparent rounded-xl p-2 w-[85vw] md:w-[30vw] text-[#EDE0CF] aboutFont text-4xl' dangerouslySetInnerHTML={{ __html: languages[selectedLanguage].quote}}/>
            </div>
            <div>
                <video 
                    src='https://www.dropbox.com/scl/fi/tqy48fm9b92yum352x5h2/aboutVideo.mp4?rlkey=cg4xqpy1dlfolbfiet0wgk829&st=18ww993c&dl=0&raw=1' 
                    autoPlay 
                    loop 
                    muted 
                    className='absolute left-0 top-0 size-full object-cover object-center'
                />
            </div>
            <div className='md:w-[33vw] z-40 mt-5 md:mr-5 flex flex-wrap md:flex-col justify-between text-white px-5 md:px-0'>
                <div className='flex mb-5 md:mb-0'>
                    <p>{languages[selectedLanguage].quality}</p>
                    <img className='hidden lg:block w-[16vw] h-[16vh]' src="images/quality.png"/>
                </div>
                <div className='flex mb-5 md:mb-0'>
                    <img className='hidden lg:block w-[16vw] h-[16vh]' src="images/naturalIngredients.png"/>
                    <p>{languages[selectedLanguage].naturalIngredients}</p>
                </div>
                <div className='flex mb-5 md:mb-0'>
                    <p>{languages[selectedLanguage].noAddedSugar}</p>
                    <img className='hidden lg:block w-[16vw] h-[16vh]' src="images/noAddedSugar.png"/>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
