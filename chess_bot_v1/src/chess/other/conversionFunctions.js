

// 
// Find piece name based on location
// 

export const convertTileLocationToPiecename = (tile, whitePieces, blackPieces) => {
    let piece = null
    const whitePieceLocations = Object.values(whitePieces)
    const blackPieceLocations = Object.values(blackPieces)

    if(whitePieceLocations.includes(tile)) {
        piece = Object.keys(whitePieces).find(key => whitePieces[key] === tile)
    }
    if(blackPieceLocations.includes(tile)) {
        piece = Object.keys(blackPieces).find(key => blackPieces[key] === tile)
    }

    return piece
}