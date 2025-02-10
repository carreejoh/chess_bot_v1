
function Controls({
    showAttacks,
    setShowAttacks
}) {
    return (
        <div className="h-[664px] w-64 pt-10 pl-4">
            <h2 className="text-sm">Show legal moves</h2>
            <div className="flex items-center mt-1">
                <button onClick={() => setShowAttacks("off")} className={`${showAttacks === "off" ? "bg-green-300 border-green-400" : " bg-gray-100 border-gray-300"} font-semibold shadow-sm border-[1px] text-xs pl-1 pr-1 p-[2px] rounded-md`}>
                    Off
                </button>
                <button onClick={() => setShowAttacks("one")} className={`${showAttacks === "one" ? "bg-green-300 border-green-400" : " bg-gray-100 border-gray-300"} font-semibold shadow-sm border-[1px] text-xs pl-1 pr-1 p-[2px] rounded-md ml-2`}>
                    One Layer
                </button>
                <button onClick={() => setShowAttacks("multiple")} className={`${showAttacks === "multiple" ? "bg-green-300 border-green-400" : " bg-gray-100 border-gray-300"} font-semibold shadow-sm border-[1px] text-xs pl-1 pr-1 p-[2px] rounded-md ml-2`}>
                    Multiple Layers
                </button>
            </div>
        </div>
    )
}

export default Controls