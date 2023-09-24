function max(arr, i) {
  if (i === 0) return [arr[i], i];
  const x = max(arr, i - 1);

  if (arr[i] > x[0]) {
    return [arr[i], i];
  } else {
    return x;
  }
}

function sort(arr, sorted) {
  if (sorted === 0) return arr;

  const m = max(arr, sorted - 1)[1];

  [arr[sorted - 1], arr[m]] = [arr[m], arr[sorted - 1]];

  return sort(arr, sorted - 1);
}
const arr = [9, 8, 1, 12, 3, 4, 0, 0, -2];
console.log(sort(arr, arr.length));
