import { useState, useEffect } from "react";
import { variableNamesToURLPath } from "../other/referenceObjects";

function Pieces({
    tile,
    index,

    whitePieces,
    blackPieces,

    handleBoardClick,

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

    const getTileClass = () => {
        // if (isWhiteKingInCheck && matchingPieceWhite?.[0]?.includes("King")) {
        //   return "bg-red-400"; // Highest priority: White King in check
        // }
        // if (isBlackKingInCheck && matchingPieceBlack?.[0]?.includes("King")) {
        //   return "bg-red-400"; // Highest priority: Black King in check
        // }
        // if (legalMovesForSelectedPiece.includes(tile)) {
        //   return "bg-gray-400"; // Second priority: Legal move
        // }
        // if (!showLayeredAttacks && whatWhiteSees.includes(tile) && whitesTurn) {
        //   return "whatPlayerSeesOne"; // Third priority: White sees attack (when not layered)
        // }
        // if (!showLayeredAttacks && whatBlackSees.includes(tile) && !whitesTurn) {
        //   return "whatPlayerSeesOne"; // Third priority: Black sees attack (when not layered)
        // }
        // if (showLayeredAttacks) {
        //   if (count === 1) return "whatPlayerSeesOne";
        //   if (count === 2) return "whatPlayerSeesTwo";
        //   if (count > 2) return "whatPlayerSeesThree";
        // }
        return "";
    };

    const tileClass = getTileClass()

    return (
        <div
            key={tile}
            className={`col-span-1 row-span-1 cursor-pointer
                ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
                ${tileClass}`
            }

        // When part of the board is clicked, find out if that square has a piece on it
        onClick={() => {
            // clickPartOfTheBoard(
            //     tile,
            //     matchingPieceWhite ? matchingPieceWhite[0] : false,
            //     matchingPieceBlack ? matchingPieceBlack[0] : false
            // );
            handleBoardClick(tile)
        }}

        >
            <div className="fixed mt-[70px] ml-[2px] text-xs text-gray-700">
                {tile}
            </div>
            {matchingPieceWhite && (
                <img
                    alt="chess piece"
                    style={{
                        ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                    }}
                    className={`w-[76px] h-[76px] ml-[5px] mt-[5px] z-[100] duration-150 ease-out`}
                    src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`}
                />
            )}
            {matchingPieceBlack && (
                <img
                    alt="chess piece"
                    style={{
                        ...(tileToBeAnimated && tileToBeAnimated === tile && { position: "relative", left: `${tilePosition.x}px`, bottom: `${tilePosition.y}px` })
                    }}
                    className={`w-[76px] h-[76px] ml-[5px] mt-[5px] z-[100] duration-150 ease-out`}
                    src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`}
                />
            )}
        </div>
    )
}

export default Pieces