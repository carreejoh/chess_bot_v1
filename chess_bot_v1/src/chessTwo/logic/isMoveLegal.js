import { pawnMoves } from "./pieceMovements/pawnMoves";
import { knightMoves } from "./pieceMovements/knightMoves";
import { bishopMoves } from "./pieceMovements/bishopMoves";
import { rookMoves } from "./pieceMovements/rookMoves";
import { queenMoves } from "./pieceMovements/queenMoves";
import { kingMoves } from "./pieceMovements/kingMoves";

import { convertTileLocationToPiecename } from "../conversionFunctions";

// Verify that the move a player is trying to make is legal
// Account for king safety, legal moves
// Return all legal moves for piece as array
// This is for HUMANS ONLY

export const allLegalMovesForPiece = (
    whitePieces,
    blackPieces,

    castlingVariables,

    currentTile
) => {

    // Figure out which piece is trying to be moved
    let piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)

    // Find all legal moves 
    let moves = []

    if(piece.includes("Pawn")) {
        moves = pawnMoves(currentTile, whitePieces, blackPieces);
    }
    if(piece.includes("Knight")) {
        moves = knightMoves(currentTile, whitePieces, blackPieces);
    }
    if(piece.includes("Bishop")) {
        moves = bishopMoves(currentTile, whitePieces, blackPieces);
    }
    if(piece.includes("Rook")) {
        moves = rookMoves(currentTile, whitePieces, blackPieces);
    }
    if(piece.includes("Queen")) {
        moves = queenMoves(currentTile, whitePieces, blackPieces);
    }
    if(piece.includes("King")) {
        moves = kingMoves(currentTile, whitePieces, blackPieces, castlingVariables);
    }

    return moves
}