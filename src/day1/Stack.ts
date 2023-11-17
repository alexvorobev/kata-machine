type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const newNode = {
            value: item,
        } as Node<T>;

        this.length++;
        if (!this.head) {
            this.head = newNode;
            return;
        }

        newNode.prev = this.head;
        this.head.next = newNode;
        this.head = newNode;
        return;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        const oldHead = this.head as Node<T>;
        if (this.length === 0) {
            this.head = undefined;

            return oldHead?.value;
        }

        this.head = oldHead?.prev;
        return oldHead.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
