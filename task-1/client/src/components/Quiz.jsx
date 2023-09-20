import { useEffect, useState } from "react"
import Question from "./Question"




const Quiz = () => {
    const fetchQuestions = async () => {
        const response = await fetch(`${"http://localhost:8000/api"}/quiz`)
        const data = await response.json()
        setQuestions(data?.data)
    }
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

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
    return (
        <div className="flex flex-col items-start w-full">
            <h4 className="mt-10 text-xl ">Question {currentQuestion + 1} of {questions.length}</h4>


            <Question question={questions[currentQuestion]} />
            <div className="flex justify-between w-full mt-4 text-white">
                <button disabled={currentQuestion === 0} onClick={handlePrevious} className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-blue-200">Previous</button>
                {isLastQuestion ? (
                    <button className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
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
        </div>
    )
}

export default Quiz