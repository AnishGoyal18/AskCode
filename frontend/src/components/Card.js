import React from "react";
import AiImage from "../images/ai.png";
import CommunityImage from "../images/community.png";
import { useNavigate } from "react-router-dom";

function Card({ title, description, buttonText }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (title === 'Ask Human') navigate("/community");
        if (title === 'Ask AI') navigate("/ai");
    };

    return (
        <div className="bg-color2 rounded-lg shadow-lg flex flex-col space-y-3 items-center p-6 h-fit w-full md:w-1/2 lg:w-1/3 mb-8 mx-4">
            {title === 'Ask Human' ?
                <img src={CommunityImage} alt="My image" className='h-16 my-3' />
                :
                <img src={AiImage} alt="My image" className='h-15 my-3' />
            }
            <div>
                <sapn className="text-2xl text-white font-bold mb-4">{title.split(" ")[0]}</sapn>
                <sapn className="text-3xl text-color3 font-bold mb-4">{title.split(" ")[1]}</sapn>
            </div>
            <div className="text-white mb-4">{description}</div>
            <button
                className={'bg-color3 hover:text-color1 text-white px-4 py-2 rounded-lg font-semibold'}
                onClick={handleClick}
            >
                {buttonText}
            </button>
        </div>
    );
}

export default Card;