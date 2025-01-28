
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const pawnMoves = (tile, whitePieces, blackPieces) => {

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

    let file = tile[0]
    let rank = Number(tile[1])
    let rankString = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rankString)

    if (whitePiecePositions.includes(tile)) {

        // Can the pawn move up one spot
        if(!whitePiecePositions.includes(`${file}${rank + 1}`) && !blackPiecePositions.includes(`${file}${rank + 1}`)) {
            moves.push(`${file}${rank + 1}`)
        }

        // Can the pawn move up two spots on the second rank
        if(
            !whitePiecePositions.includes(`${file}${rank + 2}`) && 
            !blackPiecePositions.includes(`${file}${rank + 2}`) && 
            !whitePiecePositions.includes(`${file}${rank + 1}`) && 
            !blackPiecePositions.includes(`${file}${rank + 1}`) &&
            rank == 2
        ) {
            moves.push(`${file}${rank + 2}`)
        }

        // Can the pawn attack pieces to the right/left of it
        if(blackPiecePositions.includes(`${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 1]}`)) {
            moves.push(`${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 1]}`)
        }
        if(blackPiecePositions.includes(`${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 1]}`)) {
            moves.push(`${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 1]}`)
        }
    }
    if (blackPiecePositions.includes(tile)) {
        
        // Can the pawn move down one spot
        if(!blackPiecePositions.includes(`${file}${rank - 1}`) && !blackPiecePositions.includes(`${file}${rank - 1}`)) {
            moves.push(`${file}${rank - 1}`)
        }

        // Can the pawn move up two spots on the second rank
        if(
            !whitePiecePositions.includes(`${file}${rank - 2}`) && 
            !blackPiecePositions.includes(`${file}${rank - 2}`) && 
            !whitePiecePositions.includes(`${file}${rank - 1}`) && 
            !blackPiecePositions.includes(`${file}${rank - 1}`) &&
            rank == 7
        ) {
            moves.push(`${file}${rank - 2}`)
        }

        // Can the pawn attack pieces to the right/left of it
        if(whitePiecePositions.includes(`${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 1]}`)) {
            moves.push(`${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 1]}`)
        }
        if(whitePiecePositions.includes(`${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 1]}`)) {
            moves.push(`${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 1]}`)
        }
    }

    return moves
}