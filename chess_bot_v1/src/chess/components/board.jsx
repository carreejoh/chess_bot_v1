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
    // Store all legal moves for UI purposes
    const [allLegalMoves, setAllLegalMoves] = useState(null)

    // Shows attacks that current player has.
    // "off", "one", "multiple"
    const [showAttacks, setShowAttacks] = useState("one")
    const [attacks, setAttacks] = useState([])

    // Is either king in check
    const [isWhiteKingInCheck, setIsWhiteKingInCheck] = useState(false)
    const [isBlackKingInCheck, setIsBlackKingInCheck] = useState(false)

    // Find and set all legal moves state
    useEffect(() => {
        const legalMoves = allPieceLegalMoves(whitePieces, blackPieces, castlingVariables)
        setAllLegalMoves(legalMoves)
    }, [whitePieces, blackPieces, castlingVariables])

    // This shows all legal moves including attacks 
    useEffect(() => {
        if(!allLegalMoves) return

        // attacks is turned off
        if (showAttacks === "off") {
            setAttacks([])
        }
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
    }, [showAttacks, allLegalMoves, whitesTurn])

    // Check to see if either king is in check for UI
    useEffect(() => {
        if(!allLegalMoves) return

        if(allLegalMoves.combinedLegalMoveArrayWhite.includes(blackPieces.blackKing)) {
            setIsBlackKingInCheck(true)
        } 
        if(!allLegalMoves.combinedLegalMoveArrayWhite.includes(blackPieces.blackKing)) {
            setIsBlackKingInCheck(false)
        }
        if(allLegalMoves.combinedLegalMoveArrayBlack.includes(whitePieces.whiteKing)) {
            setIsWhiteKingInCheck(true)
        } 
        if(!allLegalMoves.combinedLegalMoveArrayBlack.includes(whitePieces.whiteKing)) {
            setIsWhiteKingInCheck(false)
        }  

    }, [allLegalMoves])

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
                            isWhiteKingInCheck={isWhiteKingInCheck}
                            isBlackKingInCheck={isBlackKingInCheck}
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