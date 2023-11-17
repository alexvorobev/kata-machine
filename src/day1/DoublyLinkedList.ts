type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        // first create an item
        const newNode = { value: item } as Node<T>;

        if (!this.head) {
            this.head = newNode;
            this.length++;
            return;
        }

        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.length++;
    }

    private debug() {
        let curr = this.head;
        let out = `length: ${this.length} head: ${this.head?.value} tail: ${this.tail?.value}\n`;

        for (let i = 0; curr && i < this.length; ++i) {
            out += `${i} => ${curr.value}\n`;
            curr = curr.next;
        }

        console.log(out);
        return curr;
    }

    insertAt(item: T, idx: number): void {
        const newNode = { value: item } as Node<T>;

        if (idx > this.length) {
            throw Error("Invalid index");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        if (!this.head) {
            this.head = newNode;
            return;
        }

        let insertBefore = this.getNodeByIndex(idx);

        if (!insertBefore) {
            return;
        }

        const insertAfter = insertBefore.prev;
        newNode.next = insertBefore;
        newNode.prev = insertAfter;

        if (insertAfter) {
            insertAfter.next = newNode;
        }
        insertBefore.prev = newNode;

        this.length++;
    }

    append(item: T): void {
        const newNode: Node<T> = { value: item };

        this.length++;
        if (!this.tail) {
            this.head = this.tail = newNode;
            return;
        }

        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
    }

    remove(item: T): T | undefined {
        let target = this.head;

        for (let i = 0; target && i < this.length; ++i) {
            if (target.value === item) {
                break;
            }

            target = target.next;
        }

        if (!target) {
            return;
        }

        return this.removeNode(target);
    }

    getNodeByIndex(idx: number): Node<T> | undefined {
        if (idx > this.length) {
            throw Error("Invalid index");
        } else if (idx === this.length) {
            return this.tail;
        } else if (idx === 0) {
            return this.head;
        }

        let target = this.head;

        for (let i = 0; target && i < idx; ++i) {
            if (target.next) {
                target = target.next;
            }
        }

        return target;
    }

    get(idx: number): T | undefined {
        if (!this.head) return;

        if (idx > this.length) {
            throw Error("Element not found");
        } else if (idx === 0) {
            return this.head.value;
        }

        let resultElement = this.getNodeByIndex(idx);

        return resultElement?.value;
    }

    removeNode(target?: Node<T>): T | undefined {
        if (!target) {
            return;
        }

        if (target.prev) {
            target.prev.next = target.next;
        }

        if (target.next) {
            target.next.prev = target.prev;
        }

        if (target === this.head) {
            this.head = target.next;
        }

        if (target === this.tail) {
            this.tail = target.prev;
        }

        target.prev = target.next = undefined;
        this.length--;

        return target.value;
    }

    removeAt(idx: number): T | undefined {
        const target = this.getNodeByIndex(idx);

        if (!target) {
            return;
        }

        return this.removeNode(target);
    }
}
