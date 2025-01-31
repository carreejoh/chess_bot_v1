import { useState } from "react"
import {
    initialWhitePieces,
    initialBlackPieces
} from "../chess/chessLocations"
import { allLegalMovesForPiece } from "./logic/isMoveLegal"
import { convertTileLocationToPiecename } from "./conversionFunctions"

import Board from "./components/board"



// 
// Hold ALL logic and state for piece movement, and calculations
// Pass instructions to the board for moving pieces.
// 

function Main() {

    // This tracks the location of the white and black pieces
    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)

    // Track players turn
    const [whitesTurn, setWhitesTurn] = useState(true)

    // Which tile was clicked last.
    // Reset to null if successful move/capture by either player
    const [lastClickedTile, setLastClickedTile] = useState(null)

    // Castling variables
    const [castlingVariables, setCastlingVariables] = useState({
        hasWhiteKingBeenMoved: false,
        hasBlackKingBeenMoved: false,
        hasWhiteRookOneBeenMoved: false,
        hasWhiteRookTwoBeenMoved: false,
        hasBlackRookOneBeenMoved: false,
        hasBlackRookTwoBeenMoved: false
    })

    // Move the piece location in either object
    const changePieceLocation = (oldTile, newTile) => {
        let piece = convertTileLocationToPiecename(oldTile, whitePieces, blackPieces)
        if (whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [piece]: newTile,
            }));
            setWhitesTurn(false)
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [piece]: newTile,
            }));
            setWhitesTurn(true)
        }
    };

    // Whenever any part of the board is clicked determine 
    // if this is random (accidental), starting a move, or trying to move.
    // I want to be able to bypass this with a bot
    const handleTileClick = (tile) => {
        const whitePieceLocations = Object.values(whitePieces)
        const blackPieceLocations = Object.values(blackPieces)

        // MOVE ATTEMPT WHITE
        if (whitesTurn && whitePieceLocations.includes(lastClickedTile) && !whitePieceLocations.includes(tile)) {

            const allLegalMoves = allLegalMovesForPiece(whitePieces, blackPieces, castlingVariables, lastClickedTile)
            if(allLegalMoves.includes(tile)) {
                changePieceLocation(lastClickedTile, tile)
            }
            console.log(allLegalMoves)

            setLastClickedTile(null)
            return
        }

        // MOVE ATTEMPT BLACK
        if (!whitesTurn && blackPieceLocations.includes(lastClickedTile) && !blackPieceLocations.includes(tile)) {

            const allLegalMoves = allLegalMovesForPiece(whitePieces, blackPieces, castlingVariables, lastClickedTile)
            if(allLegalMoves.includes(tile)) {
                changePieceLocation(lastClickedTile, tile)
            }

            setLastClickedTile(null)
            return
        }

        // If no valid action above set lastClickedTile
        setLastClickedTile(tile)
    }

    return (
        <div>
            <Board

                // All piece locations, and set state
                whitePieces={whitePieces}
                blackPieces={blackPieces}

                handleTileClick={handleTileClick}

            />
        </div>
    )
}

export default Main