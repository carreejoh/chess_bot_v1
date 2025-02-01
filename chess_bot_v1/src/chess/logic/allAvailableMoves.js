import { whereCanThatPieceMove } from "../legalMoves/logic/whereCanThatPieceMove"
import { isThatValidMove } from "./isThatValidMove"

// This function will include ALL legal moves.

// This will account for piece movement, putting kings in check, king safety,
// attacks, castling, etc for every single piece

export const allPieceLegalMoves = (
    whitePieces,
    blackPieces,
    castlingVariables
) => {

    // Dyanmically set who's pieces to look at
    // BUG WASNT WORKING

    // These are for potentional MOVES. Does NOT include current location
    let whitePiecesObject = {}
    let blackPiecesObject = {}

    // let whiteKingCheck = isWhiteKingInCheck
    // let blackKingCheck = isBlackKingInCheck

    // Convert piece objects from {"piece": "location"} to {"piece": ["move1Location", "move2Location"]}
    // Check for all legal moves by pieces, including attacks, king safety, pins, checks

    Object.entries(whitePieces).forEach(([key, value]) => {
        let pieceMovement = whereCanThatPieceMove(value, key, whitePieces, blackPieces, castlingVariables)
        let legal = []
        pieceMovement.forEach((move) => {
            let validMove = isThatValidMove(whitePieces, blackPieces, castlingVariables, move, value)
            if (validMove) {
                legal.push(move)
            }
        })
        whitePiecesObject[key] = legal
    })
    Object.entries(blackPieces).forEach(([key, value]) => {
        let pieceMovement = whereCanThatPieceMove(value, key, whitePieces, blackPieces, castlingVariables)
        let legal = []
        pieceMovement.forEach((move) => {
            let validMove = isThatValidMove(whitePieces, blackPieces, castlingVariables, move, value)
            if (validMove) {
                legal.push(move)
            }
        })
        blackPiecesObject[key] = legal
    })




    // This is for visual on board. Includes attacks, and movement
    let combinedLegalMoveArrayWhite = []
    let combinedLegalMoveArrayBlack = []

    Object.entries(whitePiecesObject).forEach(([key, value]) => {
        combinedLegalMoveArrayWhite.push(value)
    })
    Object.entries(blackPiecesObject).forEach(([key, value]) => {
        combinedLegalMoveArrayBlack.push(value)
    })


    combinedLegalMoveArrayWhite = combinedLegalMoveArrayWhite.flat()
    combinedLegalMoveArrayBlack = combinedLegalMoveArrayBlack.flat()

    return { combinedLegalMoveArrayWhite, combinedLegalMoveArrayBlack, whitePiecesObject, blackPiecesObject }

}