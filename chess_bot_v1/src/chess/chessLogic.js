import { variableNamesToPieceType } from "./referenceObjects"
import { pawnMoves, knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves } from "./legalMoves"

// 
// Return an array of locations where this piece can legally move
// 

export const whereCanThatPieceMove = (tile, matchingPiece, whitePieces) => {

    let pieceName = variableNamesToPieceType[matchingPiece]
    let moves = []

    if(pieceName === "pawn") {
        moves = pawnMoves(tile, whitePieces)
    }
    if(pieceName === "knight") {
        moves = knightMoves(tile, whitePieces) 
    }
    if(pieceName === "bishop") {
        moves = bishopMoves(tile, whitePieces)
    }
    if(pieceName === "rook") {
        moves = rookMoves(tile, whitePieces)
    }
    if(pieceName === "queen") {
        moves = queenMoves(tile, whitePieces)
    }
    if(pieceName === "king") {
        moves = kingMoves(tile, whitePieces)
    }

    return moves
}

export const movePiece = (currentTile, moveToTile, whitePieces) => {

    // Reverse through the location object to find the pieceName variable
    function getPiecenameByLocation(value, locations) {
        return Object.entries(locations).find(([key, objValue]) => objValue === value)?.[0];
    }

    const pieceName = getPiecenameByLocation(currentTile, whitePieces)
    const legalMoves = whereCanThatPieceMove(currentTile, pieceName, whitePieces)

    if(legalMoves.includes(moveToTile)) {
        return pieceName
    } else {
        return false
    }
}