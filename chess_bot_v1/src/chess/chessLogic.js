import { variableNamesToPieceType } from "./referenceObjects"
import { knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves } from "./legalMoves"

import { pawnMoves } from "./legalMoves/pawnMoves"

// 
// Return an array of locations where this piece can legally move.
// Does not account for checks
// 

export const whereCanThatPieceMove = (tile, matchingPiece, whitePieces, blackPieces) => {

    let pieceName = variableNamesToPieceType[matchingPiece]

    let moves = []

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

// 
// Ensure that the piece can legally be moved where the user clicks,
// Return false if the piece can't be moved
//

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

// 
// Ensure that a player can't put their own king in check,
// Check to see if a player has put the opponents king in check,
// Return all piece locations for a cool visual that can be toggled  
//

export const whatCanAllPiecesSee = (whitePieces, blackPieces, piece, proposedMove) => {

    let tempWhite = whitePieces
    let tempBlack = blackPieces

    if(piece.includes("white")) {
        tempWhite[piece] = proposedMove
    }
    if(piece.includes("black")) {
        tempBlack[piece] = proposedMove
    }

    let allWhiteMoves = Object.entries(tempWhite).reduce((acc, [key, value]) => {
        const moves = whereCanThatPieceMove(value, key, tempWhite, tempBlack);
        return [...acc, ...moves]; 
    }, []);

    allWhiteMoves = [...new Set(allWhiteMoves)].filter((move) => move.toLowerCase() !== "nnan");

    return allWhiteMoves
    console.log(allWhiteMoves)
    console.log(blackPieces)
    console.log(piece)
    console.log(proposedMove)
}