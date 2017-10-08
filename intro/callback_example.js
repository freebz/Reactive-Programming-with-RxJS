function B(callback) {
    // Do operation that takes some time
    callback('Done!');
}

function A(message) {
    console.log(message);
}

// Execute `B` with `A` as a callback
B(A);