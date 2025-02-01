import { whereCanThatPieceMove } from "./pieceMovements/whereCanThatPieceMove"
import { whatCanPawnsAttack } from "./pieceMovements/pawnMoves"

// This function calculates what every piece on the board can attack.
// This does not take into account king safety.

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

    let unFilteredWhiteMoves = allWhiteMoves
    let unFilteredBlackMoves = allBlackMoves 

    allWhiteMoves = [...new Set(allWhiteMoves)].filter(
        (move) => 
            move.toLowerCase() !== "nnan" && !move.toLowerCase().includes("undefined")
    );
    
    allBlackMoves = [...new Set(allBlackMoves)].filter(
        (move) => 
            move.toLowerCase() !== "nnan" && !move.toLowerCase().includes("undefined")
    );

    return { allWhiteMoves, allBlackMoves, unFilteredWhiteMoves, unFilteredBlackMoves }

};