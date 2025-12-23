type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        this.length++;
        const newElement: Node<T> = {
            value: item,
        };

        if (this.length === 1) {
            this.head = this.tail = newElement;
            return;
        }

        this.head!.prev = newElement;
        newElement.next = this.head;
        this.head = newElement;
    }
    insertAt(item: T, idx: number): void {
        if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (this.validateIdx(idx)) {
            return;
        }

        const el = this.getElementByIdx(idx);
        if (!el) {
            return;
        }

        const prev = el.prev!;
        const newElement = {
            value: item,
            next: el,
            prev,
        };

        prev.next = newElement;
        el.prev = newElement;
        this.length++;
    }
    append(item: T): void {
        this.length++;
        const newElement: Node<T> = {
            value: item,
        };

        if (this.length === 1) {
            this.head = this.tail = newElement;
            return;
        }

        newElement.prev = this.tail;
        this.tail!.next = newElement;
        this.tail = newElement;
    }

    remove(item: T): T | undefined {
        const el = this.getElementByValue(item);
        if (!el) {
            return;
        }
        const prevElement = el.prev;
        const nextElement = el.next;

        if (prevElement) {
            prevElement.next = nextElement;
        } else {
            this.head = nextElement;
        }

        if (nextElement) {
            nextElement.prev = prevElement;
        } else {
            this.tail = prevElement;
        }
        this.length--;

        return el.value;
    }

    private getElementByValue(item: T): Node<T> | undefined {
        let i = 0;
        let current: Node<T> | undefined = this.head;

        do {
            if (current?.value === item) {
                return current;
            }

            current = current?.next;
            i++;
        } while (i < this.length);

        return;
    }

    private getElementByIdx(idx: number): Node<T> | undefined {
        let i = 0;
        let target: Node<T> | undefined = this.head;
        if (idx < 0 || idx >= this.length) {
            return;
        } else if (idx === 0) {
            return this.head;
        } else if (this.validateIdx(idx)) {
            return;
        }

        do {
            target = target?.next;
            i++;
        } while (i < idx);

        return target;
    }

    private validateIdx(idx: number): boolean {
        return idx < 0 || idx >= this.length;
    }

    get(idx: number): T | undefined {
        if (this.validateIdx(idx)) {
            return;
        }

        return this.getElementByIdx(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const el = this.getElementByIdx(idx);
        if (!el) {
            return;
        }
        this.length--;

        // for loose item
        if (this.length === 0) {
            this.head = this.tail = undefined;
        }
        // for tails
        else if (idx === this.length) {
            this.tail = this.tail!.prev;
            this.tail!.next = undefined;
        }
        // for heads
        else if (idx === 0) {
            this.head = this.head?.next;
            this.head!.prev = undefined;
        } else {
            // in between
            const prevElement = el.prev!;
            const nextElement = el.next!;
            prevElement.next = nextElement;
            nextElement.prev = prevElement;
        }

        return el.value;
    }
}
