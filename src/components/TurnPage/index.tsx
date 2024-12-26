import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type ParamFunc = {address: string, currentPage: number, pages: number, id: string, name?: string};

function TurnPage({address, currentPage, pages, id, name}: ParamFunc) {
    
    const renderButtonPage = () => {
        // React.ReactNode là kiểu dữ liệu tổng quát của tất cả các phần tử có thể được react render như: JSX, string, number, null, undefined, boolean
        const arr: React.ReactNode[] = [];
        let showEllipsis: boolean = false;
        for(let number = 1; number < pages; number++){
            if(number === 1 ||  number === pages - 1 || number === currentPage || number === currentPage + 1 || number === currentPage - 1) {
                arr.push( // trong các phương thức như push vẫn phải sử dụng thuộc tính key
                    <Link
                        key={number}
                        to={`/${address}/${id}?name=${name}&page=${number}`}
                        className={`md:py-3 py-2 text-[1.5rem] md:text-[1.8rem] px-4 md:px-8 hover:bg-[#5e5e5e] rounded-[.4rem] cursor-pointer ${
                            currentPage === number ? "bg-primary text-white" : ""
                        }`}
                    >
                        {number}
                    </Link>
                )
                showEllipsis = true;
            }else{
                if(showEllipsis) {
                    arr.push(
                        <span key={`ellipsis-${number}`} className="py-3 px-4 md:px-8 text-white">...</span>
                    )
                }
                showEllipsis = false;
            }
        }
        return arr;
    };
    return (  
        <div className={`text-white flex justify-center items-center pb-[6rem] text-center`}>
                <Link to={`/${address}/${id}?name=${name}&page=${currentPage - 1}`} className={`text-[1.5rem] md:text-[1.8rem]] md:py-3 md:px-10 py-2 px-3 bg-[transparent] hover:bg-[#5e5e5e] rounded-[.4rem] cursor-pointer flex items-center gap-2 transition-all duration-[.25s] ${currentPage > 2 ? 'block' : 'hidden'}`}>
                    <FontAwesomeIcon icon={faAngleLeft}/>
                    <span className="text-[1.5rem] md:text-[1.8rem] ">Prev</span>
                </Link>
                
                {renderButtonPage()}

                <Link to={`/${address}/${id}?name=${name}&page=${currentPage + 1}`} className={`text-[1.5rem] md:text-[1.8rem] md:py-3 md:px-10 py-2 px-3 bg-[transparent] hover:bg-[#5e5e5e] rounded-[.4rem] cursor-pointer flex items-center gap-2 transition-all duration-[.25s] ${currentPage <= pages - 1 ? 'block' : 'hidden'}`}>Next<FontAwesomeIcon icon={faAngleRight} className="pt-1"/></Link>
        </div>
    );
}

export default TurnPage;