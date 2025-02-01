import { whereCanThatPieceMove } from "../legalMoves/logic/whereCanThatPieceMove"
import { whatCanAllPiecesSee } from "./whatCanAllPiecesSee"

import { convertTileLocationToPiecename } from "../other/conversionFunctions"


export const isThatValidMove = (
    whitePieces,
    blackPieces,
    castlingVariables,
    moveToTile,
    currentTile
) => {

    let whitePiecesObject = { ...whitePieces };
    let blackPiecesObject = { ...blackPieces };

    // Get the pieceName
    const piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)
    // Account for any pieces that are being attacked in a move
    const moveToPiece = convertTileLocationToPiecename(moveToTile,whitePieces, blackPieces)

    // 1. REGULAR PIECE MOVEMENT
    // This accounts for attacks, and regular movement
    let movementArray = whereCanThatPieceMove(currentTile, piece, whitePieces, blackPieces, castlingVariables)

    // The piece cannot move like that. Against movement rules
    if (!movementArray.includes(moveToTile)) {
        return false
    }

    // Assign new tile to location object
    // Account for captures
    if (piece.includes("white")) {
        whitePiecesObject[piece] = moveToTile
        if(moveToPiece && moveToPiece.includes("black")) {
            blackPiecesObject[moveToPiece] = "na"
        }
    } else {
        blackPiecesObject[piece] = moveToTile
        if(moveToPiece && moveToPiece.includes("white")) {
            whitePiecesObject[moveToPiece] = "na"
        }
    }

    // 2. KING SAFETY
    // What can all pieces on the board attack
    let allAttacks = whatCanAllPiecesSee(whitePiecesObject, blackPiecesObject, castlingVariables)

    let whiteKingLocation = whitePiecesObject.whiteKing
    let blackKingLocation = blackPiecesObject.blackKing

    if (piece.includes("white") && allAttacks.allBlackMoves.includes(whiteKingLocation)) {
        return false
    }
    if (piece.includes("black") && allAttacks.allWhiteMoves.includes(blackKingLocation)) {
        return false
    }

    return true
}