import { useEffect, useState } from "react";
import { allPieceLegalMoves } from "../logic/allAvailableMoves";

import CapturedPieces from "./capturedPieces";
import Controls from "./controls";
import Pieces from "./pieces";

// All animations, moves UI, holds all controls and other components

function Board({
    whitePieces,
    blackPieces,
    castlingVariables,

    handleBoardClick,

    animations,
    tileToBeAnimated,

    whitesTurn
}) {

    // Shows attacks that current player has.
    // "off", "one", "multiple"
    const [showAttacks, setShowAttacks] = useState("one")
    const [attacks, setAttacks] = useState([])

    // This shows what squares are under the control of each player
    useEffect(() => {
        // attacks is turned off
        if (showAttacks === "off") {
            setAttacks([])
            return
        }

        const allLegalMoves = allPieceLegalMoves(whitePieces, blackPieces, castlingVariables)
        if (whitesTurn && showAttacks === "one") {
            const noDups = [...new Set(allLegalMoves.combinedLegalMoveArrayWhite)];
            setAttacks(noDups)
        }
        if (!whitesTurn && showAttacks === "one") {
            const noDups = [...new Set(allLegalMoves.combinedLegalMoveArrayBlack)];
            setAttacks(noDups)
        }
        if (whitesTurn && showAttacks === "multiple") {
            setAttacks(allLegalMoves.combinedLegalMoveArrayWhite)
        }
        if (!whitesTurn && showAttacks === "multiple") {
            setAttacks(allLegalMoves.combinedLegalMoveArrayBlack)
        }
    }, [whitePieces, blackPieces, castlingVariables, whitesTurn, showAttacks])

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
        <div className="flex">
            <div>
                <CapturedPieces
                    player={"black"}
                    pieces={whitePieces}
                />
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

                            attacks={attacks}
                        />
                    ))}
                </div>
                <CapturedPieces
                    player={"white"}
                    pieces={blackPieces}
                />
            </div>
            <Controls
                showAttacks={showAttacks}
                setShowAttacks={setShowAttacks}
            />
        </div>
    )
}

export default Board