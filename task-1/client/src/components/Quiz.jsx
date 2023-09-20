import Question from "./Question"


const Quiz = () => {
    return (
        <div className="flex flex-col items-start w-full">
            {/* <h4 className="mt-10 text-xl ">Question 1 of 5</h4> */}

            <Question />
            <div className="flex justify-between w-full mt-4 text-white">
                <button className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-blue-200" disabled>Previous</button>
                <button className="w-[15%] py-3 bg-blue-600 hover:bg-blue-700 rounded-lg">Next</button>
            </div>
        </div>
    )
}

export default Quiz