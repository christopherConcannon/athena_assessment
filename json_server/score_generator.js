const fs = require('fs')
const data = require('./faker_data.json')


const randoScore = (min = 55, max = 100) => {
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
}




data.forEach(student => {
  student.scores = {}
  return [...Array(3)].map((_, i) => {
    return student.scores[`test${i + 1}`] = randoScore()
  })
})

newJSON = {
  "students": data
}



fs.writeFile('students.json', JSON.stringify(newJSON, null, '\t'), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});