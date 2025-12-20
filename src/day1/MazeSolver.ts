// define possible moves to top, bottom, left, right;
const possibleDirections = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Base cases

    // out of area
    if (
        curr.x < 0 ||
        curr.x > maze[0]?.length ||
        curr.y < 0 ||
        curr.y > maze.length
    ) {
        return false;
    }

    // reached a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // reached the end
    if (curr.x === end.x && curr.y === end.y) {
        // push end to define end of the recursion
        path.push(curr);
        return true;
    }

    // check previous history
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // important to add the current to the history
    seen[curr.y][curr.x] = true;

    // add current point to the path
    path.push(curr);

    // recurse
    for (let i = 0; i < possibleDirections.length; i++) {
        // get direction move
        const [x, y] = possibleDirections[i];

        // call walk recursively for each direction
        if (
            walk(
                maze,
                wall,
                {
                    x: curr.x + x,
                    y: curr.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            // return here to prevent looping forward
            return true;
        }
    }

    // drop current point from the path
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
