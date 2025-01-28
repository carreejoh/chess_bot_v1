import { variableNamesToURLPath } from "../referenceObjects"

function CapturedPieces({
    pieces,
    player
}) {

    console.log(pieces)

    return(
        <div className="h-8 w-[700px]">
            {player === "white" ? (
                <div className="w-full h-full flex items-center">
                    {pieces.blackPawnOne === "na" && (
                        <img alt="black pawn one" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnOne"]}`}/>
                    )}
                    {pieces.blackPawnTwo === "na" && (
                        <img alt="black pawn Two" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnTwo"]}`}/>
                    )}
                    {pieces.blackPawnThree === "na" && (
                        <img alt="black pawn Three" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnThree"]}`}/>
                    )}
                    {pieces.blackPawnFour === "na" && (
                        <img alt="black pawn Four" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnFour"]}`}/>
                    )}
                    {pieces.blackPawnFive === "na" && (
                        <img alt="black pawn Five" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnFive"]}`}/>
                    )}
                    {pieces.blackPawnSix === "na" && (
                        <img alt="black pawn Six" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnSix"]}`}/>
                    )}
                    {pieces.blackPawnSeven === "na" && (
                        <img alt="black pawn Seven" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnSeven"]}`}/>
                    )}
                    {pieces.blackPawnEight === "na" && (
                        <img alt="black pawn Eight" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["blackPawnEight"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>    
                    {pieces.blackKnightOne === "na" && (
                        <img alt="black pawn Seven" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackKnightOne"]}`}/>
                    )}
                    {pieces.blackKnightTwo === "na" && (
                        <img alt="black pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackKnightTwo"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.blackBishopOne === "na" && (
                        <img alt="black pawn Seven" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackBishopOne"]}`}/>
                    )}
                    {pieces.blackBishopTwo === "na" && (
                        <img alt="black pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackBishopTwo"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.blackRookOne === "na" && (
                        <img alt="black pawn Seven" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackRookOne"]}`}/>
                    )}
                    {pieces.blackRookTwo === "na" && (
                        <img alt="black pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackRookTwo"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.blackQueen === "na" && (
                        <img alt="black pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["blackQueen"]}`}/>
                    )}
                </div>    
            ) : (
                <div className="w-full h-full flex items-center">
                    {pieces.whitePawnOne === "na" && (
                        <img alt="white pawn one" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnOne"]}`}/>
                    )}
                    {pieces.whitePawnTwo === "na" && (
                        <img alt="white pawn Two" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnTwo"]}`}/>
                    )}
                    {pieces.whitePawnThree === "na" && (
                        <img alt="white pawn Three" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnThree"]}`}/>
                    )}
                    {pieces.whitePawnFour === "na" && (
                        <img alt="white pawn Four" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnFour"]}`}/>
                    )}
                    {pieces.whitePawnFive === "na" && (
                        <img alt="white pawn Five" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnFive"]}`}/>
                    )}
                    {pieces.whitePawnSix === "na" && (
                        <img alt="white pawn Six" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnSix"]}`}/>
                    )}
                    {pieces.whitePawnSeven === "na" && (
                        <img alt="white pawn Seven" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnSeven"]}`}/>
                    )}
                    {pieces.whitePawnEight === "na" && (
                        <img alt="white pawn Eight" className="w-6 h-6 -ml-1.5" src={`/${variableNamesToURLPath["whitePawnEight"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.whiteKnightOne === "na" && (
                        <img alt="white pawn Seven" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteKnightOne"]}`}/>
                    )}
                    {pieces.whiteKnightTwo === "na" && (
                        <img alt="white pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteKnightTwo"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.whiteBishopOne === "na" && (
                        <img alt="white pawn Seven" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteBishopOne"]}`}/>
                    )}
                    {pieces.whiteBishopTwo === "na" && (
                        <img alt="white pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteBishopTwo"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.whiteRookOne === "na" && (
                        <img alt="white pawn Seven" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteRookOne"]}`}/>
                    )}
                    {pieces.whiteRookTwo === "na" && (
                        <img alt="white pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteRookTwo"]}`}/>
                    )}
                    <div className="ml-1.5">
                    </div>  
                    {pieces.whiteQueen === "na" && (
                        <img alt="white pawn Eight" className="w-6 h-6 -ml-1" src={`/${variableNamesToURLPath["whiteQueen"]}`}/>
                    )}
                </div>    
            )}
        </div>
    )
}

export default CapturedPieces