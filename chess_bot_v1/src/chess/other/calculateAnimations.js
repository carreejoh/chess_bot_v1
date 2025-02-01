
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const calculateAnimations = (startingTile, endingTile) => {
    const tileSize = 87; // Tile size in pixels
    const fileMap = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };

    // Function to calculate the center of a tile in pixels
    const getTileCenter = (tile) => {
        const file = tile[0]; // 'a', 'b', ..., 'h'
        const rank = parseInt(tile[1]); // '1', '2', ..., '8'
        const x = fileMap[file] * tileSize + tileSize / 2; // X-coordinate
        const y = (8 - rank) * tileSize + tileSize / 2; // Y-coordinate (rank inverted)
        return { x, y };
    };

    // Get the center points of the starting and ending tiles
    const startCenter = getTileCenter(startingTile);
    const endCenter = getTileCenter(endingTile);

    // console.log("Starting Tile Center:", startCenter);
    // console.log("Ending Tile Center:", endCenter);

    // Calculate the distance between the two centers
    const dx = endCenter.x - startCenter.x;
    const dy = endCenter.y - startCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the angle between the two centers
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert radians to degrees

    // console.log("Distance:", distance);
    // console.log("Angle:", angle);

    return { distance, angle, endCenter, dx, dy };
};
