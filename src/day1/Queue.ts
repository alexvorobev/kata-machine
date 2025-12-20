type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>; // pointer to the first element
    private tail?: Node<T>; // pointer to the last element

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const newNode = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = newNode;
            return;
        }

        this.tail.next = newNode;
        this.tail = newNode;
    }

    deque(): T | undefined {
        if (!this.head) {
            return;
        }

        this.length--;
        const head = this.head;
        this.head = this.head.next;

        if (this.length === 0) {
            this.tail = undefined;
        }

        head.next = undefined; // optional: clean up the reference

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
