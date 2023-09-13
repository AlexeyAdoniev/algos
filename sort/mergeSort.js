const sort = (arr) => {
    if (arr.length === 1) {
        return arr;
    }

    const mid = Math.ceil(arr.length / 2);

    const arr1 = sort(arr.slice(0, mid));
    const arr2 = sort(arr.slice(mid));

    return merge(arr1, arr2);
};

const merge = (arr1, arr2) => {
    let res = [];
    let i = 0;
    let j = 0;

    while (res.length < arr1.length + arr2.length) {
        if (arr1[i] > arr2[j]) {
            res.push(arr2[j]);
            j++;
        } else {
            res.push(arr1[i]);
            i++;
        }

        if (i > arr1.length - 1) {
            res = [...res, ...arr2.slice(j)];
        }

        if (j > arr2.length - 1) {
            res = [...res, ...arr1.slice(i)];
        }
    }

    return res;
};

console.log(sort([3, 4, 1, 0, 12, -1, 0, 0, 35, 0]));
