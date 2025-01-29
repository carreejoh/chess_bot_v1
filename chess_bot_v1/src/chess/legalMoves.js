
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

export const rookMoves = (tile, whitePieces, blackPieces) => {

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
        let up = `${file}${ranks[rankLocationIndex + i]}`
        if (playersArray.includes(up)) break
        if (opponentsArray.includes(up)) {
            moves.push(up)
            break
        }
        moves.push(up)
    }
    for (let i = 1; i < 8; i++) {
        let down = `${file}${ranks[rankLocationIndex - i]}`
        if (playersArray.includes(down)) break
        if (opponentsArray.includes(down)) {
            moves.push(down)
            break
        }
        moves.push(down)
    }
    for (let i = 1; i < 8; i++) {
        let left = `${files[fileLocationIndex - i]}${rank}`
        if (playersArray.includes(left)) break
        if (opponentsArray.includes(left)) {
            moves.push(left)
            break
        }
        moves.push(left)
    }
    for (let i = 1; i < 8; i++) {
        let right = `${files[fileLocationIndex + i]}${rank}`
        if (playersArray.includes(right)) break
        if (opponentsArray.includes(right)) {
            moves.push(right)
            break
        }
        moves.push(right)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}

export const queenMoves = (tile, whitePieces, blackPieces) => {

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

    for (let i = 1; i < 8; i++) {
        let up = `${file}${ranks[rankLocationIndex + i]}`
        if (playersArray.includes(up)) break
        if (opponentsArray.includes(up)) {
            moves.push(up)
            break
        }
        moves.push(up)
    }
    for (let i = 1; i < 8; i++) {
        let down = `${file}${ranks[rankLocationIndex - i]}`
        if (playersArray.includes(down)) break
        if (opponentsArray.includes(down)) {
            moves.push(down)
            break
        }
        moves.push(down)
    }
    for (let i = 1; i < 8; i++) {
        let left = `${files[fileLocationIndex - i]}${rank}`
        if (playersArray.includes(left)) break
        if (opponentsArray.includes(left)) {
            moves.push(left)
            break
        }
        moves.push(left)
    }
    for (let i = 1; i < 8; i++) {
        let right = `${files[fileLocationIndex + i]}${rank}`
        if (playersArray.includes(right)) break
        if (opponentsArray.includes(right)) {
            moves.push(right)
            break
        }
        moves.push(right)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}

export const kingMoves = (
    tile, 
    whitePieces, 
    blackPieces,
    castlingVariables
) => {

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

    let downRight = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 1]}`
    if (!playersArray.includes(downRight)) { moves.push(downRight) }

    let downLeft = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 1]}`
    if (!playersArray.includes(downLeft)) { moves.push(downLeft) }

    let upRight = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 1]}`
    if (!playersArray.includes(upRight)) { moves.push(upRight) }

    let upLeft = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 1]}`
    if (!playersArray.includes(upLeft)) { moves.push(upLeft) }

    let down = `${file}${ranks[rankLocationIndex + 1]}`
    if (!playersArray.includes(down)) { moves.push(down) }

    let up = `${file}${ranks[rankLocationIndex - 1]}`
    if (!playersArray.includes(up)) { moves.push(up) }

    let left = `${files[fileLocationIndex - 1]}${rank}`
    if (!playersArray.includes(left)) { moves.push(left) }

    let right = `${files[fileLocationIndex + 1]}${rank}`
    if (!playersArray.includes(right)) { moves.push(right) }

    // Special castle option added into array

    if(
        whitePiecePositions.includes(tile) && 
        !castlingVariables.hasWhiteKingBeenMoved && 
        !castlingVariables.hasWhiteRookOneBeenMoved && 
        !whitePiecePositions.includes("f1") && 
        !whitePiecePositions.includes("g1")
    ) {
        moves.push("g1")
    }
    if(
        whitePiecePositions.includes(tile) && 
        !castlingVariables.hasWhiteKingBeenMoved && 
        !castlingVariables.hasWhiteRookTwoBeenMoved && 
        !whitePiecePositions.includes("b1") && 
        !whitePiecePositions.includes("c1") && 
        !whitePiecePositions.includes("d1")
    ) {
        moves.push("c1")
    }

    // Black castling option

    if(
        blackPiecePositions.includes(tile) && 
        !castlingVariables.hasBlackKingBeenMoved && 
        !castlingVariables.hasBlackRookOneBeenMoved && 
        !blackPiecePositions.includes("f8") && 
        !blackPiecePositions.includes("g8")
    ) {
        moves.push("g8")
    }
    if(
        blackPiecePositions.includes(tile) && 
        !castlingVariables.hasBlackKingBeenMoved && 
        !castlingVariables.hasBlackRookTwoBeenMoved && 
        !blackPiecePositions.includes("b8") && 
        !blackPiecePositions.includes("c8") && 
        !blackPiecePositions.includes("d8")
    ) {
        moves.push("c8")
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}