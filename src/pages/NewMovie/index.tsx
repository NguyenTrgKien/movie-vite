import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import TurnPage from "../../components/TurnPage";
import { AppDispatch, rootState } from "../../redux/store";
import { useContext, useEffect } from "react";
import { setNewmovie } from "../Home/actionHome";
import { dataContext } from "../../components/Context";
import { Link } from "react-router-dom";
import { homeType } from "../Home/homeSlice";
import Footer from "../../components/Footer";

function NewMovie() {
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    const newmovie = useSelector((state: rootState) => state.home.newmovie);
    const newmovies = newmovie.results;
    const dispatch = useDispatch<AppDispatch>();
    const currentPage = 1;
    const name = "New Movie";
    const pages = newmovie.total_pages;
    const page = 1;
    
    useEffect(() => {
        dispatch(setNewmovie({language: currentLang, page: page}));
    }, [dispatch, currentLang, pages]);

    return (  
        <div className="">
            <Header/>
            <div className="px-[1.5rem] md:px-[15rem] h-auto mt-[8rem] md:mt-[10rem] pb-[8rem]">
                <h5 className="text-[2.2rem] md:text-[4rem] font-semibold text-white">
                    {name}
                </h5>
                <div className="w-full h-auto grid grid-cols-2 md:grid-cols-6 gap-[1.5rem] md:gap-x-[2rem] gap-y-[5rem] mt-[1rem] md:mt-[2rem]">
                    {
                        newmovies?.length > 0 && newmovies.map((item: homeType) => {
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
            <TurnPage address={"newmovie"} currentPage={currentPage} pages={pages} name={name}/>
            <Footer/>
        </div>
    );
}

export default NewMovie;