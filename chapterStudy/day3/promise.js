const promise1 = new Promise(resolve => {
    console.log('start promise1');

    setTimeout(() => {
        console.log('end promise');
        resolve('promise1 반환')
    }, 500);
});

const promise2 = new Promise(resolve => {
    console.log('start promise2');

    setTimeout(() => {
        console.log('end promise2');
        resolve('promise2 반환')
    }, 300);
});

/*
promise1.then((p1) => console.log(p1));
*/

Promise.all([promise1, promise2]).then(result => result.forEach(r => console.log(r)));
