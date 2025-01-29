

function Stats({
    whatWhiteSees,
    whatBlackSees,
    whitesTurn,
    showLayeredAttacks,
    setShowLayeredAttacks
}) {
    return(
        <div className="w-48 h-[764px] pt-9 pl-2">
            <h2 className="text-sm font-semibold">White sees {whatWhiteSees.length} tiles.</h2>
            <h2 className="text-sm font-semibold">Black sees {whatBlackSees.length} tiles.</h2>
            <button className="mt-2 text-sm"
                    onClick={() => setShowLayeredAttacks(!showLayeredAttacks)}
            >
                Toggle Layers
            </button>
        </div>
    )
}

export default Stats