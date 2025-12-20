type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const newNode = { value: item, prev: this.head } as Node<T>;
        this.head = newNode;
        this.length++;
    }

    pop(): T | undefined {
        if (!this.length) {
            return;
        }
        this.length--;
        const head = this.head;
        this.head = this.head?.prev;

        return head?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
