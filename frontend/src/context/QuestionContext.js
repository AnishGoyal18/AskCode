import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

const questionContext = createContext();

export function QuestionContextProvider({ children }) {
    const [allQuestions, setAllQuestions] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions`).then((res) => {
            setAllQuestions(res.data.reverse());
            setPending(false);
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    if (pending) {
        return (
            <div className='flex h-screen justify-center items-center'>
                <ReactLoading type='bars' color='gray' />
            </div>
        )
    }

    return (
        <questionContext.Provider value={{ allQuestions, setAllQuestions }}>
            {children}
        </questionContext.Provider>
    )
}

export function useQuestionContext() {
    return useContext(questionContext);
}