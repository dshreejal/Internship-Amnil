const Answer = ({ options }) => {
    return (
        options?.map((option) => (
            <div key={option} className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 rounded-xl cursor-pointer">
                <input
                    type="radio"
                    name='answer'
                    value='answer1'
                    className="w-6 h-6 bg-black cursor-pointer"
                />
                <p className="ml-6">{option}</p>
            </div>
        )
        ))
}

export default Answer