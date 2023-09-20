/* eslint-disable react/prop-types */
import Answer from "./Answer"

const Question = ({ question, handleAnswerSelect, selectedAnswers, currentQuestion }) => {
    return (
        <>
            <div className="mt-10 text-2xl ">
                {question?.question}
            </div>

            <Answer options={question?.options} handleAnswerSelect={handleAnswerSelect} selectedAnswers={selectedAnswers} currentQuestion={currentQuestion} />
        </>
    )
}

export default Question