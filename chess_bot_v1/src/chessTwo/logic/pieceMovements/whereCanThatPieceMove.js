
import { variableNamesToPieceType } from "../../objects/referenceObjects"
import { pawnMoves } from "../pieceMovements/pawnMoves";
import { knightMoves } from "../pieceMovements/knightMoves";
import { bishopMoves } from "../pieceMovements/bishopMoves";
import { rookMoves } from "../pieceMovements/rookMoves";
import { queenMoves } from "../pieceMovements/queenMoves";
import { kingMoves } from "../pieceMovements/kingMoves";


// Where can each individual piece move? 
// Take into account checks, king safety, castling, attacks

export const whereCanThatPieceMove = (
    tile,
    matchingPiece,
    whitePieces,
    blackPieces,
    castlingVariables
) => {
    let pieceName = variableNamesToPieceType[matchingPiece];

    let moves = [];

    if (pieceName === "pawn") {
        moves = pawnMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "knight") {
        moves = knightMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "bishop") {
        moves = bishopMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "rook") {
        moves = rookMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "queen") {
        moves = queenMoves(tile, whitePieces, blackPieces);
    }
    if (pieceName === "king") {
        moves = kingMoves(
            tile, 
            whitePieces, 
            blackPieces,
            castlingVariables
        );
    }

    return moves;
};