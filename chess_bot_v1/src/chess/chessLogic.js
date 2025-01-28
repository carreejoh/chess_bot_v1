import { variableNamesToPieceType } from "./referenceObjects"
import { pawnMoves, knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves } from "./legalMoves"

// 
// Return an array of locations where this piece can legally move
// 

export const whereCanThatPieceMove = (tile, matchingPiece, whitePieces, blackPieces) => {

    let pieceName = variableNamesToPieceType[matchingPiece]

    let moves = []
    console.log(blackPieces)

    if(pieceName === "pawn") {
        moves = pawnMoves(tile, whitePieces, blackPieces)
    }
    if(pieceName === "knight") {
        moves = knightMoves(tile, whitePieces, blackPieces) 
    }
    if(pieceName === "bishop") {
        moves = bishopMoves(tile, whitePieces, blackPieces)
    }
    if(pieceName === "rook") {
        moves = rookMoves(tile, whitePieces, blackPieces)
    }
    if(pieceName === "queen") {
        moves = queenMoves(tile, whitePieces, blackPieces)
    }
    if(pieceName === "king") {
        moves = kingMoves(tile, whitePieces, blackPieces)
    }

    return moves
}

export const movePiece = (currentTile, moveToTile, whitePieces, blackPieces, selectedPiecesArray) => {

    // Reverse through the location object to find the pieceName variable
    function getPiecenameByLocation(value, locations) {
        return Object.entries(locations).find(([key, objValue]) => objValue === value)?.[0];
    }
    
    const pieceName = getPiecenameByLocation(currentTile, selectedPiecesArray)
    const legalMoves = whereCanThatPieceMove(currentTile, pieceName, whitePieces, blackPieces)

    if(legalMoves.includes(moveToTile)) {
        return pieceName
    } else {
        return false
    }
}