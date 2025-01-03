import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header";
import { faHeart, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, rootState } from "../../redux/store";
import YouTube from "react-youtube";
import { setCast } from "../DetaileMovie/actionDetailmovie";
import { setTrailer } from "./actionWatchmovie";
import { useContext, useEffect, useState } from "react";
import { Cast } from "../DetaileMovie/detailMovieSlice";
import { dataContext } from "../../components/Context";
import Footer from "../../components/Footer";

function WatchMovie() {
    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const searchParam = new URLSearchParams(location.search);// location.search: truy(lấy ra đoạn chuỗi từ dấu chấm hỏi) vấn bắt đầu từ dấu chấm hỏi, sử dụng các phương thức như get(), has(), set()... để làm việc với tham số
    const info = decodeURIComponent(searchParam.get('info') || ''); // Dùng decode để giải mã một chuỗi đã mã hóa
    const data = JSON.parse(info);
    const trailer = useSelector((state: rootState) => state.watchmovie.trailer);
    const cast = useSelector((state: rootState) => state.detailmovie.cast);
    const context = useContext(dataContext);
    const currentLang = context.currentLang;
    const [comment, setComment] = useState("");
    const [commentReply, setCommentReply] = useState("");
    
    const [showReply, setShowReply] = useState(false);
    const [postComment, setPostComment] = useState<{content: string, isLike: boolean, isReply: boolean, contentReply: {content: string, isLike: boolean}[]}[]>([]);
    
    
    useEffect(() => {
        if(id){
            dispatch(setTrailer({id, language: currentLang}));
            dispatch(setCast({id, language: currentLang}));
        }
    },[id, dispatch, currentLang]);
    
    const handlePostComment = (value: string) => {
        setPostComment(prev => [ {content: value, isLike: false, isReply: false, contentReply: []},...prev]);
    }

    const handlePostCommentReply = (content: string, i: number) => {
        setPostComment(prev => prev.map((it, index) => index === i ? {...it, contentReply: [...it.contentReply, {content: content, isLike: false}]} : it));
    }

    const handleLike = (value: number) => {
        setPostComment(prev => prev.map((comment, index) => value === index ? {...comment, isLike: !comment.isLike} : comment))
    }

    const handleReply = (value: number) => {
        setPostComment(prev => prev.map((reply, index) => value === index && reply.isReply === false ? {...reply, isReply: true} : {...reply, isReply: false}));
    }

    const handleLikeReply = (postComment: string, reply: string) => {
        setPostComment(prev => prev.map((post) => {
            if(post.content === postComment){
                return {
                    ...post,
                    contentReply: post.contentReply.map((item) => {
                        if(item.content === reply){
                            return {
                                ...item,
                                isLike: !item.isLike
                            }
                        }
                        return item;
                    })
                }
            }
            return post;
        }))
    }
    
    return (  
        <div className="w-full h-auto">
            <Header theme={'dark'}/>
            {
                trailer && (
                    <div className="w-full h-auto md:px-[15rem] md:pt-[0] pt-[5.5rem] pb-[6rem]">
                        <div className="md:flex md:flex-row md:pt-[11rem] w-full h-auto">
                            <div className="relative md:w-[75%] h-[30rem] md:h-[54rem] youtube-container">
                                <YouTube
                                    videoId={trailer.key}
                                    opts={{
                                        playerVars: {
                                            autoplay: 1,
                                        },
                                    }}
                                />
                            </div>
                            <div className="md:block hidden w-[25%] px-[1.5rem] h-[54rem] bg-[#434343] md:px-5 py-8">
                                <h3 className="text-[3rem] text-white font-semibold">{data.title}</h3>
                                <div className="text-[#adadad] mt-4"><span>Episode: </span><span>1-24</span></div>
                                <div className="mt-2 flex items-center gap-[.5rem]">
                                    <span className="text-[1.6rem] text-white px-5 py-2 bg-primary hover:bg-[#4edff8] hover:cursor-pointer rounded-[.2rem]">Trailer</span>
                                    <span className="text-[1.6rem] text-white px-5 py-2 bg-[#676767] hover:bg-[#838383] hover:cursor-pointer rounded-[.2rem]">1</span>
                                    <span className="text-[1.6rem] text-white px-5 py-2 bg-[#676767] hover:bg-[#838383] hover:cursor-pointer rounded-[.2rem]">2</span>
                                    <span className="text-[1.6rem] text-white px-5 py-2 bg-[#676767] hover:bg-[#838383] hover:cursor-pointer rounded-[.2rem]">3</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-[75%] h-auto md:px-0 px-[1.5rem]">
                            <h2 className="text-[2.2rem] md:text-[4rem] mt-3 text-white font-bold text-start">
                                {data.title}
                            </h2>
                            <div className="flex items-center mt-[1rem] text-[1.4rem]">
                                <div>
                                    <FontAwesomeIcon icon={faStar} className="text-primary"/>
                                    <span className="text-white pt-[.2rem] pl-[.1rem]">
                                        9
                                    </span>
                                </div>
                                <div className="text-white ml-[1rem] pl-[1rem] border-l-[.1rem]">
                                    2022-4-6
                                </div>
                            </div>
                            <div className="flex items-center gap-[.5rem] mt-[.8rem]">
                                {data.genre.length > 0 && data.genre.map((value: {id: number, name: string}, index: number) => {
                                    return (
                                        <span key={index} className="px-[1rem] bg-[#767676] text-[1.4rem] text-white rounded-[.2rem] ">{value.name}</span>
                                    )
                                })}
                            </div>
                            <p className="text-white text-[1.4rem] mt-[.8rem]"><span className="text-[#ccc]">Overview: </span>{data.overview}</p>
                            <div className="mt-[1.6rem] grid grid-flow-col auto-cols-[calc((100%-8rem)/5)] md:auto-cols-[calc((100%-14rem)/8)] overflow-scroll gap-[2rem] removeScrollbar pb-8 md:pb-[5rem] border-b-[.1rem] border-[#565656]">
                                
                                {
                                    cast && cast.map((item: Cast) => {
                                        if(item.profile_path === null){return;}
                                        return (
                                                <Link to={`/detailcast/${item.id}`} className="group cursor-pointer">
                                                <div className="w-[5rem] h-[5rem] md:w-[9.4rem] md:h-[9.4rem] rounded-[50%] overflow-hidden border-[.2rem] border-[transparent] hover:border-[#52ff52] transition-all duration-[.25s]">
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w1280${item.profile_path}`}
                                                        className="w-full h-full rounded-[50%] object-cover  hover:scale-[1.15] transition-all duration-[.25s]"
                                                    />

                                                </div>
                                                <div className="text-[1.4rem] text-center lineLimitNav text-white group-hover:text-primary mt-[.4rem] transition-all duration-[.25s] "> 
                                                    {item.name}
                                                </div>
                                                <div className="text-[#9b9b9b] text-center text-[1rem]">
                                                    Cast
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                                
                            </div>
                            <div className="text-white text-[1.4rem] md:text-[1.8rem] font-semibold mt-[2rem]">
                                Comments(<span>10</span>)
                            </div>
                            <div>
                                <div className="relative flex items-start mt-[2rem]">
                                    <div className="w-[4rem] h-[4rem] border-[.1rem] border-[#686868] md:w-[4.6rem] md:h-[4.6rem] rounded-[50%]">
                                        <img
                                            src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-07/240716-Elon-Musk-ch-1125-69ea28.jpg"
                                            className="w-full h-full rounded-[50%] object-cover"
                                        />
                                    </div>
                                    <textarea placeholder="Post comment..." maxLength={200} className="w-[calc(100%-5rem)] text-[1.4rem] h-[5rem] md:h-[8rem] pt-3 pl-[1.5rem] bg-[transparent] border-[.1rem] border-[#565656] text-white ml-4 resize-none outline-none focus:border-[#00d9ff] rounded-[.4rem]"
                                        value={comment}
                                        onChange={(e) => {setComment(e.target.value)}}
                                    >
                                    </textarea>
                                    <div className="absolute bottom-1 right-2 text-[1.2rem] text-white"> 
                                        <span>0</span>/200
                                    </div>
                                </div>
                                <div className="w-[calc(100%-5rem)] ml-auto text-end mt-[1.5rem] pb-[3rem] border-b-[.1rem] border-[#565656] text-[1.4rem]"
                                >
                                    <span className={`px-4 py-1 md:px-8 md:py-3 text-white mr-4 rounded-[.4rem]  cursor-pointer transition-all duration-[.25s] ${comment !== "" ? "bg-[#5555558b] hover:opacity-[.8]" : "bg-[#5555558b]"}`}
                                        onClick={() => 
                                            setComment("")
                                        }
                                    >Hủy</span>
                                    <span className={`px-4 py-1 md:px-8 md:py-3 text-white rounded-[.4rem]  cursor-pointer transition-all duration-[.25s] ${comment !== "" ? "bg-primary hover:opacity-[.8]" : "bg-[#00ffff1f]"}`}
                                        onClick={() => {
                                            if(comment !== "") {
                                                setComment("");
                                                handlePostComment(comment)
                                            }
                                        }}
                                    >Đăng</span>
                                </div>
                            
                            </div>
                            <div className="w-full md:w-[75%] h-auto mt-[2rem]">
                                {
                                    postComment?.length > 0 && postComment.map((post, index) => {
                                        return (
                                            <div className="flex items-start gap-4 w-full h-auto  mt-8 ">
                                                <img
                                                    src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-07/240716-Elon-Musk-ch-1125-69ea28.jpg"
                                                    className="w-[4rem] h-[4rem] md:w-[4.6rem] md:h-[4.6rem] rounded-[50%] object-cover"
                                                />
                                                <div className="w-full h-auto overflow-hidden pb-[2rem] border-b-[.1rem] border-[#565656]">
                                                    <h5 className="text-[#8a8a8a]">
                                                        Elon Musk
                                                    </h5>
                                                    {/* break-word tự xuống dòng */}
                                                    <div className="w-full h-auto text-[1.4rem] break-words text-white">
                                                        {
                                                            post.content
                                                        }
                                                    </div>
                                                    <div className="flex gap-[3rem] text-[1.4rem] items-center text-[#8a8a8a] mt-5 ">
                                                        <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer"
                                                            onClick={() => handleLike(index)}
                                                        >
                                                            <FontAwesomeIcon icon={faHeart} className={`text-[1.8rem] ${post.isLike ? "text-[red]" : ""}`}/>
                                                            <span>Like</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer"
                                                            onClick={() => {
                                                                setShowReply(true);
                                                                handleReply(index);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faMessage} className="text-[1.8rem]"/>
                                                            <span>Reply</span>
                                                        </div>
                                                    </div>
                                                    {
                                                        showReply && (
                                                            post.isReply && (
                                                                <div>
                                                                    <div className="relative flex items-start mt-[2rem]">
                                                                        <div className="w-[4rem] h-[4rem] md:w-[4.6rem] md:h-[4.6rem] rounded-[50%]">
                                                                            <img
                                                                                src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-07/240716-Elon-Musk-ch-1125-69ea28.jpg"
                                                                                className="w-full h-full rounded-[50%] object-cover"
                                                                            />
                                                                        </div>
                                                                        <textarea placeholder="Reply..." maxLength={200} className="w-[calc(100%-5rem)] h-[5rem] md:h-[8rem] pt-3 pl-[1.5rem] bg-[transparent] border-[.1rem] border-[#565656] text-white ml-4 resize-none outline-none focus:border-[#00d9ff] rounded-[.4rem]"
                                                                            value={commentReply}
                                                                            onChange={(e) => {setCommentReply(e.target.value)}}
                                                                        >
                                                                        </textarea>
                                                                        <div className="absolute bottom-1 right-2 text-[1.2rem] text-white"> 
                                                                            <span>0</span>/200
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-[calc(100%-5rem)] ml-auto text-end mt-[1.5rem] pb-5 text-[1.4rem] md:text-[1.6rem]"
                                                                    >
                                                                        <span className={`px-4 py-1 md:px-8 md:py-3 text-white mr-4 rounded-[.4rem]  cursor-pointer transition-all duration-[.25s] ${commentReply !== "" ? "bg-[#5555558b] hover:opacity-[.8]" : "bg-[#5555558b] hover:opacity-[.8]"}`}
                                                                            onClick={() => 
                                                                                setShowReply(false)
                                                                            }
                                                                        >Hủy</span>
                                                                        <span className={`px-4 py-1 md:px-8 md:py-3 text-white rounded-[.4rem]  cursor-pointer transition-all duration-[.25s] ${commentReply !== "" ? "bg-primary hover:opacity-[.8]" : "bg-[#00ffff1f]"}`}
                                                                            onClick={() => {
                                                                                if(commentReply !== "") {
                                                                                    setShowReply(false);
                                                                                    setCommentReply("");
                                                                                    handlePostCommentReply(commentReply, index)
                                                                                }
                                                                            }}
                                                                        >Đăng</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                    {
                                                        post.contentReply?.length > 0 && post.contentReply.map((childReply) => {
                                                            return (
                                                                <div className="flex items-start gap-4 w-full h-auto  mt-8 ">
                                                                    <img
                                                                        src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-07/240716-Elon-Musk-ch-1125-69ea28.jpg"
                                                                        className="w-[4rem] h-[4rem] md:w-[4.6rem] md:h-[4.6rem] rounded-[50%] object-cover"
                                                                    />
                                                                    <div className="w-full h-auto overflow-hidden pb-[2rem] border-b-[.1rem] border-[#565656]">
                                                                        <h5 className="text-[#8a8a8a]">
                                                                            Elon Musk
                                                                        </h5>
                                                                        {/* break-word tự xuống dòng */}
                                                                        <div className="w-full h-auto text-[1.4rem] break-words text-white">
                                                                            {
                                                                                childReply.content
                                                                            }
                                                                        </div>
                                                                        <div className="flex gap-[3rem] text-[1.4rem] items-center text-[#8a8a8a] mt-5 ">
                                                                            <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer"
                                                                                onClick={() => handleLikeReply(post.content, childReply.content)}
                                                                            >
                                                                                <FontAwesomeIcon icon={faHeart} className={`text-[1.8rem] ${childReply.isLike ? "text-[red]" : ""}`}/>
                                                                                <span>Like</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 hover:text-primary transition-all cursor-pointer"
                                                                            >
                                                                                <FontAwesomeIcon icon={faMessage} className="text-[1.8rem]"/>
                                                                                <span>Reply</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            <Footer/>
        </div>
    );
}

export default WatchMovie;