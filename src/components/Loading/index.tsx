function Loading() {
    return (  
        <div className='w-full h-[100vh] fixed top-0 left-0 bg-black flex justify-center items-center'>
            <div className='w-[6rem] h-[6rem] bg-[red] rounded-[50%] rotate-180 loadingAnimationLeft'>
                
            </div>
            <div className='w-[6rem] h-[6rem] bg-[#2c3cee] rounded-[50%] rotate-180 loafingAnimationRight'>
                
            </div>
        </div>
    );
}

export default Loading;