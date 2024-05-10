const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
var container = ''
const password = 'dile123';

for(const value of arr) {
    container += value;
}
if(container === password) {
    console.log('Password is correct');
} else {
    console.log('Password is incorrect');
}