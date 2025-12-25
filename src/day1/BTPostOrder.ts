function dive(node: BinaryNode<number> | null, log: number[]) {
    if (!node) return;

    dive(node.left, log);
    dive(node.right, log);
    log.push(node.value);
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    const output: number[] = [];
    dive(head, output);

    return output;
}
