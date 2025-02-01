import Pieces from "./pieces";

// All animations, moves UI

function Board({
    whitePieces,
    blackPieces,

    handleBoardClick,

    animations,
    tileToBeAnimated
}) {

    // This logic builds the board 
    const allBoardSquares = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    ranks.forEach((rank) => {
        files.forEach((file) => {
            allBoardSquares.push(`${file}${rank}`);
        });
    });

    return (
        <div>
            <div className="w-[700px] h-[700px] bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">
                {allBoardSquares.map((tile, index) => (
                    <Pieces
                        key={index}
                        index={index}
                        tile={tile}

                        whitePieces={whitePieces}
                        blackPieces={blackPieces}

                        handleBoardClick={handleBoardClick}

                        animations={animations}
                        tileToBeAnimated={tileToBeAnimated}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board