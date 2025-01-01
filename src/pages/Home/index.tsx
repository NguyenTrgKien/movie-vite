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
    const [contentTransfer, setContentTransfer] = useState(false);
    const elementScroll = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const {popular, genre, trending, upcoming, toprated, animation, newmovie, adventure} = useSelector((state: rootState) => state.home);
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    const [showItem, setShowItem] = useState([false, false, false, false, false, false]);
    const itemRef = useRef<(HTMLDivElement | null)[]>([]);
    
    useEffect(() => {
        // setTimeout(() => {
            if (itemRef.current.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        const index = itemRef.current.indexOf(entry.target as HTMLDivElement);
                        if (entry.isIntersecting) {
                            setShowItem(prev => {
                                const updatedItems = [...prev];
                                updatedItems[index] = true; 
                                return updatedItems;
                            });
                        }else{
                            setShowItem(prev => {
                                const updatedItems = [...prev];
                                updatedItems[index] = false;
                                return updatedItems;
                            })
                        }
                    });
                }, {
                    threshold: 0
                });
        
                itemRef.current.forEach((element) => {
                    if (element) observer.observe(element);
                });
        
                return () => {
                    itemRef.current.forEach((element) => {
                        if (element) observer.unobserve(element);
                    });
                };
            }
        // }, 2000);
    }, [newmovie]);

    useEffect(() => {
        const fetchData = async() => {
            await Promise.all([
                dispatch(setPopular(currentLang)),
                dispatch(setGenre(currentLang)),
                dispatch(setTrending(currentLang)),
                dispatch(setUpcoming(currentLang)),
                dispatch(setToprated(currentLang)),
                dispatch(setAnimation(currentLang)),
                dispatch(setNewmovie({language: currentLang, page: 1})),
                dispatch(setAdventure(currentLang)),
            ]);
            setIsLoading(false);
        }
        fetchData();
    },[dispatch, currentLang]);

    const newmovies = newmovie.results;
    const currentMovie: homeType = newmovies[index];
    
    const handleScroll = (direc: string) => {
        const element = elementScroll.current;
        if(element){
            if(direc === 'right'){
                setContentTransfer(true);
                setTimeout(() => {
                    setIndex((prev) => {
                        if(prev === newmovies.length - 1){
                            return prev = 0;
                        }else{
                            return prev = prev + 1;
                        }
                    });
                    setContentTransfer(false);
                }, 500);
            }else if(direc === 'left'){
                setContentTransfer(true);
                setTimeout(() => {
                    setIndex((prev) => {
                        if(prev === 0){
                            return prev = newmovies.length - 1;
                        }else{
                            return prev = prev - 1;
                        }
                    });
                    setContentTransfer(false);
                },500);
            }
            
        }
    }

    useEffect(() => {
        if(newmovies.length > 0){
            const element = elementScroll.current;
            if(element){
                const itemInterval = setInterval(() => {
                    setContentTransfer(true);
                    setTimeout(() => {
                        setIndex((prev) => (prev === newmovies.length - 1 ? 0 : prev + 1));
                        setContentTransfer(false);
                    }, 500);
                }, 6000);
                return () => {clearInterval(itemInterval)}
            }
        }
    }, [newmovies]);

    if(isLoading){
        return (
            <Loading/>
        )
    }
    return (  
        <div className="w-full h-full">
            <Header/>
            <div className="w-full pt-[4.8rem] md:pt-0 h-auto pb-[6rem]">
                <div className="relative w-full h-heightBody pb-[2rem] md:pb-0">
                    <div className="absolute top-[50%] translate-y-[-50%] left-[.4rem] w-[5rem] h-[5rem] bg-[transparent] hidden md:flex justify-center items-center rounded-[50%] z-[10] border-[.1rem] border-[#565656] hover:border-primary transition-all duration-[.25s] group"
                        onClick={() => {
                            handleScroll('left')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-[2.2rem] text-[#818181] group-hover:text-white"/>
                    </div>
                    <div className="relative w-full h-[25rem] md:h-[calc(100vh-8rem)] removeScrollbar overflow-hidden">
                        <div className={`w-full h-[25rem] md:h-[calc(100vh-8rem)] grid grid-flow-col auto-cols-[100%] overflow-hidden removeScrollbar backgroundBorderBlur ${contentTransfer ? "opacity-[.4] " : "opacity-[1]"} transition-all duration-[.5s]`}
                            ref={elementScroll}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`}
                                className={`w-full h-full object-cover select-none`}
                            />
                        </div>
                        
                        {
                            newmovies?.length > 0 && (
                                <div className={` absolute md:top-[55%] top-[70%] translate-y-[-50%] left-[1.5rem] md:left-[6.5rem] w-[80%] h-[20rem] md:w-[75rem] md:min-h-[35rem] md:max-h-[40rem] z-10 ${contentTransfer ? "opacity-0" : ""} transition-all duration-[1s]`}
                                >
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
                                        <div className="flex gap-x-[.5rem] flex-wrap items-center text-[1.2rem] md:text-[1.4rem] mt-[1rem]">
                                            {
                                                genre && genre.map((it: homeType, index) => {
                                                    if(currentMovie.genre_ids.includes(it.id)){
                                                        return (
                                                            <span key={index} className="px-[1rem] bg-[#767676] text-white rounded-[.2rem]">{it.name}</span>
                                                        )
                                                    }
                                                    return null;
                                                })
                                            }
                                        </div>
                                        <div className="text-white mt-[1rem] text-[1.2rem] md:text-[1.4rem] md:lineLimitMobile md:lineLimitLg hidden">
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
                                            }))}`} target="_blank" className={`relative w-[9rem] h-[4rem] md:w-[14rem] md:h-[6rem] border-[.1rem] border-primary rounded-[10rem] flex justify-center items-center gap-[1rem] cursor-pointer md:hover:bg-primary transition-all duration-[.25s]`}> 
                                                <div className="">
                                                    <FontAwesomeIcon icon={faPlay} className="text-[1.4rem] md:text-[2rem] text-[#ffffff]"/>
                                                </div>
                                                <div className="text-[1.4rem] md:text-[1.8rem] font-semibold text-white select-none">
                                                    Play
                                                </div>
                                            </Link>
                                            <Tippy 
                                                placement="right"
                                                content="Sưu tập"
                                                animation="scale"
                                                className="custom-tippy"
                                            >
                                                <div className="relative w-[4rem] h-[4rem] md:w-[6.6rem] md:h-[6.5rem] rounded-[50%] flex justify-center items-center bg-[#eaeaea18] group-hover:opacity-[1] transition-all duration-[.25s] hover:bg-[#7e7e7e]">
                                                    <FontAwesomeIcon icon={faFolder} className="text-[#e7e7e7] text-[1.4rem] md:text-[2.2rem] ml-[.3rem]"/>
                                                </div>
                                            </Tippy>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                    <div className='md:hidden absolute z-[100] bottom-12 right-6 flex items-center gap-5'>
                        <div className='w-[4rem] h-[4rem] border-[.1rem] border-[#565656] flex justify-center items-center rounded-[50%]'
                            onClick={() => handleScroll("left")}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} className='textx-[1.5rem] text-[#9b9b9b]'/>
                        </div>
                        <div className='w-[4rem] h-[4rem] border-[.1rem] border-[#565656] flex justify-center items-center rounded-[50%]'
                            onClick={() => handleScroll("right")}
                        >
                            <FontAwesomeIcon icon={faAngleRight} className='textx-[1.5rem] text-[#9b9b9b]'/>
                        </div>
                    </div>
                    <div className="absolute top-[50%] translate-y-[-50%] right-[.4rem] w-[5rem] h-[5rem] bg-[transparent] hidden md:flex justify-center items-center rounded-[50%] z-[10] border-[.1rem] border-[#565656] hover:border-primary transition-all duration-[.25s] group"
                        onClick={() => {
                            handleScroll('right')
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleRight} className="text-[2.2rem] text-[#818181] group-hover:text-white"/>
                    </div>
                </div>
                <div className={`${showItem[0] ? "translate-y-[-80px] opacity-[1]" : "translate-y-[50px] opacity-0"} transition-all duration-[1.5s] w-full md:h-[38rem] relative`}
                    ref={(element) => {itemRef.current[0] = element}}
                >
                    <Nav popular={popular} genre={genre}/>
                </div>
                <div className={`${showItem[1] ? "translate-y-[0] opacity-[1]" : "translate-y-[50px] opacity-0"} transition-all duration-[1.5s] w-full md:h-[38rem] relative `}
                    ref={(element) => {itemRef.current[1] = element}}
                >
                    <Nav adventure={adventure} genre={genre}/>
                </div>
                <div className={`${showItem[2] ? "translate-y-[0] opacity-[1]" : "translate-y-[50px] opacity-0"} transition-all duration-[1.5s] w-full md:h-[38rem] relative md:mt-[8rem]`}
                    ref={(element) => {itemRef.current[2] = element}}
                >
                    <Nav trending={trending} genre={genre}/>
                </div>
                <div className={`${showItem[3] ? "translate-y-[0] opacity-[1]" : "translate-y-[50px] opacity-0"} transition-all duration-[1.5s] w-full md:h-[38rem] relative md:mt-[8rem]`}
                    ref={(element) => {itemRef.current[3] = element}}
                >
                    <Nav toprated={toprated} genre={genre}/>
                </div>
                <div className={`${showItem[4] ? "translate-y-[0] opacity-[1]" : "translate-y-[50px] opacity-0"} transition-all duration-[1.5s] w-full md:h-[38rem] relative md:mt-[8rem]`}
                    ref={(element) => {itemRef.current[4] = element}}
                >
                    <Nav animation={animation} genre={genre}/>
                </div>
                <div className={`${showItem[5] ? "translate-y-[0] opacity-[1]" : "translate-y-[50px] opacity-0"} transition-all duration-[1.5s] w-full md:h-[38rem] relative md:mt-[8rem]`}
                    ref={(element) => {itemRef.current[5] = element}}
                >
                    <Nav upcoming={upcoming} genre={genre}/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
