import React from 'react';

const RightSidebar = ({ searchText, selectedTag, tags, handleSearchChange, handleTagClick }) => {
    return (
        <div className="hidden lg:block max-w-[30%] min-h-screen bg-color2 text-gray-300 p-4">
            <div className='flex flex-col space-y-3'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={handleSearchChange}
                    className="border-none text-gray-300 bg-color1 text-sm rounded-md px-3 py-2 mb-2"
                />
                <div className='flex flex-col space-y-2'>
                    <div className="text-lg font-semibold">Filter by Tags</div>
                    <div className='flex flex-wrap'>
                        {tags.map((tag, index) => (
                            < div className={`cursor-pointer mr-2 mb-2 text-sm rounded-lg py-1 px-3  ${selectedTag === tag ? 'text-white bg-color3' : ' text-gray-400 bg-color1'}`}
                                key={index}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default RightSidebar;
