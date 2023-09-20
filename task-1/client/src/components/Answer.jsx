const Answer = ({ options, handleAnswerSelect, selectedAnswers, currentQuestion }) => {
    const handleOptionSelect = (selectedOption) => {
        handleAnswerSelect(selectedOption);
    };
    return (
        options?.map((option) => (
            <div
                key={option}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 rounded-xl cursor-pointer"
                onClick={() => handleOptionSelect(option)}
            >
                <input
                    type="radio"
                    name={option}
                    value={option}
                    onChange={() => handleOptionSelect(option)}
                    checked={option === selectedAnswers[currentQuestion]}
                    className="w-6 h-6 bg-black cursor-pointer"
                />
                <p className="ml-6">{option}</p>
            </div>
        ))
    );
};

export default Answer