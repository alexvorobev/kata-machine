function dive(node: BinaryNode<number> | null, log: number[]) {
    if (!node) return;

    dive(node.left, log);
    log.push(node.value);
    dive(node.right, log);
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    const output: number[] = [];
    dive(head, output);

    return output;
}
