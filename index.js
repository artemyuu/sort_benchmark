const products = [
  {
  name: "TheCup",
  cat: "dishes",
  },
  {
  name: "roze",
  cat: "flowers",
  },
  {
  name: "ThinTV",
  cat: "devices",
  },
 ];

 const userSort = ["dishes", "devices", "flowers"];

 const sortFn1 = (arr, filters) => {
  const filteredArrays = {};
  filters.map( filter => filteredArrays[filter] = [] );
  arr.forEach( item => {
    filteredArrays[item.cat].push(item); 
  }) 
  return filters.reduce( (acc, filter) => acc.concat(filteredArrays[filter]), [] ); //f*n
                                                                                    //где n - эл массива
                                                                                    //f - кол-во фильтров
}

const sortFn2 = (arr, filters) => {
  const indexes = filters.reduce( (acc, filter, index) => {
    acc[filter] = index;
    return acc;
  }, {});
  return [...arr].sort( (a, b) => indexes[a.cat] - indexes[b.cat] ); //В зависимости от sort 
                                                                    //n + f (в лучшем случае);
                                                                   //n^2 + f (в худшем);
}


//=======================================BENCHMARK=======================================//

const multiplyArr = (arr, count) => Array(count).fill(0).map( () => arr).flat()

const getPerfomanceTime = (arr, filter, sortFn) => {
  const start = performance.now();
  sortFn(arr, filter);
  return performance.now() - start;
}

const logBechInfo = (arr, iterations) => {
  console.log(arr.length, 'elements');
  console.log(iterations, 'iterations');
}

const createBenchMark = (arr, filters, iterations) => {
  return (sortFn) => {
    logBechInfo(arr, iterations)
    const perfomanceTimes = [];
    for(let i = 0; i < iterations; i++) {
      perfomanceTimes.push(getPerfomanceTime(arr, filters, sortFn));
    }
    return perfomanceTimes.reduce((a,b) => a + b, 0) / perfomanceTimes.length;
  }
}

const benchMark = createBenchMark(multiplyArr(products, 5000000), userSort, 1);

const startBenchMark = (benchMark, fn) => {
  console.log('------------------');
  console.log('Benchmark started');
  console.log('Finished in', benchMark(fn), 'ms');
  console.log('------------------');
}

startBenchMark(benchMark, sortFn1);
startBenchMark(benchMark, sortFn2);