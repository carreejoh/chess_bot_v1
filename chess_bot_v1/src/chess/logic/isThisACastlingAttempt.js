import { convertTileLocationToPiecename } from "../other/conversionFunctions"

// Function to check if either player is attempting to castle

export const isThisCastling = (
    whitePieces,
    blackPieces,
    moveToTile,
    currentTile 
) => {

    let piece = convertTileLocationToPiecename(currentTile, whitePieces, blackPieces)

    // Piece is not a king
    if(!piece.includes("King")) {
        return false
    }

    if(moveToTile === "c1") {
        return true
    }
    if(moveToTile === "g1") {
        return true
    }
    if(moveToTile === "c8") {
        return true
    }
    if(moveToTile === "g8") {
        return true
    }

    return false
    // if(!castlingVariables.hasWhiteKingBeenMoved && !castlingVariables.hasWhiteRookOneBeenMoved && moveToTile === "c1") {
    //     return true
    // }
}

export const rebuildCastlingVariables = (
    moveToTile,
    castlingVariables,
    whitePieces,
    blackPieces
) => {

    let castleVariablesClone = { ...castlingVariables }
    let whitePiecesClone = { ...whitePieces }
    let blackPiecesClone = { ...blackPieces }

    if(moveToTile === "c1") {
        castleVariablesClone["hasWhiteKingBeenMoved"] = true
        castleVariablesClone["hasWhiteRookOneBeenMoved"] = true
        whitePiecesClone["whiteKing"] = "c1"
        whitePiecesClone["whiteRookOne"] = "d1"
    }
    if(moveToTile === "g1") {
        castleVariablesClone["hasWhiteKingBeenMoved"] = true
        castleVariablesClone["hasWhiteRookTwoBeenMoved"] = true
        whitePiecesClone["whiteKing"] = "g1"
        whitePiecesClone["whiteRookTwo"] = "f1"
    }
    if(moveToTile === "c8") {
        castleVariablesClone["hasBlackKingBeenMoved"] = true
        castleVariablesClone["hasBlackRookOneBeenMoved"] = true
        blackPiecesClone["blackKing"] = "c8"
        blackPiecesClone["blackRookTwo"] = "d8"
    }
    if(moveToTile === "g8") {
        castleVariablesClone["hasBlackKingBeenMoved"] = true
        castleVariablesClone["hasBlackRookTwoBeenMoved"] = true
        blackPiecesClone["blackKing"] = "g8"
        blackPiecesClone["blackRookTwo"] = "f8"
    }

    return {
        castleVariablesClone,
        whitePiecesClone,
        blackPiecesClone
    }
}