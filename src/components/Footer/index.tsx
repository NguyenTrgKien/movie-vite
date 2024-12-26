import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/image/logo.png';
import Google from '../../assets/image/google.png';
import Chplay from '../../assets/image/chplay.png';
import { faGoogle, faInstagram, faSquareFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

function Footer() {
    return (  
        <div className="w-full h-auto] bg-[#0e0311] px-[1.5rem] md:px-[6.5rem] pt-[4rem] md:pt-[8rem] pb-[4rem]">
            <div className="flex justify-between items-center">
                <div className="min-w-[20%] text-start pb-[1rem] md:pb-[2rem] border-b-[.1rem] border-[#535353]">
                    <img
                        src={Logo}
                        className='w-[7rem] h-[1.8rem] md:w-[10rem] md:h-[3rem]'
                    />
                </div>
                <div className="min-w-[20%] text-start pb-[1rem] md:pb-[2rem] border-b-[.1rem] border-[#535353] flex items-center gap-3">
                    <Link to={`https://www.facebook.com/profile.php?id=100029756161612&locale=vi_VN`} target='_blank' className=''>
                        <FontAwesomeIcon icon={faSquareFacebook} className='text-white text-[2rem] md:text-[3rem] hover:text-primary transition-all duration-[.25s]'/>
                    </Link>
                    <Link to={`https://www.instagram.com/`} target='_blank'>
                        <FontAwesomeIcon icon={faInstagram} className='text-white text-[2rem] md:text-[3rem] hover:text-primary transition-all duration-[.25s]'/>
                    </Link>
                    <FontAwesomeIcon icon={faTwitter} className='text-white text-[2rem] md:text-[3rem] hover:text-primary transition-all duration-[.25s]'/>
                    <FontAwesomeIcon icon={faGoogle} className='text-white text-[2rem] md:text-[3rem] hover:text-primary transition-all duration-[.25s]'/>
                </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-8 pt-[4rem] pb-[2.5rem] md:pb-[5rem] border-b-[.1rem] border-[#535353]">
                <div className='flex flex-col gap-y-[.3rem]'>
                    <h4 className='text-[1.5rem] md:text-[1.8rem] text-[#ccc] font-semibold mb-4'>COMPANY</h4>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>About</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Careers</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Contact</span>
                </div>
                <div className='flex flex-col gap-y-[.3rem]'>
                    <h4 className='text-[1.5rem] md:text-[1.8rem] text-[#ccc] font-semibold mb-4'>SUPORT</h4>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Contact support</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Help center</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Suported devices</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Activate Your Device</span>
                </div>
                <div className='flex flex-col gap-y-[.3rem]'>
                    <h4 className='text-[1.5rem] md:text-[1.8rem] text-[#ccc] font-semibold mb-4'>PATERNTS</h4>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Advertise with us</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Partners with us</span>
                </div>
                <div className='flex flex-col gap-y-[.3rem]'>
                    <h4 className='text-[1.5rem] md:text-[1.8rem] text-[#ccc] font-semibold mb-4'>GET THE APP</h4>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>iOS</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Roku</span>
                    <span className='text-[1.4rem] text-white hoverFooter transition-all duration-[.25s] select-none'>Amazon file</span>
                </div>
            </div>
            <div className="flex items-center justify-center gap-6 pt-8 md:pt-16">
                <div className='flex justify-center items-center gap-[.5rem] px-10 py-4 border-[.1rem] border-[#535353] rounded-[.4rem] hover:cursor-pointer hover:border-primary transition-all'>
                    <img
                        src={Google}
                        className='w-[2rem] h-[2rem] md:w-[3.5rem] md:h-[3.5rem]'
                    />
                    <span className='text-[1.5rem] md:text-[2.2rem] font-bold text-white'>
                        Google
                    </span>
                </div>
                <div className='flex justify-center items-center gap-[.5rem] px-10 py-4 border-[.1rem] border-[#535353] rounded-[.4rem] hover:cursor-pointer hover:border-primary transition-all'>
                    <img
                        src={Chplay}
                        className='w-[2rem] h-[2rem] md:w-[3.5rem] md:h-[3.5rem]'
                    />
                    <span className='text-[1.5rem] md:text-[2.2rem] font-bold text-white'>
                        Google
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;