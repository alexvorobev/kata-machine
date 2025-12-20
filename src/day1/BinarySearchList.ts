export default function bs_list(haystack: number[], needle: number): boolean {
    let lowIndex = 0,
        highIndex = haystack.length;

    do {
        const middlePoint = Math.floor(lowIndex + (highIndex - lowIndex) / 2);
        const v = haystack[middlePoint];

        if (v === needle) {
            return true;
        } else if (v > needle) {
            highIndex = middlePoint;
        } else {
            lowIndex = middlePoint + 1;
        }
    } while (lowIndex < highIndex);

    return false;
}
