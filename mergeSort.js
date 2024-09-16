function mergeSort(array) {
    if (array.length == 1) {
        return array;
    }

    const middleIndex = Math.floor(array.length / 2);
    const firstHalf = array.slice(0, middleIndex);
    const secondHalf = array.slice(middleIndex);

    const left = mergeSort(firstHalf);
    const right = mergeSort(secondHalf);

    return merge(left, right);
}

function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
        if (left[0] == right[0]) {
            //remove duplicate
            result.push(left.shift());
            right.shift();
        } else if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left, right);
}

export default mergeSort;
