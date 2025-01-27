import { useState } from "react"
import { initialWhitePieces } from "./chessLocations";
import { whereCanThatPieceMove, movePiece } from "./chessLogic";
import { variableNamesToURLPath } from "./referenceObjects";

function Board() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)

    // This logic builds the board 
    const allBoardSquares = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    ranks.forEach((rank) => {
        files.forEach((file) => {
            allBoardSquares.push(`${file}${rank}`);
        });
    });

    const [lastClickedSquare, setLastClickedSquare] = useState(null)
    const [legalMovesForSelectedPiece, setLegalMovesForSelectedPiece] = useState([])

    const changePieceLocation = (pieceName, newTile) => {
        setWhitePieces((prevPieces) => ({
            ...prevPieces,
            [pieceName]: newTile, 
        }));
    };

    function clickPartOfTheBoard(tile, matchingPiece) {

        const whitePiecePositions = Object.values(whitePieces);

        // You click on an empty square without pressing on a piece first
        if(!matchingPiece && !whitePiecePositions.includes(lastClickedSquare)) {
            console.log("No piece was selected, and nothing on this square")
            setLegalMovesForSelectedPiece([])
            setLastClickedSquare(null)
        }

        // You click a piece, but nothing was pressed first
        if(matchingPiece && !lastClickedSquare) {
            console.log("Piece selected, piece on this square, first click")
            setLastClickedSquare(tile)
        }

        // You click a piece first, and then an empty square
        if(!matchingPiece && whitePiecePositions.includes(lastClickedSquare)) {
            console.log("Piece selected, and nothing on this square")
            // Move the piece based on the last clicked position, and then the new clicked position
            let validMove = movePiece(lastClickedSquare, tile, whitePieces)
            if(validMove) { 
                changePieceLocation(validMove, tile)
                setLastClickedSquare(null)
            } else {
                setLastClickedSquare(null)
            }
        }

        // setLastClickedSquare(tile)

        // Find where a clicked piece can move to and display to user
        const locations = whereCanThatPieceMove(tile, matchingPiece, whitePieces)
        setLegalMovesForSelectedPiece(locations)

    }

    return (
        <div className="w-[700px] h-[700px] bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">

            {allBoardSquares.map((tile, index) => {

                // 
                const isBlack = Math.floor(index / 8) % 2 === index % 2;
                const matchingPiece = Object.entries(whitePieces).find(([key, value]) => value === tile);

                return (
                    <div
                        key={tile}
                        className={`col-span-1 row-span-1 cursor-pointer
                            ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"} 
                            ${lastClickedSquare === tile && "selectedSquare"} 
                            ${legalMovesForSelectedPiece.includes(tile) && "selectedSquare"}`
                        }
                        
                        // When part of the board is clicked, find out if that square has a piece on it
                        onClick={() => {clickPartOfTheBoard(tile, matchingPiece ? matchingPiece[0] : false)}}
                    >
                        <div className="fixed mt-[70px] text-xs text-gray-700">
                            {tile}
                        </div>
                        <div className="w-full h-full p-1">
                            {matchingPiece && (
                                <img alt="chess piece" className="w-full h-full" src={`/${variableNamesToURLPath[matchingPiece[0]]}`} />
                            )}
                        </div>
                    </div>
                );
            })}



        </div>
    )
}

export default Board