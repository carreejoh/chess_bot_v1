import { whereCanThatPieceMove } from "./whereCanThatPieceMove"
import { isEitherKingInCheck } from "./isMyKingInDanger"

// This function will include ALL legal moves.

// This will account for piece movement, putting kings in check, king safety,
// attacks, castling, etc for every single piece

export const allPieceLegalMoves = (
    whitePieces,
    blackPieces,
    whitesTurn,
    isWhiteKingInCheck,
    isBlackKingInCheck,
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

    if (whitesTurn === "white") {
        Object.entries(whitePieces).forEach(([key, value]) => {
            let pieceMovement = whereCanThatPieceMove(value, key, whitePieces, blackPieces, castlingVariables)
            let legal = []
            pieceMovement.forEach((move) => {
                let kingStatus = isEitherKingInCheck(whitePieces, blackPieces, key, move, "white", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)
                if (kingStatus.legalMove) {
                    legal.push(move)
                }
            })
            whitePiecesObject[key] = legal
        })
    } else {
        Object.entries(blackPieces).forEach(([key, value]) => {
            let pieceMovement = whereCanThatPieceMove(value, key, whitePieces, blackPieces, castlingVariables)
            let legal = []
            pieceMovement.forEach((move) => {
                let kingStatus = isEitherKingInCheck(whitePieces, blackPieces, key, move, "black", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)
                if (kingStatus.legalMove) {
                    legal.push(move)
                }
            })
            blackPiecesObject[key] = legal
        })
    }




    // This is for visual on board. Includes attacks, and movement
    let combinedLegalMoveArray = []

    if (whitesTurn === "white") {
        Object.entries(whitePiecesObject).forEach(([key, value]) => {
            combinedLegalMoveArray.push(value)
        })
    } else {
        Object.entries(blackPiecesObject).forEach(([key, value]) => {
            combinedLegalMoveArray.push(value)
        })
    }


    combinedLegalMoveArray = combinedLegalMoveArray.flat()

    return {combinedLegalMoveArray, whitePiecesObject, blackPiecesObject}

}