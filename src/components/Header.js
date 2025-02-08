import { useState } from "react"
import { PiShoppingCart } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { languages } from "../languages";
import { CiSearch } from "react-icons/ci";
import { setShowLanguage } from '../store/slices/languageSlice';
import { useSelector, useDispatch } from "react-redux";
import { validPages, validDonuts } from "../constants"

function Header ({selectedLanguage, onSelect}) {
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showLanguages = useSelector((state) => {
        return state.language.showLanguages
    })

    const handleSearchText = (e) => {
        setSearchText(e.target.value)
    }

    const handleLanguage = (event) => {
        onSelect(event.target.innerText)
        dispatch(setShowLanguage(false));
    }

    const languagesList = ['English', 'Srpski', 'Deutsch']
    const dropdownLanguages = languagesList.map((language) => {
        if(language === selectedLanguage) {
            return null
        }
        return <p className="cursor-pointer" onClick={handleLanguage}>{language}</p>
    })

    const handleClick = () => {
        dispatch(setShowLanguage(!showLanguages))
    }

    const handleSearchForm = (e) => {
        e.preventDefault();
        const normalizedSearchText = searchText.trim().toLowerCase();

        const pageMatch = Object.keys(validPages).find((page) =>
            page.toLowerCase().includes(normalizedSearchText)
        );
        const donutMatch = Object.keys(validDonuts).find((donut) =>
            donut.toLowerCase().includes(normalizedSearchText)
        );
        if (pageMatch) {
            navigate(validPages[pageMatch]);
            return;
        }
        else if (donutMatch) {
            navigate(`/shop?donut=${donutMatch}`);
            return;
        }
    }

    return (
        <div className="h-[12vh] flex justify-between text-white relative z-40">
            <Link to='/' className="flex">
                <img className="ml-5 h-[7vh] self-center md:h-[12vh] cursor-pointer mt-3" alt="logo" src='images/logo.png' />
            </Link>
            <div className="absolute md:relative md:top-0 w-full flex flex-row pl-5 md:pl-0 justify-start top-[12vh] items-center md:w-[45vw] text-lg font-thin md:flex gap-[5vw] z-10">
                <Link to='/' className="relative z-20 pointer-events-auto">
                    <h2 className="cursor-pointer">{languages[selectedLanguage].home}</h2>
                </Link>
                <Link to='/shop' className="relative z-20 pointer-events-auto">
                    <h2 className="cursor-pointer">{languages[selectedLanguage].shop}</h2>
                </Link>
                <Link to='/about' className="relative z-20 pointer-events-auto">
                    <h2 className="cursor-pointer">{languages[selectedLanguage].aboutUs}</h2>
                </Link>
                <Link to='/contact' className="relative z-20 pointer-events-auto">
                    <h2 className="cursor-pointer">{languages[selectedLanguage].contact}</h2>
                </Link>
            </div>

            <form onSubmit={handleSearchForm} className="flex items-center border-white border-[0.5px] w-[35vw] md:w-[20vw] self-center rounded-full ml-5">
                <CiSearch className="m-2" color="white" size={23}/>
                <input 
                  value={searchText} 
                  onChange={handleSearchText} 
                  className="md:w-[15vw] text-white bg-transparent"  
                  placeholder="Quick search..."
                />
            </form>
            <div className="flex items-center mr-10 gap-2">
                <Link to='/cart'>
                    <button className="bg-[#C42348] mr-2 w-10 h-10 rounded-full flex justify-center items-center">
                        <PiShoppingCart size={25}/>
                    </button>
                </Link>
                <div className="relative">
                    <p>{selectedLanguage}</p>
                    {showLanguages && (
                        <div className="absolute rounded-2xl left-[-10px] w-[7vw] p-2 mt-2 z-50" >
                            {dropdownLanguages}
                        </div>
                    )}
                </div>
                <GoChevronDown className="cursor-pointer" onClick={handleClick} size={20}/>
            </div>
        </div>
    )
}

export default Header;