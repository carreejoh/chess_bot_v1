import { variableNamesToPieceType, blackPiecesIndexToPieceName } from "../referenceObjects"
import { whereCanThatPieceMove, whatCanAllPiecesSee } from "../chessLogic"

import { allPieceLegalMoves } from "../legalMoves/logic/allAvailableMoves"

// import {}

// What will this bot need to be able to choose/play a move?

// 1.0
// All legal moves with all pieces
// All legal captures with all pieces

// Inputs
// White locations, black locations

// Returns 
// Current square, to new square
export const botOne = (
    whitePieces,
    blackPieces,
    isWhiteKingInCheck,
    isBlackKingInCheck,
    castlingVariables
) => {

    const allLegalMoves = allPieceLegalMoves(whitePieces, blackPieces, "black", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)

    let originalTile;
    let pieceName; 
    let moveToTile;

    Object.entries(allLegalMoves.blackPiecesObject).forEach(([key, value]) => {
        if(value.length > 0) {
            moveToTile = value[0]
            pieceName = key
        }
    })

    originalTile = blackPieces[pieceName]

    return { 
        moveToTile,
        originalTile,
        pieceName
     }

    // let allLegalMoves = []
    // let allLegalAttacks = []
    // let allPiecesThatCanMove = []

    // // Get all legal piece moves (not including attacks)
    // Object.entries(blackPieces).forEach(([key, value]) => {
    //     let legalMoves = whereCanThatPieceMove(value, key, whitePieces, blackPieces, castlingVariables)
    //     allLegalMoves.push(legalMoves)
    // })

    // // What pieces even can move?
    // allLegalMoves.forEach((piece, index) => {
    //     if(piece.length > 0) {
    //         allPiecesThatCanMove.push(piece)
    //     }
    // })

    // // Pick a random piece that can move
    // let randomPiece = Math.floor(Math.random() * allPiecesThatCanMove.length) ;
    // console.log(randomPiece)
    // // Get the legal moves for that piece, as well as the name
    // let randomPieceAvailableMoves = allLegalMoves[randomPiece]
    // let pieceName = blackPiecesIndexToPieceName[randomPiece]
    // let pieceLocation = blackPieces[pieceName]
    // // Select a random move
    // let randomMove = Math.floor(Math.random() * randomPieceAvailableMoves.length) ;

    // Returned as lastClickedSquare, newSquare, piecename
    // return { 
    //     pieceLocation: pieceLocation, 
    //     move: randomPieceAvailableMoves[randomMove], 
    //     pieceName: pieceName
    // }
}

function allLegalMovesWithBlackPieces(tile, piece, whitePieces, blackPieces, castlingVariables) {

}