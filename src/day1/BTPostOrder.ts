function walk(
    curr: BinaryNode<number> | undefined | null,
    path: number[],
): number[] {
    if (!curr) {
        return path;
    }

    // recurse

    // recurse
    walk(curr.left, path);
    walk(curr.right, path);
    // post
    path.push(curr.value);

    // post
    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
