import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bglogin from '../../assets/image/loginimg.png';
import bgregister from '../../assets/image/bgregister.png';
import { useEffect, useState } from "react";

function Login({onClose}: {onClose: () => void}) {
    const [login, setLogin] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [changeLogin, setChangeLogin] = useState(false);
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
    return (  
        <div className="w-full h-[100vh] fixed flex justify-center items-center top-0 left-0">
            <div className="absolute top-5 right-5 w-[4rem] h-[4rem] flex justify-center items-center bg-[#5151518b] hover:bg-primary transition-all duration-[.25s] rounded-[.2rem] z-50"
                onClick={onClose}   
            >
                <FontAwesomeIcon icon={faXmark} className="text-[3rem] text-[#fff]"/>
            </div>
            <div className={`absolute w-full h-full bglogin`}>
                <img
                    src={bglogin}
                    className={`absolute top-0 left-0 w-full h-full z-0 object-cover ${login ? "opacity-[1] z-10" : "opacity-0 z-0 "} transition-all duration-[.8s]`}
                />
                <img
                    src={bgregister}
                    className={`absolute top-0 left-0 w-full h-full z-0 object-cover ${login ? "opacity-0 z-0" : "opacity-[1] z-10 "} transition-all duration-[.8s]`}
                />
            </div>
            <div className="relative w-[90%] md:min-w-[80rem] md:max-w-[85rem] h-auto md:h-[60rem] md:flex z-50 shadowWatch backdrop-blur-[2rem] rounded-[.5rem]">   
                <div className={`${isMobile ? (changeLogin ? "hidden" : "block") : ""} relative z-50 w-full md:w-[50%] h-full p-[2rem] ${!isMobile ? (login ? "translate-x-[0%]" : "translate-x-[100%]") : ""} transition-all duration-[.8s]`}>
                    <div className={`w-full h-full z-50 ${!isMobile ? (login ? "opacity-0" : "opacity-[1]") : ""} transition-all duration-[.8s]`}> 
                        <h5 className="text-[3rem] text-white text-center font-semibold"> 
                            Register
                        </h5>
                        <div className="relative w-full h-[4.6rem]  mt-[3rem]">
                            <input
                                placeholder=" "
                                type="text"
                                className="animationInput text-white w-full h-full rounded-[.2rem] bg-[transparent] outline-none border-b-[.1rem] border-[#ffffff]"
                            />
                            <label className="absolute select-none pointer-events-none top-[50%] translate-y-[-50%] text-white left-0">
                                Username
                            </label>
                        </div>
                        <div className="relative w-full h-[4.6rem]  mt-[2rem]">
                            <input
                                
                                placeholder=" "
                                type="email"
                                className="animationInput text-white w-full h-full rounded-[.2rem] bg-[transparent] outline-none border-b-[.1rem] border-[#ffffff]"
                            />
                            <label className="absolute select-none pointer-events-none top-[50%] translate-y-[-50%] text-white left-0">
                                Email
                            </label>
                        </div>
                        <div className="relative w-full h-[4.6rem]  mt-[2rem]">
                            <input
                                
                                placeholder=" "
                                type="email"
                                className="animationInput text-white w-full h-full rounded-[.2rem] bg-[transparent] outline-none border-b-[.1rem] border-[#ffffff]"
                            />
                            <label className="absolute select-none pointer-events-none top-[50%] translate-y-[-50%] text-white left-0">
                                Password
                            </label>
                        </div>
                        <div className="relative w-full h-[4.6rem]  mt-[2rem]">
                            <input
                                
                                placeholder=" "
                                type="email"
                                className="animationInput text-white w-full h-full rounded-[.2rem] bg-[transparent] outline-none border-b-[.1rem] border-[#ffffff]"
                            />
                            <label className="absolute select-none pointer-events-none top-[50%] translate-y-[-50%] text-white left-0">
                                Repeat password
                            </label>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-[1.5rem] text-white">
                            <div className="flex items-center">
                                <input
                                    
                                    type="checkbox"
                                    className="mt-1"
                                />
                                <span className="pl-2">
                                    remember me!
                                </span>
                            </div>
                            <div className="text-primary hover:text-[#4a99e2] transition-all cursor-pointer">
                                Forgot password!
                            </div>
                        </div>
                        <div className="w-full h-[4.6rem] flex justify-center items-center font-semibold rounded-[.2rem] hover:bg-[#ff4444] hover:cursor-pointer bg-[red] text-white mt-[4rem] transition-all "

                        >
                            Register
                        </div>
                        <div className="text-center text-white mt-4">
                        Tôi đã có tài khoảng! <span className="text-primary cursor-pointer hover:text-[#4a99e2]"
                            onClick={() => {
                                if(isMobile){
                                    setChangeLogin(true);
                                }
                                setLogin(prev => !prev)
                            }}
                        >Login</span>   
                        </div>
                    </div>
                    <div className={`w-full h-full hidden md:flex justify-center items-center absolute top-0 left-0 z-[-1] ${!isMobile ? (login ? "opacity-[1]" : "opacity-0") : ""}  transition-all duration-[.8s]`}>
                        <img
                            src="https://i.pinimg.com/originals/2c/47/36/2c47368374ee383a0460c27ee3ffe5cf.jpg"
                            className="w-[95%] h-[95%] object-cover rounded-[.5rem]"
                        />
                    </div>
                </div>
                <div className={`${isMobile ? (changeLogin ? "block" : "hidden") : ""} ${isMobile ? (changeLogin ? "block" : "hidden") : ""} relative z-50 w-full md:w-[50%] h-full p-[2rem] ${!isMobile ? (login ? "translate-x-[0%]" : 'translate-x-[-100%]'): ""} transition-all duration-[.8s]`}>
                    <div className={`w-full h-full z-50 ${!isMobile ? (login ? "opacity-[1]" : "opacity-0") : ""} transition-all duration-[.8s]`}> 
                        <h5 className="text-[3rem] text-white text-center font-semibold"> 
                            Login
                        </h5>
                        <div className="relative w-full h-[4.6rem]  mt-[3rem]">
                            <input
                                placeholder=" "
                                type="text"
                                className="animationInput text-white w-full h-full rounded-[.2rem] bg-[transparent] outline-none border-b-[.1rem] border-[#ffffff]"
                            />
                            <label className="absolute select-none pointer-events-none top-[50%] translate-y-[-50%] text-white left-0">
                                Username
                            </label>
                        </div>
                        <div className="relative w-full h-[4.6rem]  mt-[2rem]">
                            <input
                                placeholder=" "
                                type="text"
                                className="animationInput text-white w-full h-full rounded-[.2rem] bg-[transparent] outline-none border-b-[.1rem] border-[#ffffff]"
                            />
                            <label className="absolute select-none pointer-events-none top-[50%] translate-y-[-50%] text-white left-0">
                                Password
                            </label>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-[1.5rem] text-white">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mt-1"
                                />
                                <span className="pl-2">
                                    remember me!
                                </span>
                            </div>
                            <div className="text-primary hover:text-[#4a99e2] transition-all cursor-pointer">
                                Forgot password!
                            </div>
                        </div>
                        <div className="w-full h-[4.6rem] flex justify-center items-center font-semibold rounded-[.2rem] hover:bg-[#ff4444] hover:cursor-pointer bg-[red] text-white mt-[4rem] transition-all ">
                            Login
                        </div>
                        <div className="text-center text-white mt-4">
                        Tôi chưa có tài khoảng! <span className="text-primary cursor-pointer hover:text-[#4a99e2]"
                            onClick={() => {
                                if(isMobile){
                                    setChangeLogin(false);
                                }
                                setLogin(prev => !prev)
                            }}
                        >Register</span>
                        </div>
                    </div>
                    <div className={`absolute hidden md:flex justify-center items-center w-full h-[100%] top-0 left-0 z-[-1] ${!isMobile ? (login ? "opacity-0" : "opacity-[1]") : ""} transition-all duration-[.8s]`}>
                        <img
                            src="https://ss-images.saostar.vn/2019/11/23/6493837/endgame-bia-2.jpg"
                            className="w-[95%] h-[95%] object-cover rounded-[.5rem]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;