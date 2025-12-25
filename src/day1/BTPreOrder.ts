function dive(node: BinaryNode<number> | null, log: number[]) {
    if (!node) return;

    log.push(node.value);
    dive(node.left, log);
    dive(node.right, log);
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    const output: number[] = [];
    dive(head, output);

    return output;
}
