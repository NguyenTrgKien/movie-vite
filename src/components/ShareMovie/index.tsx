import { 
    FacebookShareButton,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
 } from "react-share";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


function ShareMovie({url, title, handleCloseShare}: {url: string, title: string, handleCloseShare: () => void}) {
    const [isCopy, setIsCopy] = useState(false);
    

    const handleCopy = () => {
        setIsCopy(true);
        setTimeout(() => {setIsCopy(false)}, 1500);
    }
    return (  
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-[#2d2d2d58] z-[999]">
            <div className="relative w-[80%] md:min-w-[40rem] h-[30rem] px-4 py-16 md:p-[5rem] bg-[#3a3a3a] rounded-[.8rem]">
                <div className="text-center text-[2rem] text-white font-semibold mb-8"
                >
                    Share
                </div>
                <span className="absolute top-4 right-4 w-[3rem] h-[3rem] flex justify-center items-center bg-[#545454] rounded-[.5rem] hover:bg-[#818181] transition-all"
                    onClick={() => handleCloseShare()}
                >
                    <FontAwesomeIcon icon={faXmark} className="text-[1.8rem] text-white"/>
                </span>
                <div className="md:flex grid grid-cols-4 items-center justify-center gap-[2rem] md:gap-[3.6rem] ">
                    <FacebookShareButton url={url} hashtag={title} className=" hover:opacity-[.8] transition-all">
                        <FacebookIcon size={50} round/>
                        <span className="text-white block pt-2">Facebook</span>
                    </FacebookShareButton>
                    <EmailShareButton url={url} className=" hover:opacity-[.8] transition-all">
                        <EmailIcon size={50} round/>
                        <span className="text-white block pt-2">Email</span>
                    </EmailShareButton>
                    <LinkedinShareButton url={url} className=" hover:opacity-[.8] transition-all">
                        <LinkedinIcon size={50} round/>
                        <span className="text-white block pt-2">Linkedln</span>
                    </LinkedinShareButton>
                    <TwitterShareButton url={url}  className=" hover:opacity-[.8] transition-all">
                        <TwitterIcon size={50} round/>
                        <span className="text-white block pt-2">Twitter</span>
                    </TwitterShareButton>
                    <div className="text-center relative">
                        {/* Hàm callback onCopy sẽ được gọi mỗi khi copy thành công*/}
                        <CopyToClipboard text={url} onCopy={handleCopy}>
                            <div className="w-[5rem] h-[5rem] flex justify-center items-center rounded-[50%] bg-[#7f7f7f] hover:bg-[#a9a9a9] transition-all">
                                <FontAwesomeIcon icon={faLink} className="text-[2.2rem] text-white"/>
                            </div>
                        </CopyToClipboard>
                        <span className="text-white block pt-2" >
                            Copy link
                        </span>
                        {
                            isCopy && (
                                <span className="absolute -top-[2.2rem] -right-[4.6rem] bg-[#232323] text-white px-3 py-2 text-[1rem] rounded-[.4rem]">
                                    Link copied!
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShareMovie;