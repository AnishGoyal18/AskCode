import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonCard() {
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#39ac37">
                <div className='flex items-center space-x-4 sm:mx-5 px-6 py-4 border-l border-color3 rounded-lg bg-color2'>
                    <Skeleton circle width={40} height={40} />
                    <div className='flex flex-col space-y-3 w-full'>
                        <Skeleton count={2} />
                    </div>
                </div>
            </SkeletonTheme>
        </>
    )
}

export default SkeletonCard;
