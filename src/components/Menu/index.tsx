import { Link } from "react-router-dom";
import { languageType } from "../Context/contextSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { homeType } from "../../pages/Home/homeSlice";

interface propMenu {
    language: languageType[],
    currentLang: string,
    menuMobile: boolean,
    setShowLanguage: (arg: boolean) => void,
    listGenre: homeType[],
    countries: {id: string, name: string, iso_639_1: string}[],
    showLanguage: boolean,
    handleLanguage: (lang: string) => void
}

function Menu({language, currentLang, menuMobile, setShowLanguage, listGenre, countries, showLanguage, handleLanguage}: propMenu) {
    
    return (  
        <div>
            <div className={`fixed z-[999] w-[80%] h-[100vh] top-0 left-0 bg-bgPrimary translate-x-[-100%] ${menuMobile ? "translate-x-[0]" : "translate-x-[-100%]"} transition-all duration-[.5s] overflow-y-auto`}>
                <div className='flex items-center w-full h-[8rem] px-5 bg-primary gap-4'>
                    <img
                        src='https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/7/b/g/small-poster-black-black-goku-dragon-ball-super-sl-16904-wall-original-imagm2zjaehqjsmk.jpeg?q=90&crop=false'
                        className='w-[4rem] h-[4rem] rounded-[50%] object-cover'
                    />
                    <span>User127654r</span>
                </div>
                <Link to={`/newmovie`} className='block px-5 py-5 text-[1.9rem] text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                    New movie
                </Link>
                <div className='px-5 py-5 text-[1.9rem] text-primary border-b-[.1rem] border-[#444444]'
                    onClick={() => setShowLanguage(true)}
                >
                    {
                        language?.length > 0 && language.find((it: languageType) => it.iso_639_1 === currentLang)?.english_name || "English"
                    }
                </div>
                <div className='px-5 py-5 text-[1.9rem] text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                    Genre
                    {
                        <div className='flex items-start'>
                            <div className='pr-24 border-r-[.1rem] border-[#393939]'>
                            {
                                listGenre.length > 0 && listGenre.map((value: homeType, index: number) => {
                                    if(index >= 10){return;}    
                                    return (
                                        <Link key={value.id} to={`/listgenre/${value.id}?name=${value.name}`} target='_blank' className='relative text-[1.4rem] text-[#747474] block py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>- {value.name}</Link>
                                    )
                                })
                            }
                            </div>
                            <div className='pl-6'>
                            {
                                listGenre.length > 0 && listGenre.map((value: homeType, index: number) => {
                                    if(index < 10){return;}
                                    return (
                                        <Link key={value.id} to={`/listgenre/${value.id}?name=${value.name}}`} target='_blank' className='relative text-[1.4rem] text-[#747474] block py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>- {value.name}</Link>
                                    )
                                })
                            }
                            </div>
                        </div>
                    }
                </div>
                <div className='px-5 py-5 text-[1.6rem] overflow-hidden text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                    Country
                    <div className='text-center'>
                            {
                                countries.map((value) => {
                                    return (
                                        <Link key={value.id} to={`/genrecountry/${value.id}?name=${value.name}`} target='_blank' className='relative block py-3 text-[1.4rem] text-[#747474] hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>{value.name}</Link>
                                    )
                                })
                            }
                        </div>
                </div>
                <div className='px-5 py-5 text-[1.9rem] text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                    Bộ sưu tập
                </div>
                <div className='px-5 py-5 text-[1.9rem] text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                    Lịch sử xem
                </div>
            </div>
            <div className={`fixed ${showLanguage ? "translate-x-[0]" : "translate-x-[-100%]"} top-0 left-0 w-full h-auto z-[999] py-16 text-center bg-bgPrimary transition-all duration-[.25s]`}>
                <FontAwesomeIcon icon={faAngleLeft} className='absolute top-6 left-6 text-[1.9rem] text-white'
                    onClick={() => setShowLanguage(false)}
                />
                <div className=' w-full h-[100vh] overflow-y-scroll' >
                    {
                        language?.length > 0 && language.map((lang: languageType) => {
                            if(lang?.name === '') return;
                            return (
                                <Link to={`/`} key={lang.iso_639_1} className='relative block py-6 text-[1.8rem] text-white hover:cursor-pointer transition-all duration-[.25s]'
                                    onClick={() => {
                                        setShowLanguage(false);
                                        handleLanguage(lang.iso_639_1)
                                    }}
                                >
                                    {lang.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Menu;