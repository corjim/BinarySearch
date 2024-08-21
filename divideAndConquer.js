
// Given an array of 1s and 0s which has all 1s first followed by all 0s, write a function called countZeroes, which returns the number of zeroes in the array.

function countZeroes(arr) {
    function findFirstZero(arr) {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            // Check if mid is the first 0
            if (arr[mid] === 0) {
                if (mid === 0 || arr[mid - 1] === 1) {
                    return mid;
                }
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return -1;
    }

    const firstZeroIndex = findFirstZero(arr);

    if (firstZeroIndex === -1) {
        return 0;
    }

    return arr.length - firstZeroIndex;
}



function sortedFrequency(arr, num) {
    // Function to find the first occurrence of num
    function findFirst(arr, num) {
        let left = 0;
        let right = arr.length - 1;
        let result = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (arr[mid] === num) {
                result = mid;
                right = mid - 1;
            } else if (arr[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }


    // Given a sorted array and a number, write a function called sortedFrequency that counts the occurrences of the number in the array

    // Function to find the last occurrence of num
    function findLast(arr, num) {
        let left = 0;
        let right = arr.length - 1;
        let result = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (arr[mid] === num) {
                result = mid;
                left = mid + 1;
            } else if (arr[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    let firstIndex = findFirst(arr, num);
    if (firstIndex === -1) return 0;

    let lastIndex = findLast(arr, num);
    return lastIndex - firstIndex + 1;
}


// Write a function called ***findRotatedIndex*** which accepts a rotated array of sorted numbers and an integer. The function should return the index of num in the array. If the value is not found, return -1.
// ** Constraints **:
// Time Complexity: O(log N)

function findRotatedIndex(array, num) {
    var pivot = findPivot(array)
    if (pivot > 0 && num >= array[0] && num <= array[pivot - 1]) {
        return binarySearch(array, num, 0, pivot - 1);
    } else {
        return binarySearch(array, num, pivot, array.length - 1);
    }
}

function binarySearch(array, num, start, end) {
    if (array.length === 0) return -1;
    if (num < array[start] || num > array[end]) return -1;

    while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (array[mid] === num) {
            return mid;
        } else if (num < array[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return -1;
}

function findPivot(arr) {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
    var start = 0
    var end = arr.length - 1;
    while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (arr[mid] > arr[mid + 1]) return mid + 1
        else if (arr[start] <= arr[mid]) {
            start = mid + 1
        } else {
            end = mid - 1
        }
    }
}

module.exports = findRotatedIndex


// Write a function called ***findRotationCount*** which accepts an array of distinct numbers sorted in increasing order. The array has been rotated counter-clockwise n number of times. Given such an array, find the value of n.
// ** Constraints **:
// Time Complexity: O(log N)


function findRotationCount(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // If the array is already sorted, then there is no rotation
        if (arr[left] <= arr[right]) return left;

        let mid = Math.floor((left + right) / 2);
        let next = (mid + 1) % arr.length;
        let prev = (mid - 1 + arr.length) % arr.length;

        // Check if the mid element is the smallest
        if (arr[mid] <= arr[next] && arr[mid] <= arr[prev]) {
            return mid;
        }

        // Decide which half to discard
        if (arr[mid] >= arr[left]) {
            left = mid + 1; // The pivot is in the right half
        } else {
            right = mid - 1; // The pivot is in the left half
        }
    }

    return 0; // If not found (although this should not happen)
}



//  Write a function called findFloor which accepts a sorted array and a value x, and returns the floor of x in the array. The floor of x in an array is the largest element in the array which is smaller than or equal to x. If the floor does not exist, return -1.


function findFloor(arr, num, low = 0, high = arr.length - 1) {
    if (low > high) return -1;
    if (num >= arr[high]) return arr[high];

    let mid = Math.floor((low + high) / 2)

    if (arr[mid] === num) return arr[mid];

    if (mid > 0 && arr[mid - 1] <= num && num < arr[mid]) {
        return arr[mid - 1];
    }

    if (num < arr[mid]) {
        return findFloor(arr, num, low, mid - 1);
    }

    return findFloor(arr, num, mid + 1, high)
}

module.exports = findFloor