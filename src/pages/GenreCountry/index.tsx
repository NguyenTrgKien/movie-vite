import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
// import { State } from "../../redux/rooReducer";
import { rootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import TurnPage from "../../components/TurnPage";
import { homeType } from "../Home/homeSlice";
import { setGenrecountry } from "./actionGenreCountry";
import Loading from "../../components/Loading";
import { dataContext } from "../../components/Context";

function GenreCountry() {
    const {id} = useParams();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const movieCountrie = useSelector((state: rootState) => state.genrecountry.genrecountry);
    const movieCountries: homeType[] = movieCountrie.results;
    const searchParam = new URLSearchParams(location.search);
    const name = searchParam.get('name') || '';
    const currentPage = Number(searchParam.get('page') || '1');
    const pages = movieCountrie.total_pages;
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    
    useEffect(() => {
        const fetchData = async() => {
            if(id) {
                await dispatch(setGenrecountry({country: id, page: currentPage, language: currentLang}));
                setTimeout(() => {
                    setIsLoading(false); // Sau 2 giây, thay đổi trạng thái isLoading
                }, 500);
            }
        }
        fetchData();
    }, [id, dispatch, currentPage, currentLang]);
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [id, currentPage, location]);

    if(isLoading){
        return(
            <Loading/>
        )
    }
    
    return (  
        <div className="w-full h-full">
            <Header/>
            {
                movieCountries.length > 0 && (
                    <div className="w-full h-auto mt-[8rem] md:mt-[10rem] px-[1.5rem] md:px-[15rem] pb-[6rem]">
                        <h3 className="text-[2rem] md:text-[4rem] font-semibold text-white"> 
                            Phim {name}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-[1.5rem] md:gap-x-[2rem] gap-y-[5rem] mt-[1rem] md:mt-[2rem]">
                            {
                                movieCountries.map((item) => {
                                    return (
                                        <Link key={item.id} to={`/detailmovie/${item.id}`} target="_blank" className="w-full h-full hover:scale-[1.1] rounded-[.4rem] transition-all duration-[.25s] hover:z-50">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                                                className="w-full h-full object-cover rounded-[.4rem]"
                                            />
                                            <h4 className="text-white mt-[.4rem] lineLimitNav">
                                                {item.title}
                                            </h4>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                )
            }
            <TurnPage address={'genrecountry'} currentPage={currentPage} pages={pages} id={id ? id : ''} name={name}/>
            <Footer/>
        </div>
    );
}

export default GenreCountry;    