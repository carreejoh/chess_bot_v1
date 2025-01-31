
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const knightMoves = (tile, whitePieces, blackPieces) => {

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

    let file = tile[0]
    let rank = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rank)

    // Find all possible moves
    let move1 = `${files[fileLocationIndex - 2]}${ranks[rankLocationIndex + 1]}`
    let move2 = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 2]}`
    let move3 = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 2]}`
    let move4 = `${files[fileLocationIndex + 2]}${ranks[rankLocationIndex + 1]}`
    let move5 = `${files[fileLocationIndex + 2]}${ranks[rankLocationIndex - 1]}`
    let move6 = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 2]}`
    let move7 = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 2]}`
    let move8 = `${files[fileLocationIndex - 2]}${ranks[rankLocationIndex - 1]}`

    moves.push(move1, move2, move3, move4, move5, move6, move7, move8)

    // Find moves that are off the board and remove them
    moves = moves.filter((move) => !move.includes("undefined"));

    // Find moves that are occupied by the same player's pieces
    if (whitePiecePositions.includes(tile)) {
        moves = moves.filter((position) => !whitePiecePositions.includes(position));
    }
    if (blackPiecePositions.includes(tile)) {
        moves = moves.filter((position) => !blackPiecePositions.includes(position));
    }

    return moves
}