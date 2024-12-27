import 'tippy.js/dist/tippy.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, rootState } from "../../redux/store";
import { useContext, useEffect, useRef, useState } from "react";
import { setAdventure, setAnimation, setGenre, setNewmovie, setPopular, setToprated, setTrending, setUpcoming } from "./actionHome";
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faFolder, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Loading from '../../components/Loading';
import { homeType } from './homeSlice';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { dataContext } from '../../components/Context';

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [contentTransfer, setContentTransfer] = useState(false);
    const elementScroll = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {popular, genre, trending, upcoming, toprated, animation, newmovie, adventure} = useSelector((state: rootState) => state.home);
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    
    
    useEffect(() => {
        const fetchData = async() => {
            await Promise.all([
                dispatch(setPopular(currentLang)),
                dispatch(setGenre(currentLang)),
                dispatch(setTrending(currentLang)),
                dispatch(setUpcoming(currentLang)),
                dispatch(setToprated(currentLang)),
                dispatch(setAnimation(currentLang)),
                dispatch(setNewmovie(currentLang)),
                dispatch(setAdventure(currentLang)),
            ]);
            setIsLoading(false);
        }
        fetchData();
    },[dispatch, currentLang]);

    const currentMovie: homeType = newmovie[index];

    const handleScroll = (direc: string) => {
        if(transitioning) return;
        const element = elementScroll.current;
        if(element){
            const {clientWidth} = element;
            if(direc === 'right'){
                setTransitioning(true);
                setContentTransfer(true);
                setTimeout(() => {
                    element.scrollBy({
                        left: clientWidth,
                        behavior: 'smooth',
                    })  
                    setIndex(prev => Math.min(prev + 1, newmovie.length - 1));
                    setContentTransfer(false);
                }, 500);
            }else if(direc === 'left'){
                setTransitioning(true);
                setContentTransfer(true);
                setTimeout(() => {
                    element.scrollBy({
                        left: -clientWidth,
                        behavior: 'smooth',
                    })
                    setIndex(prev => Math.max(prev - 1, 0));
                    setContentTransfer(false);
                },500);
            }
            setTimeout(() => {
                setTransitioning(false);
            }, 500);
        }
    }

    if(isLoading){
        return (
            <Loading/>
        )
    }
    return (  
        <div className="w-full h-full">
            <Header/>
            <div className="w-full pt-[7.2rem] md:pt-0 h-auto pb-[6rem]">
                <div className="relative w-full h-heightBody pb-[2rem] md:pb-0">
                    <div className="absolute top-[50%] translate-y-[-50%] left-[.4rem] w-[6rem] h-[6rem] bg-[transparent] hidden md:flex justify-center items-center rounded-[50%] z-[10] hover:bg-[#b1b1b1] text-[#737373] hover:text-[#fff] transition-all duration-[.25s]"
                        onClick={() => {
                            handleScroll('left')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-[3rem] "/>
                    </div>
                    <div className="relative w-full h-[25rem] md:h-[calc(100vh-6rem)] removeScrollbar overflow-hidden">
                        <div className='w-full h-[25rem] md:h-[calc(100vh-6rem)] grid grid-flow-col auto-cols-[100%] overflow-hidden removeScrollbar backgroundBorderBlur'
                            ref={elementScroll}
                        >
                            {newmovie?.length > 0 && newmovie.map((img: homeType) => {
                                return (
                                    <div  key={img.id} className={`w-full h-full`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w1280${img.backdrop_path}`}
                                            className='w-full h-full object-cover select-none'
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        
                        {
                            newmovie?.length > 0 && (
                                <div className={`absolute top-[55%] translate-y-[-50%] left-[1.5rem] md:left-[6.5rem] w-[75%] h-[20rem] md:w-[75rem] md:min-h-[35rem] md:max-h-[40rem] z-10 ${contentTransfer ? "opacity-0" : ""} transition-all duration-[1s]`}>
                                        <h2 className="text-[2.5rem] md:text-[7rem] font-bold text-white leading-[1]">
                                            {
                                                currentMovie.title
                                            }
                                        </h2>
                                        <div className="flex items-center mt-[1rem] text-[1.2rem] md:text-[1.4rem]">
                                            <div>
                                                <FontAwesomeIcon icon={faStar} className="text-primary"/>
                                                <span className="text-white pt-[.2rem] pl-[.1rem]">
                                                    {
                                                        currentMovie.vote_average.toFixed()
                                                    }
                                                </span>
                                            </div>
                                            <div className="text-white ml-[1rem] pl-[1rem] border-l-[.1rem]">
                                                {
                                                    currentMovie.release_date
                                                }
                                            </div>
                                        </div>
                                        <div className="flex gap-[.5rem] items-center text-[1.2rem] md:text-[1.4rem]">
                                            {
                                                genre && genre.map((it: homeType, index) => {
                                                    if(currentMovie.genre_ids.includes(it.id)){
                                                        return (
                                                            <span key={index} className="px-[1rem] bg-[#767676] text-white rounded-[.2rem] mt-[.6rem]">{it.name}</span>
                                                        )
                                                    }
                                                    return null;
                                                })
                                            }
                                        </div>
                                        <div className="text-white mt-[.6rem] text-[1.2rem] md:text-[1.4rem] lineLimitMobile md:lineLimitLg">
                                            <span className="inline-block text-[#ccc] ">Overview: </span> 
                                            {
                                                currentMovie.overview === "" ? ('Không có mô tả cụ thể nào cho phim này.') : currentMovie.overview
                                            }
                                        </div>
                                        <div className="flex gap-[1rem] items-center mt-[1.5rem] md:mt-[3rem]">
                                            <Link to={`/watchmovie/${currentMovie.id}?info=${encodeURIComponent(JSON.stringify({
                                                title: currentMovie.title,
                                                date: currentMovie.release_date,
                                                overview: currentMovie.overview,
                                                vote: currentMovie.vote_average,
                                                genre: genre.filter((it: homeType) => currentMovie.genre_ids.includes(it.id))
                                            }))}`} target="_blank" className={`relative w-[8rem] h-[3rem] md:w-[14rem] md:h-[6rem] bg-[#26bdeb] rounded-[10rem] flex justify-center items-center gap-[.5rem] hover:bg-[#48d4ff] cursor-pointer `}> 
                                                <div className="">
                                                    <FontAwesomeIcon icon={faPlay} className="text-[1.5rem] md:text-[3rem] text-[#ffffff]"/>
                                                </div>
                                                <div className="text-[1.5rem] md:text-[2rem] font-semibold text-white select-none">
                                                    Play
                                                </div>
                                            </Link>
                                            <Tippy 
                                                placement="right"
                                                content="Bộ sưu tập"
                                                animation="scale"
                                                className="custom-tippy"
                                            >
                                                <div className="relative w-[3rem] h-[3rem] md:w-[6.6rem] md:h-[6.5rem] rounded-[50%] flex justify-center items-center bg-[#eaeaea18] group-hover:opacity-[1] transition-all duration-[.25s] hover:bg-[#7e7e7e]">
                                                    <FontAwesomeIcon icon={faFolder} className="text-[#e7e7e7] text-[1.5rem] md:text-[2.2rem] ml-[.3rem]"/>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                    <div className="absolute top-[50%] translate-y-[-50%] right-[.4rem] w-[6rem] h-[6rem] bg-[transparent] hidden md:flex justify-center items-center rounded-[50%] z-[10] text-[#737373] hover:bg-[#b1b1b1] hover:text-[#fff] transition-all duration-[.25s]"
                        onClick={() => {
                            handleScroll('right')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className="text-[3rem] "/>
                    </div>
                </div>
                <div className="w-full md:h-[38rem] md:relative md:-top-[6rem]">
                    <Nav popular={popular} genre={genre}/>
                </div>
                <div className="w-full md:h-[38rem] relative">
                    <Nav trending={trending} genre={genre}/>
                </div>

                <div className="w-full md:h-[38rem] relative md:mt-[5rem]">
                    <Nav toprated={toprated} genre={genre}/>
                </div>
                <div className="w-full md:h-[38rem] relative md:mt-[5rem]">
                    <Nav adventure={adventure} genre={genre}/>
                </div>
                <div className="w-full md:h-[38rem] relative md:mt-[5rem]">
                    <Nav animation={animation} genre={genre}/>
                </div>
                <div className="w-full md:h-[38rem] relative md:mt-[5rem]">
                    <Nav upcoming={upcoming} genre={genre}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
