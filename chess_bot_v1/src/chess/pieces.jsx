import { useState } from "react";
import { variableNamesToURLPath } from "./referenceObjects";

function Pieces({
    tile,
    isBlack,
    lastClickedSquare,
    whatWhiteSees,
    whatBlackSees,
    legalMovesForSelectedPiece,
    isWhiteKingInCheck,
    isBlackKingInCheck,
    whitesTurn,
    matchingPieceBlack,
    matchingPieceWhite,
    clickPartOfTheBoard
}) {

    return (
        <div
            key={tile}
            className={`col-span-1 row-span-1 cursor-pointer
            ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
            ${lastClickedSquare === tile && whitesTurn && matchingPieceWhite && "selectedSquare"}
            ${lastClickedSquare === tile && !whitesTurn && matchingPieceBlack && "selectedSquare"}
            ${whatWhiteSees.includes(tile) && whitesTurn && "selectedSquare"}
            ${whatBlackSees.includes(tile) && !whitesTurn && "selectedSquare"}
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
            <div className="w-full h-full p-1 relative">
                {matchingPieceWhite && (
                    <img alt="chess piece"
                        className={`w-full h-full z-50`}
                        src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`}
                    />
                )}
                {matchingPieceBlack && (
                    <img alt="chess piece" className="w-full h-full z-50" src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`} />
                )}
            </div>
        </div>
    )
}

export default Pieces