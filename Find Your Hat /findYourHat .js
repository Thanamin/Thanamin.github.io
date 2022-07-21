const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  board = [[]]
  constructor(inputBoard) {
    this.board = inputBoard;
    this.playerPosition = [0, 0];
    
  }


  updateField() {
    const x = this.playerPosition[0]
    const y = this.playerPosition[1]
    if (this.board[y][x] === hole) {
      myField.print();
      throw Error('"You are dead !!!"')
    } else if (this.board[y][x] === hat) {
      myField.print();
      throw Error('"You are won !!!"')
    } else if (this.board[y][x] === pathCharacter) {
      myField.print();
      throw Error('"Can not return. You are dead !!!"')
    }
    this.board[y][x] = pathCharacter
  }

  print() {
    console.log(this.board.map((r) => r.join('')).join('\n'));

  }
  moveRight() {
    if (this.playerPosition[0] + 1 < this.board[0].length) {
      this.playerPosition[0]++;
      this.updateField()

    }
    else if (this.playerPosition[0] + 1 >= this.board[0].length) {
      myField.print();
      throw Error('"You are dead !!!"')

    }

  }

  moveLeft() {
    if (this.playerPosition[0] - 1 >= 0) {
      this.playerPosition[0]--;
      this.updateField()

    }
    else if (this.playerPosition[0] - 1 < 0) {
      myField.print();
      throw Error('"You are dead !!!"')

    }

  }

  moveDown() {
    if (this.playerPosition[1] + 1 < this.board.length) {
      this.playerPosition[1]++;
      this.updateField()

    }
    else if (this.playerPosition[1] + 1 >= this.board.length) {
      myField.print();
      throw Error('"You are dead !!!"')

    }
  }

  moveUp() {
    if (this.playerPosition[1] - 1 >= 0) {
      this.playerPosition[1]--;
      this.updateField()

    }
    else if (this.playerPosition[1] - 1 < 0) {
      myField.print();
      throw Error('"You are dead !!!"')

    }
  }

  startGame() {
    // let myField = new Field([]) /// ไม่ได้ใช้อันนี้เป็นพี่สามทำไว้ช่วงแรก
    //   ['*', '░', 'O'],
    //   ['░', 'O', '░'],
    //   ['░', '^', '░'],
    // ]);

    /// ยังนึกไม่ออกจะเอาไป gen ยังไง
    let widthField = prompt('Please input width field : ');
    /// x   
    let heightField = prompt('Please input height field : '); /// y
    let percentageHoles = prompt('Please input percentage pathway and holes ? : '); /// % hole
    console.clear();
    

    
    // console.log('Game mode');
    // let gameMode = prompt('1.) Easy 2.) Hard) => :');
    // const generatedField = Field.generateField(Number(widthField), Number(heightField), Number(percentageHoles));

    ///// Gen Map ///
    let noHoleField = []
    for (let i = 0; i < heightField; i++) {
      let colField = []
      for (let j = 0; j < widthField; j++) {
        colField.push(fieldCharacter)
      }
      noHoleField.push(colField)
    }

    /// Gen พื้นที่ hole ///
    for (let k = 0; k < ((Number(percentageHoles) / 100) * (Number(heightField) * Number(widthField))); k++) {
      let x = Math.floor(Math.random() * widthField);
      let y = Math.floor(Math.random() * heightField);
      // console.log(x, y)
      noHoleField[y][x] = hole;
    }
    /// Gen พื้นที่ hat ///
    for (let m = 0; m < (Number(heightField) * Number(widthField)); m++) {
      let x = Math.floor(Math.random() * widthField);
      let y = Math.floor(Math.random() * heightField);
      if (noHoleField[y][x] != hole) {
        noHoleField[y][x] = hat
        break
      }
    }


    
    /// Gen พื้นที่ Character (*) /// ยังทำไม่ได้ทำได้แค่ start (0,0)
    noHoleField[0][0] = pathCharacter; ///
    
    // ยังคิดไม่ออก
    
    // for (let m = 0; m < (Number(heightField) * Number(widthField)); m++) {
    //   let x = Math.floor(Math.random() * widthField);
    //   let y = Math.floor(Math.random() * heightField);
    //   if (noHoleField[y][x] != hole) {
    //     if (noHoleField[y][x] != hat) {
    //       noHoleField[y][x] = pathCharacter /// กำลังหาวิธี set ตำแหน่ง
    //       console.log("xy", x, y)
    //       return [y,x]
    //     }
    //   }
    // }

    
    this.board = noHoleField /// อัพเดทหลัง gen



    /// บังคับทิศทาง Character (*) ///
    while (true) {
      myField.print();
      // console.log(this.playerPosition) //check playerPosition
      const input = prompt('Input for move w,a,s,d ---- (w=up,a=left,s=down,d=right) ');
      console.clear();
      try {
        switch (input) {
          case 'a':
            myField.moveLeft();
            break;
          case 'd':
            myField.moveRight();
            break;
          case 'w':
            myField.moveUp();
            break;
          case 's':
            myField.moveDown();
            break;
        }

      } catch (e) {
        console.log(e);
        break;
      }
    }
  }
}

let myField = new Field([])
myField.startGame()
// for (let i = 0; i < 10; i++){
//   // const x = Math.random(); // [0,1)
//     const x = Math.floor(Math.random()*4);
//   // [0,3)
//     console.log(x); 
//}


// }
// let count = 0;
// while (thrue) {
//     const input = prompt('Please enter + or -');
//     if (input === '+'){
//       count++;
//     } else if (input == '-'{
//       count--;
//     } else {
//       console.log(`Invalid input ${input}`)
//     }
//     console.log(`Count =${count}`)


//     console.log(`Your input is ${input}`);
// }