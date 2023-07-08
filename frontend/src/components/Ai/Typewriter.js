import React, { useState, useEffect } from 'react';

function Typewriter({ answer }) {
    const [text, setText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(answer.substring(0, i));
            i++;
        }, 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {text}
        </>
    );
}

export default Typewriter;