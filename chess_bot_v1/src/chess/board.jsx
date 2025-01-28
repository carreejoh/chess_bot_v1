import { useEffect, useState } from "react"
import { initialWhitePieces, initialBlackPieces } from "./chessLocations";
import { whereCanThatPieceMove, movePiece, whatCanAllPiecesSee } from "./chessLogic";
import { variableNamesToURLPath } from "./referenceObjects";
import { calculateAnimations } from "./calculateAnimations";

import Controls from "./secondary/controls";
import CapturedPieces from "./secondary/capturedPieces";

function Board() {

    // TODO
    // Can't put yourself in check (walking king, or moving piece)
    // Have to move out of check
    // Checkmates
    // Castle
    // En Passant
    // What does white/black "see"

    // This tracks the location of the white and black pieces
    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    // This is whos turn it is
    const [whitesTurn, setWhitesTurn] = useState(true)

    const [whatWhiteSees, setWhatWhiteSees] = useState([])

    console.log(whatWhiteSees)

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

        const whitePiecePositions = Object.values(whitePieces);
        const blackPiecePositions = Object.values(blackPieces);

        let locations = []

        if (whitesTurn) {
            if (matchingPieceWhite) {
                locations = whereCanThatPieceMove(tile, matchingPieceWhite, whitePieces, blackPieces)
            }
            setLegalMovesForSelectedPiece(locations)

            // Random clicks
            if (!whitePiecePositions.includes(lastClickedSquare) && !whitePiecePositions.includes(tile)) {
                setLegalMovesForSelectedPiece([])
            }

            // Move a piece to empty space or capture
            if (whitePiecePositions.includes(lastClickedSquare) && !whitePiecePositions.includes(tile)) {
                let validMove = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, whitePieces)
                if (validMove) {

                    let anyChecks = whatCanAllPiecesSee(whitePieces, blackPieces, validMove, tile)
                    setWhatWhiteSees(anyChecks)
                    
                    changePieceLocation(validMove, tile)

                    // This represents a capture
                    // Animate capture
                    if (blackPiecePositions.includes(tile)) {
                        const blackPiece = getPiecenameByLocation(tile, blackPieces)
                        handleCapture(blackPiece, "black")
                    }
                }
            }

        }

        if (!whitesTurn) {
            if (matchingPieceBlack) {
                locations = whereCanThatPieceMove(tile, matchingPieceBlack, whitePieces, blackPieces)
            }
            setLegalMovesForSelectedPiece(locations)

            // Random clicks
            if (!blackPiecePositions.includes(lastClickedSquare) && !blackPiecePositions.includes(tile)) {
                setLegalMovesForSelectedPiece([])
            }

            // /a piece to empty space or capture
            if (blackPiecePositions.includes(lastClickedSquare) && !blackPiecePositions.includes(tile)) {
                let validMove = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, blackPieces)
                if (validMove) {
                    changePieceLocation(validMove, tile)

                    // This represents a capture
                    if (whitePiecePositions.includes(tile)) {
                        const whitePiece = getPiecenameByLocation(tile, whitePieces)
                        handleCapture(whitePiece, "white")
                    }
                }
            }
        }

        setLastClickedSquare(tile)
    }

    return (
        <div>
            {/* <div className="flex">
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
            </div> */}
            <CapturedPieces
                pieces={whitePieces}
                player={"black"}
            />
            <div className="w-[700px] h-[700px] bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">
                {allBoardSquares.map((tile, index) => {

                    // 
                    const isBlack = Math.floor(index / 8) % 2 === index % 2;
                    const matchingPieceWhite = Object.entries(whitePieces).find(([key, value]) => value === tile);
                    const matchingPieceBlack = Object.entries(blackPieces).find(([key, value]) => value === tile);

                    // ${lastClickedSquare === tile && "selectedSquare"} 
                    return (
                        <div
                            key={tile}
                            className={`col-span-1 row-span-1 cursor-pointer
                                ${isBlack ? "bg-[#B98763]" : "bg-[#ECD6B1]"}
                                ${legalMovesForSelectedPiece.includes(tile) && "selectedSquare"} 
                                ${lastClickedSquare === tile && whitesTurn && matchingPieceWhite && "selectedSquare"}
                                ${lastClickedSquare === tile && !whitesTurn && matchingPieceBlack && "selectedSquare"}
                                ${whatWhiteSees.includes(tile) && "whatWhiteSees"}`
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
                    );
                })}
            </div>
            <CapturedPieces
                pieces={blackPieces}
                player={"white"}
            />
        </div>
    )
}

export default Board