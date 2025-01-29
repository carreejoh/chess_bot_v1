

function Stats({
    whatWhiteSees,
    whatBlackSees,
    whitesTurn
}) {
    return(
        <div className="w-48 h-[764px] pt-9 pl-2">
            <h2 className="text-sm font-semibold">White sees {whatWhiteSees.length} tiles.</h2>
            <h2 className="text-sm font-semibold">Black sees {whatBlackSees.length} tiles.</h2>
            <button className="mt-2 text-sm">
                Toggle Amount
            </button>
        </div>
    )
}

export default Stats