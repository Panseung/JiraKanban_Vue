// find(arr, fn) {},   // arr 받아서 fn 거치고 ref 바꿔서 새로운 배열 리턴하기

// const testArr = [1, 12, 13, 4, 5]

// const testFn = ( a, idx ) => {
//   if ( a > 10 ) {
//     return true
//   } 
// }

// const filterTest = ( arr, fn ) => {
//   returnArr = []
//   for( let i = 0; i < arr.length; i++ ) {
//     const item = arr[i]
//     if( fn( item ) ) {
//       returnArr.push( item )
//     }
//   }
//   return returnArr
// }

// console.log( filterTest( testArr, testFn ) )

// remove parameter 변경 테스트

const a = []

const parameterTest = ( arr ) => {
  arr = [1, 3, 5]
  // arr.push( 1 )
}
parameterTest( a )
console.log( a )