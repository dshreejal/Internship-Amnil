/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Question from "./Question"


const Quiz = () => {
    const fetchQuestions = async () => {
        const response = await fetch(`${"http://localhost:8000/api"}/quiz`)
        const data = await response.json()
        setQuestions(data?.data)

        setSelectedAnswers(new Array(data?.data.length).fill(null));
    }
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        fetchQuestions()
    }, [])

    const isLastQuestion = currentQuestion === questions.length - 1;

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };
    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
    };

    const handleAnswerSelect = (selectedOption) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestion] = selectedOption;
        setSelectedAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((question, index) => {
            if (question.correctAnswer === selectedAnswers[index]) {
                score++;
            }
        });
        return score;
    };

    const handlePlayAgain = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(new Array(questions.length).fill(null));
        setShowResults(false);
    };

    return (
        <div className="flex flex-col items-start w-full">

            {showResults ? (
                <div className="flex flex-col justify-center w-full items-center mt-10 text-2xl">
                    <h2 className="font-bold text-3xl">Results</h2>
                    <p>Your score: {calculateScore()} out of {questions.length}</p>

                    <button onClick={handlePlayAgain} className=" mt-5 md:w-[20%] w-[30%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">
                        Play Again
                    </button>
                </div>
            ) : (
                <>
                    <h4 className="mt-10 text-xl ">Question {currentQuestion + 1} of {questions.length}</h4>


                    <Question question={questions[currentQuestion]} handleAnswerSelect={handleAnswerSelect} selectedAnswers={selectedAnswers} currentQuestion={currentQuestion} />
                    <div className="flex justify-between w-full mt-4 text-white">
                        <button disabled={currentQuestion === 0} onClick={handlePrevious} className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-blue-200 disabled:cursor-not-allowed">Previous</button>
                        {isLastQuestion ? (
                            <button onClick={handleSubmit} className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Quiz