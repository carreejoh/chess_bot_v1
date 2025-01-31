import { variableNamesToURLPath } from "../objects/referenceObjects";

function Pieces({
    index,
    tile,

    whitePieces,
    blackPieces,

    handleTileClick
}) {

    // Is the square white or black? For UI only
    const isBlack = Math.floor(index / 8) % 2 === index % 2;

    // Is this a white or black piece? 
    const matchingPieceWhite = Object.entries(whitePieces).find(([key, value]) => value === tile);
    const matchingPieceBlack = Object.entries(blackPieces).find(([key, value]) => value === tile);

    return (
        <div
            key={tile}
            onClick={() => handleTileClick(tile)}
            className={`col-span-1 row-span-1 cursor-pointer
            ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
            `}
        >
            {/* Shows file/rank */}
            <div className="fixed mt-[70px] ml-[2px] text-xs text-gray-700">
                {tile}
            </div>

            {/* White or black piece */}
            <div className="w-full h-full p-1">
                {matchingPieceWhite && (
                    <img
                        alt="chess piece"
                        // style={{
                        //     ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                        // }}
                        className={`w-[76px] h-[76px] z-[100] duration-150 ease-out`}
                        src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`}
                    />
                )}
                {matchingPieceBlack && (
                    <img
                        alt="chess piece"
                        // style={{
                        //     ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                        // }}
                        className={`w-[76px] h-[76px] z-[100] duration-150 ease-out`}
                        src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`}
                    />
                )}
            </div>
        </div>
    )
}

export default Pieces