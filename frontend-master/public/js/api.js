const REQUEST_TIME = 500; // ms

const runFakeApi = (targetData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(targetData);
        }, REQUEST_TIME);
    });
}