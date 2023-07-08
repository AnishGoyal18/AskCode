import React from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

function HomePage() {
    return (
        <>
            <Navbar />
            <div className="bg-color1 h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-4xl flex flex-wrap justify-center">
                    <Card
                        title="Ask Human"
                        description="Get in touch with our wonderful community and get your doubts resolved."
                        buttonText="Community"
                    />
                    <Card
                        title="Ask AI"
                        description="Use our AI-powered bot to get instant answers to your doubts or queries."
                        buttonText="Ask AI"
                    />
                </div>
            </div>
        </>
    );
}


export default HomePage;