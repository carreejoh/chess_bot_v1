import { useEffect, useState } from "react"
import { initialWhitePieces, initialBlackPieces } from "./chessLocations";
import { whereCanThatPieceMove, movePiece } from "./chessLogic";
import { variableNamesToURLPath } from "./referenceObjects";

function Board() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    const [whitesTurn, setWhitesTurn] = useState(true)

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

    // 
    // Change the white or black useState holding locations
    // 

    const changePieceLocation = (pieceName, newTile) => {
        if (whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: newTile,
            }));
            setWhitesTurn(false)
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: newTile,
            }));
            setWhitesTurn(true)
        }
    };

    // 
    // Change the piece in either state to "na"
    // 

    const handleCapture = (pieceName, player) => {
        if (player === "white") {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: "na",
            }));
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: "na",
            }));
        }
    }

    useEffect(() => {
        console.log(blackPieces)
    }, [blackPieces])

    // 
    // This searches each object by key, and finds what the piece variable name is
    // 

    function getPiecenameByLocation(value, locations) {
        return Object.entries(locations).find(([key, objValue]) => objValue === value)?.[0];
    }

    // 
    // Handle all clicks on the board. This will account for many different scenarios
    // White/Black => Empty Space
    // White/Black => Invalid Move 
    // White/Black => Capture
    // Random Click

    function clickPartOfTheBoard(tile, matchingPieceWhite, matchingPieceBlack) {

        // setLastClickedSquare(tile)
        const whitePiecePositions = Object.values(whitePieces);
        const blackPiecePositions = Object.values(blackPieces);

        let locations = []

        if (matchingPieceWhite) {
            locations = whereCanThatPieceMove(tile, matchingPieceWhite, whitePieces, blackPieces)
        }
        if (matchingPieceBlack) {
            locations = whereCanThatPieceMove(tile, matchingPieceBlack, whitePieces, blackPieces)
        }

        setLegalMovesForSelectedPiece(locations)

        if (whitesTurn) {
            // Random clicks
            if (!whitePiecePositions.includes(lastClickedSquare) && !whitePiecePositions.includes(tile)) {
                console.log("nothing to nothing")
                setLegalMovesForSelectedPiece([])
            }

            // Move a piece to empty space or capture
            if (whitePiecePositions.includes(lastClickedSquare) && !whitePiecePositions.includes(tile)) {
                let validMove = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, whitePieces)
                if (validMove) {
                    changePieceLocation(validMove, tile)

                    // This represents a capture
                    if (blackPiecePositions.includes(tile)) {
                        const blackPiece = getPiecenameByLocation(tile, blackPieces)
                        console.log(blackPiece)
                        handleCapture(blackPiece, "black")
                    }
                }
            }

        }

        if (!whitesTurn) {
            // Random clicks
            if (!blackPiecePositions.includes(lastClickedSquare) && !blackPiecePositions.includes(tile)) {
                console.log("nothing to nothing")
                setLegalMovesForSelectedPiece([])
            }

            // /a piece to empty space or capture
            if (blackPiecePositions.includes(lastClickedSquare) && !blackPiecePositions.includes(tile)) {
                let validMove = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, blackPieces)
                if (validMove) {
                    changePieceLocation(validMove, tile)

                    // This represents a capture
                    if (whitePiecePositions.includes(tile)) {
                        const blackPiece = getPiecenameByLocation(tile, whitePieces)
                        handleCapture(blackPiece, "white")
                    }
                }
            }
        }

        setLastClickedSquare(tile)

    }

    return (
        <div>
            <div className="flex">
                <button onClick={() => { setWhitePieces(initialWhitePieces); setBlackPieces(initialBlackPieces) }}>
                    Reset
                </button>
                <h2 className="ml-4">Turn: </h2>
                {whitesTurn ? (
                    <div className="h-4 w-4 bg-white">
                    </div>
                ) : (
                    <div className="h-4 w-4 bg-black">
                    </div>
                )}
            </div>
            <div className="w-[700px] h-[700px] bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">

                {allBoardSquares.map((tile, index) => {

                    // 
                    const isBlack = Math.floor(index / 8) % 2 === index % 2;
                    const matchingPieceWhite = Object.entries(whitePieces).find(([key, value]) => value === tile);
                    const matchingPieceBlack = Object.entries(blackPieces).find(([key, value]) => value === tile);

                    return (
                        <div
                            key={tile}
                            className={`col-span-1 row-span-1 cursor-pointer
                        ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"} 
                        ${lastClickedSquare === tile && "selectedSquare"} 
                        ${legalMovesForSelectedPiece.includes(tile) && "selectedSquare"}`
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
                                    <img alt="chess piece" className="w-full h-full" src={`/${variableNamesToURLPath[matchingPieceWhite[0]]}`} />
                                )}
                                {matchingPieceBlack && (
                                    <img alt="chess piece" className="w-full h-full" src={`/${variableNamesToURLPath[matchingPieceBlack[0]]}`} />
                                )}
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default Board