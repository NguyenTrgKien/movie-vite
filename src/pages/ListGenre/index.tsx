import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
// import { State } from "../../redux/rooReducer";
import { rootState } from "../../redux/store";
import { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import TurnPage from "../../components/TurnPage";
import { setListgenre } from "./actionListGenre";
import { homeType } from "../Home/homeSlice";
import Loading from "../../components/Loading";
import { dataContext } from "../../components/Context";

function ListGenre() {
    const {id} = useParams();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const listgenres = useSelector((state: rootState) => state.listgenre.listgenre);
    const listgenre = listgenres.results;
    
    const searchParam = new URLSearchParams(location.search);
    const name = decodeURIComponent(searchParam.get('name') || '');
    const currentPage = Number(searchParam.get('page') || '1');
    const pages = listgenres?.total_pages || 1; 
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    
    
    useEffect(() => {
        const fetchData = async() => {
            if(id && currentPage) {
                await dispatch(setListgenre({id, page: currentPage, language: currentLang}));
                setTimeout(() => {
                    setIsLoading(false); // Sau 2 giây, thay đổi trạng thái isLoading
                }, 500); // Delay 2 giây
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
        return (
            <Loading/>
        )
    }
    
    return (  
        <div className="w-full h-full">
            <Header/>
            <div className="px-[1.5rem] md:px-[15rem] h-auto mt-[8rem] md:mt-[10rem] pb-[8rem]">
                <h5 className="text-[2.2rem] md:text-[4rem] font-semibold text-white">
                    {name}
                </h5>
                <div className="w-full h-auto grid grid-cols-2 md:grid-cols-6 gap-[1.5rem] md:gap-x-[2rem] gap-y-[5rem] mt-[1rem] md:mt-[2rem]">
                    {
                        listgenre.length > 0 && listgenre.map((item: homeType) => {
                            return (
                                <Link key={item.id} to={`/detailmovie/${item.id}`} className="relative w-full h-[25rem] md:h-[30rem] rounded-[.4rem] hover:scale-[1.1] transition-all duration-[.25s]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                                        className="w-full h-full object-cover rounded-[.4rem]"
                                    />
                                    <h4 className="text-[1.6rem] text-white pt-[.4rem] lineLimitNav">
                                        {item.title}
                                    </h4>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <TurnPage address={"listgenre"} currentPage={currentPage} pages={pages} id={id ? id : ''} name={name}/>
            <Footer/>

        </div>
    );
}

export default ListGenre;