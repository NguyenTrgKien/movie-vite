import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { AppDispatch } from "../../redux/store";
// import { State } from "../../redux/rooReducer";
import { rootState } from "../../redux/store";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { setDetailcast, setMoviecast } from "./actionDetailcast";
import { homeType } from "../Home/homeSlice";
import Loading from "../../components/Loading";
import { dataContext } from "../../components/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function DetailCast() {
    const {id} = useParams();
    const [old, setOld] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showImage, setShowImage] = useState(false);
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    const dispatch = useDispatch<AppDispatch>();
    const {detailcast, moviecast} = useSelector((state: rootState) => state.detailcast);
    const [moreOverview, setMoreOverview] = useState(false);
    useEffect(() => {
        const fetchData = async() => {
            if(id) {
            await Promise.all([
                dispatch(setDetailcast({id, language: currentLang})),
                dispatch(setMoviecast({id, language: currentLang})),
            ])
            setTimeout(() => {
                setIsLoading(false);
            },500);
        }
        }
        fetchData();
    }, [dispatch, id, currentLang]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Mobile nếu màn hình <= 768px
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize',handleResize);
        }
    }, []);
    
    useEffect(() => {
        if(detailcast.birthday){
            const old: string = detailcast.birthday;
            const year = Number(old.slice(0,4));
            const date = new Date();
            const currentYear = date.getFullYear()
            const birthdayCast = currentYear - year;
            setOld(birthdayCast);
        }
    }, [detailcast]);
    if(isLoading){
        return (
            <Loading/>
        )
    }
    
    return (  
        <div className="w-full h-auto bg-[#111319]">
            <Header/>
            <div className="w-full h-auto md:px-[25rem] pt-[7.2rem] md:pt-[14rem] pb-[10rem]">
            {
                detailcast && (
                    <div className="w-full h-auto md:flex md:flex-row gap-10 pb-[5rem] border-b-[.1rem] border-[#5d5d5d]">
                        <div className="md:w-[15rem] md:h-[15rem] h-[48rem] md:rounded-[50%]">
                            <div className={`relative h-full w-full ${isMobile ? "blurAvatar" : ""}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${detailcast.profile_path}`}
                                    className="w-full h-full md:rounded-[50%] object-cover "
                                    onClick={() => setShowImage(true)}
                                />
                            </div>
                            {
                                showImage && (
                                    <div className="fixed top-0 left-0 bg-[#131313a6] w-full h-full z-[100] hidden md:flex justify-center items-center"
                                        onClick={() => {
                                            setShowImage(false)
                                        }}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w1280${detailcast.profile_path}`}
                                            className="z-[200] w-[50rem] h-[50rem] rounded-[50%] object-cover"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowImage(true)
                                            }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className="relative md:w-[calc(100%-20rem)] h-auto md:px-0 px-[1.5rem] md:-mt-0 -mt-[8rem]">
                            <h3 className="text-[2.8rem] md:text-[3.5rem] font-semibold text-white">{detailcast.name}</h3>
                            <div className="flex items-center text-[1.4rem] md:text-[1.8rem] text-[#787878] mt-2">
                                <span>Tên gọi khác:</span>
                                {/* {detailcast.also_known_as.length > 0 && detailcast.also_known_as.find((it: string, index: number) => {if(index === 1) return it})} */}
                            </div>
                            <div className="w-full h-auto flex mt-3">
                                <div className="text-[1.4rem] md:text-[1.6rem] w-[35%] text-[#787878]">
                                    <div className="text-white">
                                        <span className="text-[#787878] pr-5">Giới tính:</span> {detailcast.gender === 1 ? 'Nữ' : 'Nam'}
                                    </div>
                                    <div className="text-white mt-3">
                                        <span className="text-[#787878] pr-5">Độ tuổi:</span> {old}
                                    </div>
                                </div>
                                <div className="text-[1.4rem] md:text-[1.6rem] w-[65%] text-[#787878]">
                                    <div className="text-white">
                                        <span className="text-[#787878] pr-5">Nghề Nghiệp:</span>{detailcast.known_for_department}
                                    </div>
                                    <div className="text-white mt-3">
                                        <span className="text-[#787878] pr-5">Ngày sinh:</span> {detailcast.birthday}
                                    </div>
                                    <div className="text-white mt-3">
                                        <span className="text-[#787878] pr-5">Quốc tịch:</span> {detailcast.place_of_birth}
                                    </div>
                                </div>
                            </div>
                            <div className={`text-white relative text-[1.4rem] md:text-[1.6rem] ${moreOverview ? "": "h-[7.7rem] lineLimit"}  mt-3`}>
                                {detailcast.biography}
                            </div>
                            {
                                detailcast.biography !== ""  && (
                                    moreOverview ? (
                                    <span className="absolute flex items-center gap-2 -bottom-[1rem] right-0 text-[1.5rem] text-primary p-4 rounded-[50%] shadowMoreInfo bg-bgPrimary cursor-pointer"
                                    onClick={() => setMoreOverview(prev => !prev)}
                                    >
                                        Close
                                        <FontAwesomeIcon icon={faAngleUp} className="text-[1.2rem] mt-1"/>
                                    </span>
                                    ): (
                                    <span className="absolute flex items-center gap-2 -bottom-[1rem] right-0 text-[1.5rem] text-primary p-4 rounded-[50%] shadowMoreInfo bg-bgPrimary cursor-pointer"
                                        onClick={() => setMoreOverview(prev => !prev)}
                                    >
                                        Xem thêm
                                        <FontAwesomeIcon icon={faAngleDown} className="text-[1.2rem] mt-1"/>
                            
                                    </span>
                                    )
                                )
                            }
                        </div>
                    </div>
                )
            }
            <div className="w-full h-auto mt-[2rem] md:px-0 px-[1.5rem]">
                <div className="text-[1.6rem] md:text-[2.5rem] text-white font-semibold">
                    Nội dung liên quan
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-x-[2rem] gap-y-[5rem] items-center pt-[1rem]">
                    {moviecast.cast && moviecast.cast.map((item: homeType) => {
                        if(item.poster_path === null) {
                            return;
                        }
                        return (
                            <Link to={`/detailmovie/${item.id}`} target="_blank" className="relative w-full h-[30rem] rounded-[.4rem] hover:scale-y-[1.1] hover:scale-x-[1.3] transition-all duration-[.25s] hover:z-50">
                                <img
                                    src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                                    className="w-full h-full rounded-[.4rem]"
                                />
                                <h4 className="text-[1.6rem] text-white pt-[.4rem] lineLimitNav">
                                    {item.title}
                                </h4>
                            </Link>

                        )
                    })}
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    );
}

export default DetailCast;