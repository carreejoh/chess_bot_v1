import { useEffect, useState } from "react";
import { variableNamesToURLPath } from "../referenceObjects";

function Pieces({
    tile,
    index,
    lastClickedSquare,
    whitesTurn,
    whitePieces,
    blackPieces,
    whatWhiteSees,
    whatBlackSees,
    legalMovesForSelectedPiece,
    isWhiteKingInCheck,
    isBlackKingInCheck,
    showLayeredAttacks,
    whatPlayerSeeWithDuplicates,
    clickPartOfTheBoard,
    animations,
    tileToBeAnimated
}) {

    const isBlack = Math.floor(index / 8) % 2 === index % 2;
    const matchingPieceWhite = Object.entries(whitePieces).find(([key, value]) => value === tile);
    const matchingPieceBlack = Object.entries(blackPieces).find(([key, value]) => value === tile);
    const [tilePosition, setTilePosition] = useState({
        x: 0,
        y: 0
    })

    const [count, setCount] = useState(0)


    useEffect(() => {
        let tempCount = 0
        for (let i = 0; i < whatPlayerSeeWithDuplicates.length; i++) {
            if (whatPlayerSeeWithDuplicates[i] === tile) {
                tempCount++
            }
        }
        setCount(tempCount)
    }, [whatPlayerSeeWithDuplicates, tile])


    useEffect(() => {
        if(tileToBeAnimated === tile) {
            let tempX = animations.dx
            let tempY = -animations.dy
            setTilePosition({
                x: tempX,
                y: tempY
            })
        }
    }, [tileToBeAnimated])

    return (

        // ${lastClickedSquare === tile && whitesTurn && matchingPieceWhite && "whatPlayerSeesOne"}
        // ${lastClickedSquare === tile && !whitesTurn && matchingPieceBlack && "whatPlayerSeesOne"}

        <div
            key={tile}
            className={`col-span-1 row-span-1 cursor-pointer

            ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
            
            ${!showLayeredAttacks && whatWhiteSees.includes(tile) && whitesTurn && "whatPlayerSeesOne"}
            ${!showLayeredAttacks && whatBlackSees.includes(tile) && !whitesTurn && "whatPlayerSeesOne"}

            ${showLayeredAttacks && count === 1 && "whatPlayerSeesOne"}
            ${showLayeredAttacks && count === 2 && "whatPlayerSeesTwo"}
            ${showLayeredAttacks && count > 2 && "whatPlayerSeesThree"}

            ${legalMovesForSelectedPiece.includes(tile) && "bg-gray-400"}
            ${isWhiteKingInCheck && matchingPieceWhite && matchingPieceWhite[0].includes("King") && "bg-red-400"} 
            ${isBlackKingInCheck && matchingPieceBlack && matchingPieceBlack[0].includes("King") && "bg-red-400"} 
                            `
            }

            // When part of the board is clicked, find out if that square has a piece on it
            onClick={() => {
                clickPartOfTheBoard(
                    tile,
                    matchingPieceWhite ? matchingPieceWhite[0] : false,
                    matchingPieceBlack ? matchingPieceBlack[0] : false
                );
            }}

        >
            <div className="fixed mt-[70px] text-xs text-gray-700">
                {tile}
            </div>
            <div className="w-full h-full p-1">
                {matchingPieceWhite && (
                    <img 
                        alt="chess piece"
                        style={{
                            ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                        }}
                        className={`w-[76px] h-[76px] z-[100] duration-150 ease-out`}
                        src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`}
                    />
                )}
                {matchingPieceBlack && (
                    <img 
                        alt="chess piece"
                        style={{
                            ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                        }}
                        className={`w-[76px] h-[76px] z-[100] duration-150 ease-out`}
                        src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`}
                    />
                )}
            </div>
        </div>
    );
}

export default Pieces