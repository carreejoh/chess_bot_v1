import { variableNamesToPieceType } from "./referenceObjects";
import {
    knightMoves,
    bishopMoves,
    rookMoves,
    queenMoves,
    kingMoves,
} from "./legalMoves";

import { pawnMoves, whatCanPawnsAttack } from "./legalMoves/pawnMoves";

//
// Return an array of locations where this piece can legally move.
// Does not account for checks
//

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

//
// Ensure that the piece can legally be moved where the user clicks,
// Return false if the piece can't be moved
//

export const movePiece = (
    currentTile,
    moveToTile,
    whitePieces,
    blackPieces,
    selectedPiecesArray,
    castlingVariables
) => {

    // Reverse through the location object to find the pieceName variable
    function getPiecenameByLocation(value, locations) {
        return Object.entries(locations).find(
            ([key, objValue]) => objValue === value
        )?.[0];
    }

    const pieceName = getPiecenameByLocation(currentTile, selectedPiecesArray);
    const legalMoves = whereCanThatPieceMove(
        currentTile,
        pieceName,
        whitePieces,
        blackPieces,
        castlingVariables
    );

    if (legalMoves.includes(moveToTile)) {
        return pieceName;
    } else {
        return false;
    }
};

//
// What can each piece attack? This calculates what each piece can attack
//

export const whatCanAllPiecesSee = (
    whitePieces,
    blackPieces,
    castlingVariables
) => {
    
    let allWhiteMoves = []
    let allBlackMoves = []

    let tempWhite = {}
    let tempWhitePawns = {}
    let tempBlack = {}
    let tempBlackPawns = {}

    // Loop through white and black pieces and seperate them into pawns/everything else

    Object.entries(whitePieces).forEach(([key, value]) => {
        if (key.toLowerCase().includes("pawn")) {
            tempWhitePawns[key] = value
        } else {
            tempWhite[key] = value
        }
    });

    Object.entries(blackPieces).forEach(([key, value]) => {
        if (key.toLowerCase().includes("pawn")) {
            tempBlackPawns[key] = value
        } else {
            tempBlack[key] = value
        }
    });

    // Combine the seperated objects for all piece locations including proposed move

    const combinedWhite = { ...tempWhite, ...tempWhitePawns }
    const combinedBlack = { ...tempBlack, ...tempBlackPawns }

    // Calculate what all white/black pieces can see (capture) not including pawns,
    // with the proposed move

    let whatWhiteMajorsSee = Object.entries(tempWhite).reduce((acc, [key, value]) => {
        const moves = whereCanThatPieceMove(value, key, combinedWhite, combinedBlack, castlingVariables);
        return [...acc, ...moves];
    }, []);

    let whatBlackMajorsSee = Object.entries(tempBlack).reduce((acc, [key, value]) => {
        const moves = whereCanThatPieceMove(value, key, combinedWhite, combinedBlack, castlingVariables);
        return [...acc, ...moves];
    }, []);

    // Calculate what all white/black pawns can see (capture)

    let whatCanWhitePawnsSee = Object.entries(tempWhitePawns).reduce((acc, [key, value]) => {
        const moves = whatCanPawnsAttack(value, combinedWhite, combinedBlack);
        return [...acc, ...moves];
    }, []);

    let whatCanBlackPawnsSee = Object.entries(tempBlackPawns).reduce((acc, [key, value]) => {
        const moves = whatCanPawnsAttack(value, combinedWhite, combinedBlack);
        return [...acc, ...moves];
    }, []);

    // Combine arrays for each player to see all legal attacking tiles,
    // Filter out any undefined values

    allWhiteMoves = [...whatWhiteMajorsSee, ...whatCanWhitePawnsSee]
    allBlackMoves = [...whatBlackMajorsSee, ...whatCanBlackPawnsSee]

    allWhiteMoves = [...new Set(allWhiteMoves)].filter(
        (move) => 
            move.toLowerCase() !== "nnan" && !move.toLowerCase().includes("undefined")
    );
    
    allBlackMoves = [...new Set(allBlackMoves)].filter(
        (move) => 
            move.toLowerCase() !== "nnan" && !move.toLowerCase().includes("undefined")
    );

    return { allWhiteMoves, allBlackMoves }

};

// Before making a move ensure that the proposed move would not put the player's king in check,
// If it doesn't put the players king in check, see if it puts the opponents king in check

export const isEitherKingInCheck = (
    whitePieces, 
    blackPieces, 
    piece, 
    proposedMove,
    whosTurn,
    isWhiteKingInCheck,
    isBlackKingInCheck,
    castlingVariables
) => {

    let tempWhite = {}
    let tempWhitePawns = {}
    let tempBlack = {}
    let tempBlackPawns = {}

    // Loop through white and black pieces and seperate them into pawns/everything else

    Object.entries(whitePieces).forEach(([key, value]) => {
        if (key.toLowerCase().includes("pawn")) {
            tempWhitePawns[key] = value
        } else {
            tempWhite[key] = value
        }
    });

    Object.entries(blackPieces).forEach(([key, value]) => {
        if (key.toLowerCase().includes("pawn")) {
            tempBlackPawns[key] = value
        } else {
            tempBlack[key] = value
        }
    });

    // Add the new proposed piece move to corresponding object

    switch (true) {
        case piece.includes("whitePawn"):
            tempWhitePawns[piece] = proposedMove;
            break;
    
        case piece.includes("white"):
            tempWhite[piece] = proposedMove;
            break;
    
        case piece.includes("blackPawn"):
            tempBlackPawns[piece] = proposedMove;
            break;
        
        case piece.includes("black"):
            tempBlack[piece] = proposedMove;
            break;
        default:
            console.log(`${piece} is not a recognized white piece.`);
    }

    // Combine the seperated objects for all piece locations including proposed move

    const combinedWhite = { ...tempWhite, ...tempWhitePawns }
    const combinedBlack = { ...tempBlack, ...tempBlackPawns }

    let whatCanPiecesSeeWithProposedMove = whatCanAllPiecesSee(combinedWhite, combinedBlack, castlingVariables)

    let whiteKingLocation = combinedWhite.whiteKing
    let blackKingLocation = combinedBlack.blackKing

    // True means the king is in check
    let whiteKingStatus = isWhiteKingInCheck
    let blackKingStatus = isBlackKingInCheck
    let legalMove = true

    // Players king is in check, their move does not take the king out of check

    if(whosTurn === "white" && whiteKingStatus && whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = false
    }
    if(whosTurn === "black" && blackKingStatus && whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = false
    }

    // Players king is in check, but their move successfully gets the king of out of check

    if(whosTurn === "white" && whiteKingStatus && !whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = true
        whiteKingStatus = false
    }
    if(whosTurn === "black" && blackKingStatus && !whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = true
        blackKingStatus = false
    }

    // Players king is not in check, but their move will put their king in check

    if(whosTurn === "white" && !whiteKingStatus && whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = false
    }
    if(whosTurn === "black" && !blackKingStatus && whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = false
    }

    // Players king is not in check, players move puts their opponents king in check

    if(whosTurn === "white" && !whiteKingStatus && whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = true
        blackKingStatus = true
    }
    if(whosTurn === "black" && !blackKingStatus && whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = true
        whiteKingStatus = true
    }

    return { legalMove, whiteKingStatus, blackKingStatus }
}