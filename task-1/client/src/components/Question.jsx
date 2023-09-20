/* eslint-disable react/prop-types */
import Answer from "./Answer"

const Question = ({ question }) => {
    return (
        <>
            <div className="mt-10 text-2xl ">
                {question?.question}
            </div>

            <Answer options={question?.options} />
        </>
    )
}

export default Question