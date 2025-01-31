import { whatCanAllPiecesSee } from "../../chessLogic"

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

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

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
            console.log(`${piece} is not a recognized piece.`);
    }

    if (whosTurn === "white" && blackPiecePositions.includes(proposedMove)) {
        let capturedPiece = Object.keys(blackPieces).find(key => blackPieces[key] === proposedMove)
        if(capturedPiece.includes("pawn")) {
            tempBlackPawns[capturedPiece] = "na"
        } else {
            tempBlack[capturedPiece] = "na"
        }
    }
    if (whosTurn === "black" && whitePiecePositions.includes(proposedMove)) {
        let capturedPiece = Object.keys(whitePieces).find(key => whitePieces[key] === proposedMove)
        if(capturedPiece.includes("pawn")) {
            tempWhitePawns[capturedPiece] = "na"
        } else {
            tempWhite[capturedPiece] = "na"
        }
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

    if (whosTurn === "white" && whiteKingStatus && whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = false
    }
    if (whosTurn === "black" && blackKingStatus && whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = false
    }

    // Players king is in check, but their move successfully gets the king of out of check

    if (whosTurn === "white" && whiteKingStatus && !whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = true
        whiteKingStatus = false
    }
    if (whosTurn === "black" && blackKingStatus && !whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = true
        blackKingStatus = false
    }

    // Players king is not in check, but their move will put their king in check

    if (whosTurn === "white" && !whiteKingStatus && whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = false
    }
    if (whosTurn === "black" && !blackKingStatus && whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = false
    }

    // Players king is not in check, players move puts their opponents king in check

    if (whosTurn === "white" && !whiteKingStatus && whatCanPiecesSeeWithProposedMove.allWhiteMoves.includes(blackKingLocation)) {
        legalMove = true
        blackKingStatus = true
    }
    if (whosTurn === "black" && !blackKingStatus && whatCanPiecesSeeWithProposedMove.allBlackMoves.includes(whiteKingLocation)) {
        legalMove = true
        whiteKingStatus = true
    }

    return { legalMove, whiteKingStatus, blackKingStatus }
}