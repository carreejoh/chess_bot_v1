import { useState, useEffect } from "react"
import { initialWhitePieces, initialBlackPieces } from "./other/chessLocations"
import { isThatValidMove } from "./logic/isThatValidMove"
import { isThisCastling, rebuildCastlingVariables } from "./logic/isThisACastlingAttempt"
import { botOne } from "./bots/firstBot"
import { calculateAnimations } from "./other/calculateAnimations"

import Board from "./components/board"
import { convertTileLocationToPiecename } from "./other/conversionFunctions"

// All movement logic, calculations, location state

function Main() {

    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    const [whitesTurn, setWhitesTurn] = useState(true)

    // The last tile that was clicked
    const [lastClickedSquare, setLastClickedSquare] = useState(null)

    // Animations
    const [tileToBeAnimated, setTileToBeAnimated] = useState(null)
    const [animations, setAnimations] = useState({
        dx: 0,
        dy: 0
    })

    // Variables for castling
    const [castlingVariables, setCastlingVariables] = useState({
        hasWhiteKingBeenMoved: false,
        hasBlackKingBeenMoved: false,
        hasWhiteRookOneBeenMoved: false,
        hasWhiteRookTwoBeenMoved: false,
        hasBlackRookOneBeenMoved: false,
        hasBlackRookTwoBeenMoved: false
    })

    // // Bot implementation
    // useEffect(() => {
    //     if (!whitesTurn) {
    //         setTileToBeAnimated(null);
    //         setAnimations({});
    //         setTimeout(() => {
    //             let bot = botOne(whitePieces, blackPieces, castlingVariables)
    //             console.log(bot)
    //             verifyAndMovePiece(bot.moveToTile, bot.originalTile)
    //         }, 200)
    //     }
    // }, [whitesTurn])

    // This calculates the animations for the piece to be moved
    const handleAnimations = (tile, currentTile) => {
        if (tileToBeAnimated !== null) return; 
        const animationAngles = calculateAnimations(currentTile, tile);
        setTileToBeAnimated(currentTile);
        setAnimations(animationAngles);
        setTimeout(() => {
            setTileToBeAnimated(null);
            setAnimations({});
        }, 170);
    };
    

    // Change castling variables,
    // Moves pieces in other function
    const handleCastling = (moveToTile) => {
        let castling = rebuildCastlingVariables(moveToTile, castlingVariables, whitePieces, blackPieces)
        setCastlingVariables(castling.castleVariablesClone)
        setWhitePieces(castling.whitePiecesClone)
        setBlackPieces(castling.blackPiecesClone)
        setWhitesTurn(!whitesTurn)
    }

    // Change the location of either players piece
    const changePiecePosition = (moveToTile, currentTile) => {
        let piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)
        if (whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [piece]: moveToTile,
            }));
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [piece]: moveToTile,
            }));
        }
    }

    // Set either players piece to "na" based on tile
    const handleCapture = (tile) => {
        let piece = convertTileLocationToPiecename(tile, whitePieces, blackPieces)
        if (!piece) return
        if (!whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [piece]: "na",
            }));
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [piece]: "na",
            }));
        }
    }

    // Verify the user is attempting a legal move
    // If indeed legal move, handle any captures, and change the position
    const verifyAndMovePiece = (moveToTile, currentTile) => {

        // Account for king safety, legal movement
        let validMove = isThatValidMove(whitePieces, blackPieces, castlingVariables, moveToTile, currentTile)
        if (!validMove) return

        // Check if this is a castling attempt
        let castling = isThisCastling(whitePieces, blackPieces, moveToTile, currentTile)
        if (castling) {
            handleCastling(moveToTile)
            return
        }

        if (validMove) {
            handleAnimations(moveToTile, currentTile)
            // Board logic
            // Delay by 150 ms for animations
            setTimeout(() => {
                handleCapture(moveToTile)
                changePiecePosition(moveToTile, currentTile)
                setWhitesTurn(!whitesTurn)
            }, 150)
        }
    }

    // Simple logic to determine what the player was trying to do
    // if they click the board
    const handleBoardClick = (tile) => {

        // Get positions of both player's pieces
        const whitePieceLocations = Object.values(whitePieces);
        const blackPieceLocations = Object.values(blackPieces);

        // White player is trying to move piece
        if (whitesTurn && whitePieceLocations.includes(lastClickedSquare) && !whitePieceLocations.includes(tile)) {
            verifyAndMovePiece(tile, lastClickedSquare)
        }

        // Black player is trying to move piece
        if (!whitesTurn && blackPieceLocations.includes(lastClickedSquare) && !blackPieceLocations.includes(tile)) {
            verifyAndMovePiece(tile, lastClickedSquare)
        }

        // Set the last clicked square as the tile
        setLastClickedSquare(tile)
    }



    return (
        <Board
            whitePieces={whitePieces}
            blackPieces={blackPieces}
            castlingVariables={castlingVariables}

            handleBoardClick={handleBoardClick}

            animations={animations}
            tileToBeAnimated={tileToBeAnimated}

            whitesTurn={whitesTurn}
        />
    )
}

export default Main