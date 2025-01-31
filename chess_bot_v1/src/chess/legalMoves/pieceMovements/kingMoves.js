const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

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