// sorting
function qs(arr: number[], low: number, high: number): void {
    // base cases
    // if low becomes bigger than high, we should stop recurring
    if (low >= high) {
        return;
    }

    // find pivot
    const pivotIdx = partition(arr, low, high);

    // divide and conquer
    qs(arr, low, pivotIdx - 1);
    qs(arr, pivotIdx + 1, high);
}

// partition
function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];

    // set a pointer index to where we will smaller items
    let idx = low - 1; // how is it going to work for cases when we choose a middle item as a pivot

    for (let i = low; i < high; i++) {
        // each element has to compared to the pivot!
        if (arr[i] <= pivot) {
            idx++;
            // now swap current element with the one the index
            const temp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = temp;
        }
    }

    idx++;

    // in the end we need to make sure that all elements at the left are less or equal to pivot
    // and those on the right are bigger, so we should put pivot to the index position
    arr[high] = arr[idx];
    arr[idx] = pivot;

    // and now we need to return index
    return idx;
}

// initial function
export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
