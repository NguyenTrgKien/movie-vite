import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, rootState } from "../../redux/store";
import { useState } from "react";
import { setSearchMovie } from "./actionSearchMovie";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { homeType } from "../Home/homeSlice";
import Footer from "../../components/Footer";

function SearchMovie() {
    const dispatch = useDispatch<AppDispatch>();
    const searchs = useSelector((state: rootState) => state.searchmovie.search);
    const searchmovie = searchs.results;
    const [valueSearch, setValueSearch] = useState("");

    const handleSearchMovie = (valueSearch: string) => {
        if(valueSearch !== ""){
            dispatch(setSearchMovie(valueSearch));
        }
    }

    return (  
        <div>
            <Header/>
            <div className="w-full h-auto pt-[6rem] md:pt-[9rem] md:px-[15rem] px-[1.5rem] md:pb-[6rem] pb-[5rem]">
                <div className="w-full md:h-[7rem] h-[5rem] flex items-center md:pr-[2rem] pr-[.5rem] rounded-[.5rem] bg-[#3e3f41]">
                    <div className="h-full md:w-[5%] w-[10%] flex justify-center items-center">
                        <FontAwesomeIcon icon={faSearch} className="md:text-[1.8rem] text-[1.5rem] text-white"/>
                    </div>
                    <input
                        type="text"
                        placeholder="Search name movie..."
                        onChange={(e) => setValueSearch(e.target.value)}
                        value={valueSearch}
                        className="w-[65%] h-full bg-[transparent] outline-none text-[1.4rem] text-white"
                    />
                    <FontAwesomeIcon icon={faXmark} className={`${valueSearch ? "block" : "hidden"} md:text-[2.5rem] text-[1.8rem] px-2 text-[#ccc] cursor-pointer`}
                        onClick={() => setValueSearch("")}
                    />
                    <div className={`w-[15%] h-[80%] flex justify-center md:text-[1.6rem] text-[1.4rem] items-center rounded-[1rem] ml-auto text-white ${valueSearch ? "bg-primary" : "bg-[#6f6f6f]"} cursor-pointer select-none`}
                        onClick={() => handleSearchMovie(valueSearch)}
                    >
                        Search
                    </div>
                </div>
                <div className="grid md:grid-cols-5 grid-cols-2 md:gap-x-[2rem] gap-x-[1.5rem] gap-y-[4rem] md:gap-y-[10rem] md:mt-[6rem] mt-[4rem]">
                    {
                        searchmovie?.length > 0 && searchmovie.map((item: homeType) => {
                            if(item.backdrop_path === null || "") return;
                            return (
                                <div className="w-full md:h-[16rem] rounded-[.5rem] hover:scale-[1.1] transition-all duration-[.25s]">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                                        className="w-full h-[85%] object-cover rounded-[.5rem]"
                                    />
                                    <span className="text-white text-[1.6rem] pt-4 lineLimitNav">{item.title}</span>
                                </div>
                            )
                        })
                    }
                </div>
                    {
                        searchmovie?.length === 0 && (
                            <div className="text-[2.5rem] text-primary text-center">
                                ----------  No results found  -----------
                            </div>
                        )
                    }
            </div>
            <Footer/>
        </div>
    );
}

export default SearchMovie;