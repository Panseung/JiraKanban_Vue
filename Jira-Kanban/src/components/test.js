a = [{"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},{"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},{"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},{"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},{"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},{"status":"todo","content":"Allow users to change between two tiers at the same price","writer":"Kim"},{"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},{"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},{"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},{"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},{"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},{"status":"progress","content":"Force SSL on any page that contains account info","writer":"Wang"},{"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},{"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},{"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},{"status":"done","content":"Schedule weekly email report for Monday mrnings to all staff","writer":"Yu"},{"status":"none"},{"status":"none"},{"status":"none"}]
fromEmpty = {
  todo: [],
  progress: [],
  done: []
}

for (let i = 0; i < a.length; i++) {
  const task = a[i]
  const status = task.status
  const targetList = fromEmpty[status]
  if (targetList) {
    targetList.push(task)
  }
  
}
// console.log(fromEmpty)

function groupBy(arr, key) {
  let returnObj = {}
  returnObj[key] = []
  for (let i = 0; i < arr.length; i++) {
    const task = arr[i]
    const status = task.status
    if (status === key) {
      returnObj[key].push(task)
    }
  }
  return returnObj
}

console.log(groupBy(a, 'todo'))