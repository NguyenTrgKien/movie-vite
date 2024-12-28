import { faAngleDown, faAngleLeft, faBars, faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/image/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { dataContext } from '../Context';
import { Link } from 'react-router-dom';
import Login from '../../pages/Login';
import Loading from '../Loading';
import { languageType } from '../Context/contextSlice';


const countries = [
    {
        id: 'VN',
        iso_639_1: "vi",
        name: 'VietNam'
    },
    {
        id: 'KR',
        iso_639_1: "ko",
        name: 'Korea'
    },
    {
        id: 'US',
        iso_639_1: "en",
        name: 'America'
    },
    {
        id: 'CN',
        iso_639_1: "zh",
        name: 'China'
    },
    {
        id: 'TH',
        iso_639_1: "th",
        name: 'ThaiLand'
    }
]

function Header({theme}: {theme?: string}) {
    const context = useContext(dataContext);
    const handleChangLang = context.handleChangeLang;
    const [menuMobile, setMenuMobile] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const [bgHeader, setBgHeader] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoading, setIsLoaing] = useState(false);
    const listGenre = context.genre;
    const language = context.language;
    const [showLanguage, setShowLanguage] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= 100){
                setBgHeader(true)
            }else{
                setBgHeader(false);
            }
            
        }
        window.addEventListener('scroll',handleScroll);
        return () => {removeEventListener('scroll',handleScroll)}
    }, []);

    useEffect(() => {
        const handleClickMenu = (event:MouseEvent): void => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setMenuMobile(false);
            }
        }
        document.addEventListener('click',handleClickMenu);
        return () => {
            document.removeEventListener('click', handleClickMenu);
        }
    }, []);

    const handleLanguage = (lang: string) => {
        if(lang){
            handleChangLang(lang);
        }
    }

    const handleCloseLogin = () => {
        setShowLogin(false);
    }

    return (  
        <div className={`w-full h-[4.8rem] md:h-[6.6rem] fixed top-0 left-0 z-[900] flex flex-col md:flex justify-center ${theme === 'dark' || bgHeader ? 'bg-[#000]' : 'bg-[#000] md:bg-[transparent]'} md:py-0 py-[.6rem] px-[1.5rem] md:px-[6.5rem] transition-all duration-[.8s]`}>
            <div className='flex items-center'>
                <div className="flex items-center gap-[1rem] md:gap-x-[3rem]">
                    <div className='md:hidden'
                        ref={menuRef}
                    >
                        <FontAwesomeIcon icon={faBars} className='text-[1.6rem] text-white'
                            onClick={() => setMenuMobile(prev => !prev)}
                        />
                        {
                            menuMobile && (
                                <div className='fixed top-0 left-0 w-full h-full bg-[#31313172] z-0'
                                    onClick={() => setMenuMobile(false)}
                                >
                                </div>
                            )
                        }
                        <div className={`fixed z-[999] w-[80%] h-[100vh] top-0 left-0 bg-bgPrimary translate-x-[-100%] ${menuMobile ? "translate-x-[0]" : "translate-x-[-100%]"} transition-all duration-[.5s] overflow-y-auto`}>
                            <div className='flex items-center w-full h-[8rem] px-5 bg-primary gap-4'>
                                <img
                                    src='https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/7/b/g/small-poster-black-black-goku-dragon-ball-super-sl-16904-wall-original-imagm2zjaehqjsmk.jpeg?q=90&crop=false'
                                    className='w-[4rem] h-[4rem] rounded-[50%] object-cover'
                                />
                                <span>User127654r</span>
                            </div>
                            <div className='px-5 py-5 text-[1.9rem] text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                                New movie
                            </div>
                            <div className='px-5 py-5 text-[1.9rem] text-primary border-b-[.1rem] border-[#444444]'
                                onClick={() => setShowLanguage(true)}
                            >
                                Language
                            </div>
                            <div className='px-5 py-5 text-[1.9rem] text-[#cfcece] border-b-[.1rem] border-[#444444]'>
                                Genre
                                {
                                    <div className='flex items-start'>
                                        <div className='pr-24 border-r-[.1rem] border-[#393939]'>
                                        {
                                            listGenre.length > 0 && listGenre.map((value, index) => {
                                                if(index >= 10){return;}    
                                                return (
                                                    <Link key={value.id} to={`/listgenre/${value.id}?name=${value.name}`} target='_blank' className='relative text-[1.4rem] text-[#747474] block py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>- {value.name}</Link>
                                                )
                                            })
                                        }
                                        </div>
                                        <div className='pl-6'>
                                        {
                                            listGenre.length > 0 && listGenre.map((value, index) => {
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
                    <Link to='/'>
                        <img 
                            src={Logo}
                            className="w-[7rem] h-[2rem] md:w-[10rem] md:h-[3rem] cursor-pointer"
                        />
                    </Link>
                    <Link to='/' className='text-white relative text-[1.6rem] cursor-pointer select-none beforeItemMenu hovermenuitem hover:text-[#ccc] transition hidden md:block'>
                        Home
                    </Link>
                    <div className='text-white relative text-[1.6rem] cursor-pointer select-none beforeItemMenu hovermenuitem hover:text-[#ccc] transition hidden md:block'>
                        New movie
                    </div>
                    <Tippy
                        placement='bottom-start'
                        interactive={true}
                        render={(attrs) => {
                            return (
                                <div {...attrs} className='relative flex gap-12 min-w-[20rem] h-auto bg-[#111319] text-white py-2 px-6 triangular rounded-[.6rem] shadow-sm shadow-[#313131]'>
                                    <div className='pr-12 py-3 border-r-[.1rem] border-[#393939]'>
                                        {
                                            listGenre.length > 0 && listGenre.map((value, index) => {
                                                if(index >= 10){return;}    
                                                return (
                                                    <Link key={value.id} to={`/listgenre/${value.id}?name=${value.name}`} target='_blank' className='relative block py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>{value.name}</Link>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        {
                                            listGenre.length > 0 && listGenre.map((value, index) => {
                                                if(index < 10){return;}
                                                return (
                                                    <Link key={value.id} to={`/listgenre/${value.id}?name=${value.name}}`} target='_blank' className='relative block py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>{value.name}</Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }}
                    >
                        <div className='items-center gap-2 text-white relative text-[1.6rem] cursor-pointer select-none hover:text-[#ccc] transition hidden md:flex'>
                            Genre
                            <FontAwesomeIcon icon={faAngleDown} className='text-[1.2rem] mt-[.2rem]'/>
                        </div>
                    </Tippy>
                    <Tippy
                        placement='bottom-start'
                        interactive={true}
                        render={(attrs) => {
                            return (
                                <div {...attrs} className='relative min-w-[20rem] h-auto bg-[#111319] text-white py-2 px-6 triangular rounded-[.6rem] shadow-sm shadow-[#313131]'>
                                    <div>
                                        {
                                            countries.map((value) => {
                                                return (
                                                    <Link key={value.id} to={`/genrecountry/${value.id}?name=${value.name}`} target='_blank' className='relative block py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'>{value.name}</Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }}
                    >
                        
                        <div className='items-center gap-2 text-white relative text-[1.6rem] cursor-pointer select-none hover:text-[#ccc] transition hidden md:flex'>
                            Country
                            <FontAwesomeIcon icon={faAngleDown} className='text-[1.2rem] mt-[.2rem]'/>
                        </div>
                    </Tippy>
                </div>
                <div className="ml-[auto] flex items-center gap-x-[1rem] md:gap-x-[2.5rem]">
                    <div className={`relative bg-transparent w-[16rem] md:w-[35rem] h-[2.8rem] md:h-[3.5rem] rounded-[.2rem] transition-all duration-[20rem] bg-[transparent`}>
                        <input
                            type='text'
                            className={`w-full h-full md:block rounded-[.2rem] outline-none border-none md:bg-[#6363638a] bg-[#858585] text-white pl-[1rem] text-[1.2rem]`}
                            placeholder='Search.......'
                        />
                        <div className={`absolute h-[2.8rem] md:h-[3.5rem] bg-[transparent] sbg-[#6363638a] top-0 right-0 flex justify-center items-center rounded-[.2rem] cursor-pointer `} 
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[#fff] px-5 border-l-[.1rem] border-[#bfbfbf]'/>
                        </div>
                    </div>
                    <Tippy
                        placement='bottom'
                        interactive={true}
                        render={(attrs) => {
                            return (
                                <div {...attrs} className='relative min-w-[10rem] max-h-[50rem] overflow-y-auto removeScrollbar bg-[#111319] text-white py-2 px-6 triangular rounded-[.6rem] shadow-sm shadow-[#313131]'>
                                    {
                                        language?.length > 0 && language.map((lang: languageType) => {
                                            if(lang?.name === '') return;
                                            return (
                                                <div key={lang.iso_639_1} className='relative py-3 hover:text-primary hover:cursor-pointer hoverBorder transition-all duration-[.25s]'
                                                    onClick={() => handleLanguage(lang.iso_639_1)}
                                                >
                                                    {lang.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )}}
                        >
                        <div className='flex-col text-white hover:text-[#ccc] transition hidden md:flex'>
                            <FontAwesomeIcon icon={faGlobe} />
                            <div className='text-[1.6rem] select-none'>
                                Language
                            </div>
                        </div>
                    </Tippy>
                    <div className='flex flex-col text-white'
                        onClick={() => {
                            setIsLoaing(true);
                            setTimeout(() => {
                                setIsLoaing(false);
                                setShowLogin(true);
                            },800);
                        }}
                    >
                        <div className='text-[1.5rem] px-3 py-1 md:py-3 md:px-7 rounded-[.4rem] bg-[red] hover:bg-[#ff4444] select-none transition-all duration-[.25s] cursor-pointer'>
                            Login
                        </div>
                    </div>
                    {isLoading && <Loading/>}
                    {showLogin && <Login onClose={handleCloseLogin} />}
                </div>
            </div>
        </div>
    );
}

export default Header;