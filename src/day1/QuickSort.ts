function qs(arr: number[], low: number, high: number) {
  if(low >= high) {
    return;
  }

  const pivotIndex = partition(arr, low, high);

  qs(arr, low, pivotIndex - 1);
  qs(arr, pivotIndex + 1, high);
}

function partition(arr: number[], low: number, high: number) {
  const pivot = arr[high];

  let idx = low - 1;

  for (let i = low; i < high; i++) {
    if(arr[i] <= pivot) {
      idx++;

      const temp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = temp;
    }
  }

  idx++;
  arr[high] = arr[idx];
  arr[idx] = pivot;

  return idx;
}


export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}