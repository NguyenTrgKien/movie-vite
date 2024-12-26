import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header";
import { faPlay, faShare, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { State } from "../../redux/rooReducer";
import { rootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import Footer from "../../components/Footer";
import { dataContext } from "../../components/Context";
import { setCast, setDetailmovie, setSimilar } from "./actionDetailmovie";
import { homeType } from "../Home/homeSlice";
import { Cast, detailmovieType, SimilarType } from "./detailMovieSlice";
import Loading from "../../components/Loading";


function DetailMovie() {
    const {id} = useParams();// Lấy các id trong các đường dẫn router
    const dispatch = useDispatch<AppDispatch>();
    const context = useContext(dataContext);
    const [isLoading, setIsLoading] = useState(true);
    const genre = context.genre;
    const currentLang = context.currentLang;
    
    const {detailmovie, similar, cast} = useSelector((state: rootState) => state.detailmovie);
    
    
    useEffect(() => {
        const fetchData = async() => {
            if(id){
                await Promise.all([
                    dispatch(setDetailmovie({id, language: currentLang})),
                    dispatch(setSimilar({id, language: currentLang})),
                    dispatch(setCast({id, language: currentLang})),
                ])
                setTimeout(() => {
                    setIsLoading(false);
                },500)
            }
        }
        fetchData();
    }, [id, dispatch, currentLang]);

    if(isLoading){
        return (
            <Loading/>
        )
    }
    
    return (  
        <div className="w-full h-auto">
            <Header/>
            {detailmovie && (
                <div className="w-full h-auto md:pt-0 pt-[7.4rem]">
                    <div className="relative w-full h-max">
                        <div className="w-full h-full md:block hidden absolute top-0 left-0 backgroundBlur z-0">
                            <img
                                src={`https://image.tmdb.org/t/p/w1280${detailmovie.backdrop_path}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-full min-h-[40rem] pt-0 md:pt-[15rem] md:px-[10rem] md:flex gap-[4rem] pb-[2rem] md:pb-[13.8rem]">
                            <div className="relative w-full h-[20rem] md:max-w-[35rem] md:h-[45rem] rounded-[.5rem]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${detailmovie.poster_path}`}
                                    className="w-full h-full object-cover rounded-[.5rem] md:block hidden"
                                />
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${detailmovie.backdrop_path}`}
                                    className="w-full h-full object-cover rounded-[.5rem] md:hidden"
                                />
                                <Link to={`/watchmovie/${detailmovie.id}?info=${encodeURIComponent(JSON.stringify({
                                                    title: detailmovie.title,
                                                    date: detailmovie.release_date,
                                                    overview: detailmovie.overview,
                                                    vote: detailmovie.vote_average,
                                                    genre: genre.filter((it: homeType) => detailmovie.genres.some((value: detailmovieType) => value.id === it.id))
                                                }))}`} target="_blank" className="absolute top-0 left-0 w-full h-full hidden md:flex justify-center items-center hover:bg-[#53535374] transition-all duration-[.25s] rounded-[.5rem] group">
                                    <div className="w-[6.5rem] h-[6.5rem] bg-primary hidden md:flex justify-center items-center rounded-[50%] relative group-hover:animationPlay opacity-0 group-hover:opacity-[1] transition-all duration-[.5s]">
                                        <FontAwesomeIcon icon={faPlay} className="text-[2.8rem] pl-2 text-white z-[1]"/>
                                    </div>
                                </Link>
                            </div>
                            <div className="max-w-[80rem] h-auto z-50 md:mt-0 mt-2 md:px-0 px-[1.5rem]">
                                <div className="text-[2.8rem] md:text-[6rem] font-bold text-white leading-[1] mb-[1rem]">
                                    {detailmovie.title}
                                </div>
                                <div className="text-[1.4rem] md:text-[1.6rem] text-white flex items-center mt-[.8rem]">
                                    <div className="flex gap-1 items-center pr-4 mr-4 border-r-[.1rem] border-[#ccc]">
                                        <FontAwesomeIcon icon={faStar} className="text-primary"/>
                                        <span >
                                            {detailmovie.vote_average.toFixed()}
                                        </span>
                                    </div>
                                    <div>
                                        {detailmovie.release_date}
                                    </div>
                                </div>
                                <div className="flex items-center text-[1.4rem] md:text-[1.6rem] gap-2 mt-[.8rem]">
                                    {detailmovie.genres.map((value: {id: number, name: string}) => {
                                        return (
                                            <span key={value.id} className="px-[.6rem] py-1 bg-[#5b5b5b] text-white">{value.name}</span>
                                        )
                                    })}
                                </div>
                                <div className="text-white mt-[.8rem] text-[1.4rem] md:text-[1.6rem]">
                                    <span className="text-[#ccc]">Genre: </span>{cast?.length > 0 && (
                                        cast.map((value: Cast) => {
                                            return (
                                                <Link to={`/detailcast/${value.id}`} target="_blank" className="hover:text-primary transition-all duration-[.25s] cursor-pointer">
                                                    {`${value.name}, `}                                             
                                                </Link>
                                            )
                                        })
                                    )}
                                </div>
                                <div className="text-[1.4rem] md:text-[1.6rem] mt-[.8rem] text-white">
                                    <span className="text-[#ccc]">Overview: </span>{detailmovie.overview === '' ? 'Không có mô tả cho bộ phim này!': detailmovie.overview}
                                </div>
                                <div className="flex items-center max-w-[28rem] h-[8rem] bg-[#3e3e3e83] rounded-[.5rem] mt-[3rem] p-[1rem] md:p-[2rem]">
                                    <div className="flex items-center justify-center flex-col h-full w-[5rem] cursor-pointer pr-[2rem] mr-[2rem] border-r-[.1rem] border-[#ccc]">
                                        <FontAwesomeIcon icon={faShare} className="text-white text-[1.4rem] md:text-[1.6rem]"/>
                                        <span className="text-[1.4rem] md:text-[1.6rem] text-white hover:text-primary transition-all">Share</span>
                                    </div>
                                    <Link to={`/watchmovie/${detailmovie.id}?info=${encodeURIComponent(JSON.stringify({
                                                    title: detailmovie.title,
                                                    date: detailmovie.release_date,
                                                    overview: detailmovie.overview,
                                                    vote: detailmovie.vote_average,
                                                    genre: genre.filter((it: homeType) => detailmovie.genres.some((value: detailmovieType) => value.id === it.id))
                                                }))}`} target="_blank" className="inline-flex items-center gap-2 px-10 py-4 rounded-[10rem] bg-[transparent] border-[.1rem] border-primary hover:bg-primary transition-all duration-[.25s] cursor-pointer">
                                        <FontAwesomeIcon icon={faPlay} className="text-[1.4rem] md:text-[1.8rem] text-white"/>
                                        <span className="text-[1.5rem] text-white font-semibold">WATCH NOW</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-auto md:pt-[6rem] px-[1.5rem] md:px-[10rem] pb-[5rem]">
                        <div className="flex items-center gap-[2.5rem] border-b-[.1rem] border-[#6d6d6d]">
                            <span className="text-[2rem] font-semibold text-white pb-6 border-b-[.5rem] border-[blue]  ">Similar</span>
                            <span className="text-[2rem] font-semibold text-white pb-6">Cast</span>
                        </div>
                        {
                            similar?.length > 0 ? (
                                <div className="w-full h-auto grid grid-cols-2 md:grid-cols-6 gap-x-[1.5rem] md:gap-x-[2rem] gap-y-[5rem] pt-[2rem]">
                                    {
                                        similar.map((item: SimilarType) => {
                                            if(item.poster_path === null){return;}
                                            return (
                                                <Link key={item.id} to={`/detailmovie/${item.id}`} target="_blank" className="relative w-full h-[25rem] md:h-[30rem] rounded-[.4rem] hover:scale-[1.1] transition-all duration-[.25s]">
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                                                        className="w-full h-full"
                                                    />
                                                    <h4 className="text-[1.6rem] text-white pt-[.4rem] lineLimitNav">
                                                        {item.title}
                                                    </h4>
                                                </Link>
                                            )
                                        }) 
                                    }
                                </div>
                            ) : <div className="text-[3rem] mt-[2rem] p-9 w-full h-full text-[yellow] text-center">
                                .......... No Similar Results! ..........
                            </div>
                        }
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
}

export default DetailMovie;