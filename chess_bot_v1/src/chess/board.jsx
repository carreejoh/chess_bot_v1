import { useEffect, useState } from "react"
import { initialWhitePieces, initialBlackPieces } from "./chessLocations";
import { whereCanThatPieceMove, movePiece, whatCanAllPiecesSee, isEitherKingInCheck } from "./chessLogic";
import { variableNamesToURLPath } from "./referenceObjects";
import { calculateAnimations } from "./calculateAnimations";
import { allPieceLegalMoves } from "./legalMoves/logic/allAvailableMoves";

import { botOne } from "./bots/firstBot";

import Controls from "./secondary/controls";
import CapturedPieces from "./secondary/capturedPieces";
import Stats from "./secondary/stats";
import Pieces from "./secondary/pieces";

function Board() {

    // TODO
    // Capturing a piece does not always light up square if king in check
    // Checkmates
    // En Passant
    // Can castle through check
    // Make squares that show darker colors for how many pieces see it

    // This tracks the location of the white and black pieces
    const [whitePieces, setWhitePieces] = useState(initialWhitePieces)
    const [blackPieces, setBlackPieces] = useState(initialBlackPieces)
    // This is whos turn it is
    const [whitesTurn, setWhitesTurn] = useState(true)
    // This tracks what each piece from both player can attack
    // useful for ensuring the king isnt put in check
    const [whatWhiteSees, setWhatWhiteSees] = useState([])
    const [whatBlackSees, setWhatBlackSees] = useState([])

    const [showLayeredAttacks, setShowLayeredAttacks] = useState(false)
    const [whatPlayerSeeWithDuplicates, setWhatPlayerCanSeeWithDuplicates] = useState([])

    const [tileToBeAnimated, setTileToBeAnimated] = useState(null)
    const [animations, setAnimations] = useState({
        dx: 0,
        dy: 0
    })

    // Track if either king is in check
    const [isWhiteKingInCheck, setIsWhiteKingInCheck] = useState(false)
    const [isBlackKingInCheck, setIsBlackKingInCheck] = useState(false)

    // Variables for castling
    const [castlingVariables, setCastlingVariables] = useState({
        hasWhiteKingBeenMoved: false,
        hasBlackKingBeenMoved: false,
        hasWhiteRookOneBeenMoved: false,
        hasWhiteRookTwoBeenMoved: false,
        hasBlackRookOneBeenMoved: false,
        hasBlackRookTwoBeenMoved: false
    })

    // This logic builds the board 
    const allBoardSquares = [];
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
    ranks.forEach((rank) => {
        files.forEach((file) => {
            allBoardSquares.push(`${file}${rank}`);
        });
    });

    // const [lastClickedSquare, setLastClickedSquare] = useState(null)

    const [lastClickedSquare, setLastClickedSquare] = useState(null)

    const [legalMovesForSelectedPiece, setLegalMovesForSelectedPiece] = useState([])

    // This is for viewing only!
    // Visualize what is seen by every piece dependent on player
    useEffect(() => {
        if (whitesTurn) {
            let legalMoves = allPieceLegalMoves(whitePieces, blackPieces, "white", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)
            setWhatWhiteSees(legalMoves.combinedLegalMoveArray)
        } else {
            let legalMoves = allPieceLegalMoves(whitePieces, blackPieces, "black", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)
            setWhatBlackSees(legalMoves.combinedLegalMoveArray)
        }
        // let attacks = whatCanAllPiecesSee(whitePieces, blackPieces, castlingVariables)
        // setWhatWhiteSees(attacks.allWhiteMoves)
        // setWhatBlackSees(attacks.allBlackMoves)
        // if(whitesTurn) { setWhatPlayerCanSeeWithDuplicates(attacks.unFilteredWhiteMoves) }
        // if(!whitesTurn) { setWhatPlayerCanSeeWithDuplicates(attacks.unFilteredBlackMoves) }
    }, [whitePieces, blackPieces, whitesTurn])

    // This runs the first bot so the player is always white.

    useEffect(() => {
        if (!whitesTurn) {
            const move = botOne(
                whitePieces,
                blackPieces,
                isWhiteKingInCheck,
                isBlackKingInCheck,
                castlingVariables
            );

            updateLastClickedBot(move.originalTile, move.pieceName)

            setTimeout(() => {
                clickPartOfTheBoard(move.moveToTile, false, false);
            }, 500);
        }
    }, [whitesTurn]);


    function updateLastClickedBot(tile, piece) {
        clickPartOfTheBoard(tile, false, piece );
    }

    // 
    // Change the white or black useState holding locations
    // 

    const changePieceLocation = (pieceName, newTile) => {
        if (whitesTurn) {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: newTile,
            }));
            setWhitesTurn(false)
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: newTile,
            }));
            setWhitesTurn(true)
        }
    };

    // 
    // Change the piece in either state to "na"
    // 

    const handleCapture = (pieceName, player) => {
        if (player === "white") {
            setWhitePieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: "na",
            }));
        } else {
            setBlackPieces((prevPieces) => ({
                ...prevPieces,
                [pieceName]: "na",
            }));
        }
    }

    // Handle castling based on tile passed in 

    const handleCastling = (tile) => {
        // White king-side castle
        if (tile === "g1") {
            changePieceLocation("whiteKing", "g1")
            changePieceLocation("whiteRookTwo", "f1")
        }
        // White queen-side castle
        if (tile === "c1") {
            changePieceLocation("whiteKing", "c1")
            changePieceLocation("whiteRookOne", "d1")
        }
        // Black king-side castle
        if (tile === "g8") {
            changePieceLocation("blackKing", "g8")
            changePieceLocation("blackRookTwo", "f8")
        }
        // Black queen-side castle
        if (tile === "c8") {
            changePieceLocation("blackKing", "c8")
            changePieceLocation("blackRookOne", "d8")
        }
    }

    // Change the castling variables based on piece movement

    const toggleCastlingVariable = (key) => {
        setCastlingVariables((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    // 
    // This searches each object by key, and finds what the piece variable name is
    // 

    function getPiecenameByLocation(value, locations) {
        return Object.entries(locations).find(([key, objValue]) => objValue === value)?.[0];
    }

    // 
    // Handle all clicks on the board. This will account for many different scenarios
    // White/Black => Empty Space
    // White/Black => Invalid Move 
    // White/Black => Capture
    // Random Click

    function clickPartOfTheBoard(tile, matchingPieceWhite, matchingPieceBlack) {

        console.log(tile)
        console.log(lastClickedSquare)
        console.log(matchingPieceWhite)
        console.log(matchingPieceBlack)

        const whitePiecePositions = Object.values(whitePieces);
        const blackPiecePositions = Object.values(blackPieces);
        let locations = []

        if (whitesTurn) {

            if (matchingPieceWhite) {
                locations = whereCanThatPieceMove(tile, matchingPieceWhite, whitePieces, blackPieces, castlingVariables)
            }
            setLegalMovesForSelectedPiece(locations)

            // Random clicks
            if (!whitePiecePositions.includes(lastClickedSquare) && !whitePiecePositions.includes(tile)) {
                setLegalMovesForSelectedPiece([])
            }

            // Move a piece to empty space or capture
            if (whitePiecePositions.includes(lastClickedSquare) && !whitePiecePositions.includes(tile)) {

                // This accounts for king safety, checks, captures, castling and regular movement
                const legalMoveForPiece = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, whitePieces, castlingVariables)
                const legalMoves = allPieceLegalMoves(whitePieces, blackPieces, "white", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)

                if (!legalMoveForPiece) return
                if (legalMoves.combinedLegalMoveArray.includes(tile)) {

                    // Calculate animation distance and set state 
                    const animationAngles = calculateAnimations(lastClickedSquare, tile)
                    setTileToBeAnimated(lastClickedSquare)
                    setAnimations(animationAngles)

                    setTimeout(() => {
                        setTileToBeAnimated(null)
                        changePieceLocation(Object.keys(whitePieces).find(key => whitePieces[key] === lastClickedSquare), tile)
                    }, 150)

                    // Capture black piece if move is valid
                    if (blackPiecePositions.includes(tile)) {
                        const blackPiece = getPiecenameByLocation(tile, blackPieces)
                        handleCapture(blackPiece, "black")
                    }
                }

                // Check to see where that piece can move to based on piece type, and what's in it's way
                // let validMove = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, whitePieces, castlingVariables)
                // if (validMove) {
                //     console.log(validMove)

                //     // Check to see if the king is in check, or if moving a piece would put it in check
                //     let isKingInCheck = isEitherKingInCheck(whitePieces, blackPieces, validMove, tile, "white", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)
                //     console.log(isKingInCheck)

                //     setIsWhiteKingInCheck(isKingInCheck.whiteKingStatus)
                //     setIsBlackKingInCheck(isKingInCheck.blackKingStatus)

                //     // If the king is not in check, or it's a valid move, move the piece
                //     if(isKingInCheck.legalMove) {

                //         // Check to see if the player is castling
                //         let pieceName = getPiecenameByLocation(lastClickedSquare, whitePieces)
                //         if(pieceName === "whiteKing" && tile === "g1" && !castlingVariables.hasWhiteKingBeenMoved && !castlingVariables.hasWhiteRookTwoBeenMoved) {
                //             handleCastling(tile)
                //             toggleCastlingVariable("hasWhiteKingBeenMoved")
                //             return
                //         }
                //         if(pieceName === "whiteKing" && tile === "c1" && !castlingVariables.hasWhiteKingBeenMoved && !castlingVariables.hasWhiteRookOneBeenMoved) {
                //             handleCastling(tile)
                //             toggleCastlingVariable("hasWhiteKingBeenMoved")
                //             return
                //         }

                //         // Account for any movement to rook one, rook two, or king
                //         if(pieceName === "whiteKing" && !castlingVariables.hasWhiteKingBeenMoved) { toggleCastlingVariable("hasWhiteKingBeenMoved") }
                //         if(pieceName === "whiteRookOne" && !castlingVariables.hasWhiteRookOneBeenMoved) { toggleCastlingVariable("hasWhiteRookOneBeenMoved") }
                //         if(pieceName === "whiteRookTwo" && !castlingVariables.hasWhiteRookTwoBeenMoved) { toggleCastlingVariable("hasWhiteRookTwoBeenMoved") }

                //         const animationAngles = calculateAnimations(lastClickedSquare, tile)

                //         setTileToBeAnimated(lastClickedSquare)
                //         setAnimations(animationAngles)

                //         setTimeout(() => {
                //             setTileToBeAnimated(null)
                //             changePieceLocation(validMove, tile)
                //         }, 150)


                //         // This represents a capture
                //         if (blackPiecePositions.includes(tile)) {
                //             const blackPiece = getPiecenameByLocation(tile, blackPieces)
                //             handleCapture(blackPiece, "black")
                //         }
                //     }
                // }
            }

        }

        if (!whitesTurn) {
            if (matchingPieceBlack) {
                locations = whereCanThatPieceMove(tile, matchingPieceBlack, whitePieces, blackPieces, castlingVariables)
            }
            setLegalMovesForSelectedPiece(locations)
            // Random clicks
            if (!blackPiecePositions.includes(lastClickedSquare) && !blackPiecePositions.includes(tile)) {
                setLegalMovesForSelectedPiece([])
            }
            // /a piece to empty space or capture
            if (blackPiecePositions.includes(lastClickedSquare) && !blackPiecePositions.includes(tile)) {
                let validMove = movePiece(lastClickedSquare, tile, whitePieces, blackPieces, blackPieces, castlingVariables)
                if (validMove) {
                    let isKingInCheck = isEitherKingInCheck(whitePieces, blackPieces, validMove, tile, "black", isWhiteKingInCheck, isBlackKingInCheck, castlingVariables)

                    setIsWhiteKingInCheck(isKingInCheck.whiteKingStatus)
                    setIsBlackKingInCheck(isKingInCheck.blackKingStatus)

                    if (isKingInCheck.legalMove) {

                        // Check to see if the player is castling
                        let pieceName = getPiecenameByLocation(lastClickedSquare, blackPieces)
                        if (pieceName === "blackKing" && tile === "g8" && !castlingVariables.hasBlackKingBeenMoved && !castlingVariables.hasBlackRookTwoBeenMoved) {
                            handleCastling(tile)
                            toggleCastlingVariable("hasBlackKingBeenMoved")
                            return
                        }
                        if (pieceName === "blackKing" && tile === "c8" && !castlingVariables.hasBlackKingBeenMoved && !castlingVariables.hasBlackRookOneBeenMoved) {
                            handleCastling(tile)
                            toggleCastlingVariable("hasBlackKingBeenMoved")
                            return
                        }

                        // Account for any movement to rook one, rook two, or king
                        if (pieceName === "blackKing" && !castlingVariables.hasBlackKingBeenMoved) { toggleCastlingVariable("hasBlackKingBeenMoved") }
                        if (pieceName === "blackRookOne" && !castlingVariables.hasBlackRookOneBeenMoved) { toggleCastlingVariable("hasBlackRookOneBeenMoved") }
                        if (pieceName === "blackRookTwo" && !castlingVariables.hasBlackRookTwoBeenMoved) { toggleCastlingVariable("hasBlackRookTwoBeenMoved") }

                        const animationAngles = calculateAnimations(lastClickedSquare, tile)

                        setTileToBeAnimated(lastClickedSquare)
                        setAnimations(animationAngles)

                        setTimeout(() => {
                            setTileToBeAnimated(null)
                            changePieceLocation(validMove, tile)
                        }, 150)

                        // This represents a capture
                        if (whitePiecePositions.includes(tile)) {
                            const whitePiece = getPiecenameByLocation(tile, whitePieces)
                            handleCapture(whitePiece, "white")
                        }
                    }
                }
            }
        }

        setLastClickedSquare(tile)
    }

    return (
        <div className="flex">
            <div>
                <CapturedPieces
                    pieces={whitePieces}
                    player={"black"}
                />
                <div className="w-[700px] h-[700px] bg-gray-400 grid grid-cols-8 grid-rows-8 border-[4px] border-gray-700">
                    {allBoardSquares.map((tile, index) => (
                        <Pieces
                            key={index}
                            index={index}
                            tile={tile}
                            lastClickedSquare={lastClickedSquare}
                            whitesTurn={whitesTurn}
                            whitePieces={whitePieces}
                            blackPieces={blackPieces}
                            whatWhiteSees={whatWhiteSees}
                            whatBlackSees={whatBlackSees}
                            legalMovesForSelectedPiece={legalMovesForSelectedPiece}
                            isWhiteKingInCheck={isWhiteKingInCheck}
                            isBlackKingInCheck={isBlackKingInCheck}
                            showLayeredAttacks={showLayeredAttacks}
                            whatPlayerSeeWithDuplicates={whatPlayerSeeWithDuplicates}
                            clickPartOfTheBoard={clickPartOfTheBoard}
                            animations={animations}
                            tileToBeAnimated={tileToBeAnimated}
                        />
                    ))}
                </div>
                <CapturedPieces
                    pieces={blackPieces}
                    player={"white"}
                />
            </div>
            <Stats
                whatWhiteSees={whatWhiteSees}
                whatBlackSees={whatBlackSees}
                whitesTurn={whitesTurn}
                showLayeredAttacks={showLayeredAttacks}
                setShowLayeredAttacks={setShowLayeredAttacks}
            />
        </div>
    )
}

export default Board