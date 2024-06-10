import banner from "../../../../assets/Images/banner.jpg"

const Banner = () => {
    return (
        <div className="relative h-screen">
            <div
                className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-full flex items-center justify-center bg-cover bg-center text-white"
                style={{ backgroundImage: `url(${banner})` }}
            >
                <div className="absolute text-center">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-[#FF5700] bg-[#FFFFFF33] p-3 inter">InnovateX</h1>
                    <p className="text-xl font-bold">Empowering Innovation for a Brighter Tomorrow.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
