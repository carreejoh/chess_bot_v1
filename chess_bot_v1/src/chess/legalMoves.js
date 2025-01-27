
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const pawnMoves = (tile, whitePieces) => {

    const whitePiecePositions = Object.values(whitePieces);

    let file = tile[0]
    let rank = Number(tile[1])
    let moves = []

    if (rank === 2) {
        moves.push(`${file}${rank + 1}`)
        moves.push(`${file}${rank + 2}`)
    } else {
        moves.push(`${file}${rank + 1}`)
    }

    return moves
}

export const knightMoves = (tile, whitePieces) => {

    const whitePiecePositions = Object.values(whitePieces);

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

    // Find moves that are occupied by other piece
    moves = moves.filter((position) => !whitePiecePositions.includes(position));

    return moves
}

export const bishopMoves = (tile, whitePieces) => {

    const whitePiecePositions = Object.values(whitePieces);

    let file = tile[0]
    let rank = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rank)

    for (let i = 1; i < 8; i++) {
        let downRight = `${files[fileLocationIndex + i]}${ranks[rankLocationIndex + i]}`
        if(whitePiecePositions.includes(downRight)) break
        moves.push(downRight)
    }
    for (let i = 1; i < 8; i++) {
        let downLeft = `${files[fileLocationIndex - i]}${ranks[rankLocationIndex + i]}`
        if(whitePiecePositions.includes(downLeft)) break
        moves.push(downLeft)
    }
    for (let i = 1; i < 8; i++) {
        let upRight = `${files[fileLocationIndex + i]}${ranks[rankLocationIndex - i]}`
        if(whitePiecePositions.includes(upRight)) break
        moves.push(upRight)
    }
    for (let i = 1; i < 8; i++) {
        let upLeft = `${files[fileLocationIndex - i]}${ranks[rankLocationIndex - i]}`
        if(whitePiecePositions.includes(upLeft)) break
        moves.push(upLeft)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}

export const rookMoves = (tile, whitePieces) => {

    const whitePiecePositions = Object.values(whitePieces);

    let file = tile[0]
    let rank = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rank)

    for(let i = 1; i < 8; i++) {
        let up = `${file}${ranks[rankLocationIndex + i]}`
        if(whitePiecePositions.includes(up)) break
        moves.push(up)
    }
    for(let i = 1; i < 8; i++) {
        let down = `${file}${ranks[rankLocationIndex - i]}`
        if(whitePiecePositions.includes(down)) break
        moves.push(down)
    }
    for(let i = 1; i < 8; i++) {
        let left = `${files[fileLocationIndex - i]}${rank}`
        if(whitePiecePositions.includes(left)) break
        moves.push(left)
    }
    for(let i = 1; i < 8; i++) {
        let right = `${files[fileLocationIndex + i]}${rank}`
        if(whitePiecePositions.includes(right)) break
        moves.push(right)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}

export const queenMoves = (tile, whitePieces) => {

    const whitePiecePositions = Object.values(whitePieces);

    let file = tile[0]
    let rank = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rank)

    for (let i = 1; i < 8; i++) {
        let downRight = `${files[fileLocationIndex + i]}${ranks[rankLocationIndex + i]}`
        if(whitePiecePositions.includes(downRight)) break
        moves.push(downRight)
    }
    for (let i = 1; i < 8; i++) {
        let downLeft = `${files[fileLocationIndex - i]}${ranks[rankLocationIndex + i]}`
        if(whitePiecePositions.includes(downLeft)) break
        moves.push(downLeft)
    }
    for (let i = 1; i < 8; i++) {
        let upRight = `${files[fileLocationIndex + i]}${ranks[rankLocationIndex - i]}`
        if(whitePiecePositions.includes(upRight)) break
        moves.push(upRight)
    }
    for (let i = 1; i < 8; i++) {
        let upLeft = `${files[fileLocationIndex - i]}${ranks[rankLocationIndex - i]}`
        if(whitePiecePositions.includes(upLeft)) break
        moves.push(upLeft)
    }

    for(let i = 1; i < 8; i++) {
        let up = `${file}${ranks[rankLocationIndex + i]}`
        if(whitePiecePositions.includes(up)) break
        moves.push(up)
    }
    for(let i = 1; i < 8; i++) {
        let down = `${file}${ranks[rankLocationIndex - i]}`
        if(whitePiecePositions.includes(down)) break
        moves.push(down)
    }
    for(let i = 1; i < 8; i++) {
        let left = `${files[fileLocationIndex - i]}${rank}`
        if(whitePiecePositions.includes(left)) break
        moves.push(left)
    }
    for(let i = 1; i < 8; i++) {
        let right = `${files[fileLocationIndex + i]}${rank}`
        if(whitePiecePositions.includes(right)) break
        moves.push(right)
    }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}

export const kingMoves = (tile, whitePieces) => {

    const whitePiecePositions = Object.values(whitePieces);

    let file = tile[0]
    let rank = tile[1]
    let moves = []

    let fileLocationIndex = files.indexOf(file)
    let rankLocationIndex = ranks.indexOf(rank)

        let downRight = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex + 1]}`
        if(!whitePiecePositions.includes(downRight)) { moves.push(downRight) }

        let downLeft = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex + 1]}`
        if(!whitePiecePositions.includes(downLeft)) { moves.push(downLeft) }
    
        let upRight = `${files[fileLocationIndex + 1]}${ranks[rankLocationIndex - 1]}`
        if(!whitePiecePositions.includes(upRight)) { moves.push(upRight) }
    
        let upLeft = `${files[fileLocationIndex - 1]}${ranks[rankLocationIndex - 1]}`
        if(!whitePiecePositions.includes(upLeft)) { moves.push(upLeft) }
    
        let down = `${file}${ranks[rankLocationIndex + 1]}`
        if(!whitePiecePositions.includes(down)) { moves.push(down) }
    
        let up = `${file}${ranks[rankLocationIndex - 1]}`
        if(!whitePiecePositions.includes(up)) { moves.push(up) }
    
        let left = `${files[fileLocationIndex - 1]}${rank}`
        if(!whitePiecePositions.includes(left)) { moves.push(left) }
    
        let right = `${files[fileLocationIndex + 1]}${rank}`
        if(!whitePiecePositions.includes(right)) { moves.push(right) }

    moves = moves.filter((move) => !move.includes("undefined"));

    return moves
}