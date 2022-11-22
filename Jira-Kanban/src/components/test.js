// localStorage에서 다룰 data 로직 연습해본 파일
a = [
  {"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},
  {"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},
  {"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},
  {"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},
  {"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},
  {"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},
  {"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},
  {"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},
  {"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},
  {"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},
  {"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},
  {"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},
  {"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},
  {"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},
  {"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},
  {"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},
  {"status":"none","writer":"Yu1"},
  {"status":"todo","writer":"Yu"},
  {"status":"none","writer":"Yu1"}
]
// fromEmpty = {
//   todo: [],
//   progress: [],
//   done: []
// }

// for( let i = 0; i < a.length; i++ ) {
//   const task = a[i]
//   const status = task.status
//   const targetList = fromEmpty[status]
//   if ( targetList ) {
//     targetList.push( task )
//   }
  
// }
// console.log(fromEmpty)

function groupBy( arr, key ) {
  let returnObj = {}
  for( let i = 0; i < arr.length; i++ ) {
    const item = arr[i]
    const groupItem = item[key]
    returnObj[groupItem] = returnObj[groupItem] || []
    returnObj[groupItem].push( item )
  }
  return returnObj
}

// console.log(groupBy( a, 'status' ) )
console.table(groupBy(a, 'status'))
console.table(groupBy(a, 'writer'))


const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
