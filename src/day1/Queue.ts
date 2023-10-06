type QueueNode<T> = {
    value: T;
    next?: QueueNode<T>;
    prev?: QueueNode<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: QueueNode<T>;
    private tail?: QueueNode<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const newNode = {
            value: item,
        } as QueueNode<T>;
        this.length++;

        if (!this.tail) {
            this.tail = this.head = newNode;
        }

        this.tail.next = { ...newNode, prev: this.tail };
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const head = this.head;
        this.head = this.head.next;
        this.length--;

        head.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
