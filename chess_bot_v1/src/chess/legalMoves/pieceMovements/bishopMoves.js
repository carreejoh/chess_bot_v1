
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const bishopMoves = (tile, whitePieces, blackPieces) => {

    const whitePiecePositions = Object.values(whitePieces);
    const blackPiecePositions = Object.values(blackPieces);

    let playersArray = []
    let opponentsArray = []

    if (whitePiecePositions.includes(tile)) {
        playersArray = whitePiecePositions
        opponentsArray = blackPiecePositions
    }
    if (blackPiecePositions.includes(tile)) {
        playersArray = blackPiecePositions
        opponentsArray = whitePiecePositions
    }

    let file = tile[0]
    let rank = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rank)

    for (let i = 1; i < 8; i++) {
        let downRight = `${files[fileLocationIndex + i]}${ranks[rankLocationIndex + i]}`
        if (playersArray.includes(downRight)) break
        if (opponentsArray.includes(downRight)) {
            moves.push(downRight)
            break
        }
        moves.push(downRight)
    }
    for (let i = 1; i < 8; i++) {
        let downLeft = `${files[fileLocationIndex - i]}${ranks[rankLocationIndex + i]}`
        if (playersArray.includes(downLeft)) break
        if (opponentsArray.includes(downLeft)) {
            moves.push(downLeft)
            break
        }
        moves.push(downLeft)
    }
    for (let i = 1; i < 8; i++) {
        let upRight = `${files[fileLocationIndex + i]}${ranks[rankLocationIndex - i]}`
        if (playersArray.includes(upRight)) break
        if (opponentsArray.includes(upRight)) {
            moves.push(upRight)
            break
        }
        moves.push(upRight)
    }
    for (let i = 1; i < 8; i++) {
        let upLeft = `${files[fileLocationIndex - i]}${ranks[rankLocationIndex - i]}`
        if (playersArray.includes(upLeft)) break
        if (opponentsArray.includes(upLeft)) {
            moves.push(upLeft)
            break
        }
        moves.push(upLeft)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}