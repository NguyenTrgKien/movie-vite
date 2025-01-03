import { faAngleLeft, faAngleRight, faArrowRightLong, faFolder, faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import { useRef } from "react";
import { Link } from "react-router-dom";
import { homeType } from "../../pages/Home/homeSlice";

interface NavProps{
    [key: string] : homeType[];
    genre: homeType[];
}

function Nav({genre, ...props}:NavProps ) {
    const elementScroll = useRef<HTMLDivElement | null>(null);

    const argumentProp = Object.values(props).find(arr => arr.length > 0) || [];

    const genreTitle = (() => {
        if (props.popular === argumentProp) return 'Popular';
        if (props.trending === argumentProp) return 'Trending';
        if (props.upcoming === argumentProp) return 'Upcoming';
        if (props.toprated === argumentProp) return 'Toprated';
        if (props.adventure === argumentProp) return 'Adventure';
        return 'Animation';
    })();

    const handleScroll = (scroll: string) => {
        if(elementScroll.current){
            const currentWidth = elementScroll.current.clientWidth;
            if(scroll === 'right'){
                elementScroll.current.scrollBy({
                    left: currentWidth,
                    behavior: 'smooth'
                })
            }else if(scroll === 'left'){
                elementScroll.current.scrollBy({
                    left: -currentWidth,
                    behavior: 'smooth',
                })
            }
        }
    } 
    
    return (  
        <div className="w-full md:h-[38rem] relative flex items-center px-[1.5rem] md:px-[4.5rem] pb-[3.5rem] md:pb-0"> 
            <div className="absolute -top-[1.8rem] md:-top-[3rem] text-white left-[1.5rem] md:left-[6.5rem] text-[1.6rem] md:text-[2.5rem] font-semibold">  
            {genreTitle}
            </div>
            <div className=" absolute top-[50%] translate-y-[-50%] left-[1.4rem] w-[4.5rem] h-[4.5rem] bg-[transparent] hidden md:flex justify-center items-center rounded-[50%] border-[.1rem] border-[#565656] hover:border-primary transition-all duration-[.25s] z-30 group"
                onClick={() => handleScroll('left')}
            >
                <FontAwesomeIcon icon={faAngleLeft} className="text-[2.2rem] text-[#818181] group-hover:text-white"/>
            </div>
            {/* // grif-auto-flow:column  dùng để set chiều ngang cho các phần tử con nằm theo chiều ngang và kích và kích thước của nó tương thích với nhau để hiển thị trên một layout cha */}
            <div className="w-[100%] h-auto md:px-[2rem] grid grid-flow-col auto-cols-[calc((100%-3.2rem)/3)] md:auto-cols-[calc((100%-7.9rem)/5)] items-center overflow-x-auto gap-x-[.8rem] md:gap-x-[2rem] removeScrollbar"
                ref={elementScroll}
            >
            {/* grid-auto-columns: value : dùng để set kích thước cho các item con*/}
            {
                argumentProp && argumentProp.map((item: homeType) => {
                    return (
                        <Link to={`/detailmovie/${item.id}`} target="_blank" key={item.id} className="relative w-full h-[84%] group hover:cursor-pointer rounded-[.5rem] scroll-snap-align md:hover:scale-[1.15] md:hover:z-[20] transition-all duration-[.25s] ">
                            <div className="w-full h-full relative md:group-hover:h-[40%] transition-all duration-[.25s] rounded-[.5rem] group-hover:rounded-bl-[0] group-hover:rounded-br-[0]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                                    className="w-full h-full object-cover  rounded-[.5rem] group-hover:rounded-bl-[0] group-hover:rounded-br-[0] select-none"
                                />
                                <div className="absolute hidden md:flex items-center gap-[.8rem] bottom-[.4rem] right-[2rem]">
                                    <Link to={`/watchmovie/${item.id}?info=${encodeURIComponent(JSON.stringify({
                                        title: item.title,
                                        date: item.release_date,
                                        overview: item.overview,
                                        vote: item.vote_average,
                                        genre: []
                                    }))}`} target="_blank" className="w-[4rem] h-[4rem] rounded-[50%] flex justify-center items-center bg-primary opacity-0 group-hover:opacity-[1] transition-all duration-[.25s] hover:bg-[#48c5ff]">
                                        <FontAwesomeIcon icon={faPlay} className="text-white text-[1.5rem] ml-[.3rem]"/>
                                    </Link>
                                    <Tippy 
                                        placement="top-end"
                                        interactive={true}
                                        content="Sưu tập"
                                        className="custom-tippy"
                                    >
                                        <div className="relative w-[4rem] h-[4rem] rounded-[50%] flex justify-center items-center bg-[#eaeaea] opacity-0 group-hover:opacity-[1] transition-all duration-[.25s] hover:bg-[#f4f4f4]">
                                            <FontAwesomeIcon icon={faFolder} className="text-[#808080] text-[1.5rem] ml-[.3rem]"/>
                                        </div>
                                    </Tippy>
                                    
                                </div>
                            </div>
                            <div className="w-full h-[0%] flex flex-col bg-[#383838] absolute bottom-0 md:group-hover:h-[60%] transition-all duration-[.25s] overflow-hidden md:group-hover:p-[.8rem] rounded-bl-[.5rem] rounded-br-[.5rem]">
                                <h3 className="text-[2.2rem] font-semibold text-white lineLimitNav">
                                    {
                                        item.title || item.name
                                    }
                                </h3>
                                <div className="flex items-center mt-[.2rem] text-[1.2rem]">
                                    <div>
                                        <FontAwesomeIcon icon={faStar} className="text-primary"/>
                                        <span className="text-white pt-[.2rem] pl-[.1rem]">
                                            {
                                                item.vote_average.toFixed()
                                            }
                                        </span>
                                    </div>
                                    <div className="text-white ml-[1rem] pl-[1rem] border-l-[.1rem]">
                                        {
                                            item.release_date || item.first_air_date
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-[.5rem] overflow-hidden mt-[.6rem]">
                                    {
                                        genre && genre.map((it: homeType, index) => {
                                            if(item.genre_ids.includes(it.id)){
                                                return (<span key={index} className="text-[1.2rem] px-[.2rem] bg-[#787878] text-white ">{it.name}</span>)
                                            }
                                            return null;
                                        })
                                    }
                                </div>
                                <div className="text-[1.2rem] text-white leading-[1.2] mt-[.6rem] lineLimit ">
                                    <span className="opacity-[.8]">Overview: </span>
                                    {
                                        item.overview === "" ? 'Không có mô tả cho bộ phim này!': item.overview
                                    }
                                </div>
                                <Link to={`/detailmovie/${item.id}`} target="_blank" className="text-[1.2rem] mt-auto text-end text-primary underline hover:text-[#7fd9ff] transition-all duration-[.25s]">
                                    Chi tiết <FontAwesomeIcon icon={faArrowRightLong} className="text-[1rem] "/>
                                </Link>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
            
            <div className="absolute top-[50%] translate-y-[-50%] right-[1.6rem] w-[4.5rem] h-[4.5rem] bg-[transparent] hidden md:flex justify-center items-center rounded-[50%] border-[.1rem] border-[#565656] hover:border-primary transition-all duration-[.25s] z-30 group"
                onClick={() => handleScroll('right')}
            >
                <FontAwesomeIcon icon={faAngleRight} className="text-[2.2rem] text-[#818181] group-hover:text-white"/>
            </div>
        </div>        
        
    );
}

export default Nav;