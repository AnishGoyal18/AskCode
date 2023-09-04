import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const questionContext = createContext();

export function QuestionContextProvider({ children }) {
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/questions`);
                setAllQuestions(res.data.reverse());
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [allQuestions]);

    return (
        <questionContext.Provider value={{ allQuestions, setAllQuestions }}>
            {children}
        </questionContext.Provider>
    )
}

export function useQuestionContext() {
    return useContext(questionContext);
}
