// import  fetch from "node-fetch"

// import  fs from "fs"


const testBtn = document.querySelector('#execute')

testBtn.addEventListener('click', async () => {
    await executeall()
})


  
async function executeall() {
  let fulllist = []

  // let tokenaddress = 'FNMLmBPkhh7nBFyGHsdrmCuvgEf6ygpaVqFejimHEx9V' //FNMLmBPkhh7nBFyGHsdrmCuvgEf6ygpaVqFejimHEx9V ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo
  let tokenaddress = document.getElementById("tokenaddress").value


  //get totalvalue holders
  let url1 = `https://public-api-test.solscan.io/token/holders?tokenAddress=${tokenaddress}&limit=1&offset=0`
      let status1 = await fetch(url1)
      let commits1 = await status1.json();
      let totalvalue = commits1.total
      document.getElementById("forconsole").value = 'amount of holders: ' + totalvalue
    console.log('amount of holders: ' + totalvalue)




  for (let index = 0; index < totalvalue  ; index = index + 100) {
      
      function time() {
        document.getElementById("forconsole").value = 'timeout'

          console.log('timeout 3000ms');  

        }
        setTimeout(time, 3000);

      
      let url = `https://public-api-test.solscan.io/token/holders?tokenAddress=${tokenaddress}&limit=100&offset=${index}`
      let status = await fetch(url)

      let commits = await status.json();

      fulllist.push(commits)
      document.getElementById("forconsole").value = `${index} из ${totalvalue} записано`

      console.log(`${index} из ${totalvalue} записано`)
      
    
      
    
  }
  var insert = JSON.stringify(fulllist); 
//   console.log(insert)
//   fs.writeFileSync("rawlist.txt", insert)
document.getElementById("forconsole").value = 'файлы записаны'

  console.log('файлы записаны')

 

  async function sortall() {
  let holderslist = []
  let myArray = []
  let space = ''
  var re =   new RegExp ('"address":"[1-9A-HJ-NP-Za-km-z]{32,44}', 'g');
//   let str = fs.readFileSync('rawlist.txt', 'utf8');

  function contains(holderslist, element) {
      for (var i = 0; i < holderslist.length; i++) {
          if (holderslist[i] === element) {
              console.log('дубликат не записываем')
          }
      }
      console.log('не дубликат, записываем')
      holderslist.push(element)
  }

    myArray = insert.match(re);




  for (let index = 0; index < myArray.length; index++) {
      let element = myArray[index].replace('"address":"', space)
      contains(holderslist, element )

      
  }


  let frontArray = []

  for (let index = 0; index < holderslist.length; index++) {
    const element = holderslist[index];
     frontArray.push(element)
    
  }
  console.log(frontArray)


  let finString = frontArray.join("\n")
  
  document.getElementById("textarea").value = finString

  document.getElementById("forconsole").value = 'finished'

  



  

  //insert in file
//   for (let index = 0; index < holderslist.length; index++) {
//       fs.appendFileSync('finishlist.txt', `\n${holderslist[index]}`);
      
//   }



  }

  sortall()
}












