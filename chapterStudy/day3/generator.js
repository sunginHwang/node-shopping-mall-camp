function* iterFunc() {
    yield console.log('첫번쨰 출력');
    yield console.log('첫번쨰 출력');
    yield console.log('첫번쨰 출력');
    yield console.log('첫번쨰 출력');
    yield 23;
};

const checkGenerator = generator => console.log(`코루틴. value: ${generator.value} , isDone : ${generator.done}`);

const iter = iterFunc();

iter.next();
iter.next();
iter.next();
iter.next();
const a = iter.next();
checkGenerator(a);
const b = iter.next();
checkGenerator(b);

console.log('async-await');


