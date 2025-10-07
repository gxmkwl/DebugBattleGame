let currentQuestion;
let hearts = 3;
let score = 0;
let hintFree = 1;
let timer;
let timeLeft;

const questions = [
  // 1
  {code:'print("Hello World)', task:'Fix the syntax error', choices:['print("Hello World")','print(Hello World)','Print("Hello World")','echo "Hello World"'], answer:'print("Hello World")', hint:'Check the quotation marks.', difficulty:'Easy', points:1, time:30},
  // 2
  {code:'System.out.println("Welcome)', task:'Fix the syntax error', choices:['System.out.println("Welcome");','System.out.print("Welcome");','system.out.println("Welcome");','System.out.println("Welcome")'], answer:'System.out.println("Welcome");', hint:'Don’t forget semicolon and closing quotes.', difficulty:'Easy', points:1, time:30},
  // 3
  {code:'#include <stdio.h>\nint main() {\n    printf("Hi World\n)\n    return 0;\n}', task:'Fix the syntax error', choices:['printf("Hi World\n");','printf("Hi World");','Printf("Hi World\n");','printf("Hi World\n")'], answer:'printf("Hi World\n");', hint:'Missing semicolon and closing quotation.', difficulty:'Easy', points:1, time:30},
  // 4
  {code:'x = 5\ny = 2\nprint(x + y)', task:'Predict the output', choices:['7','52','3','Error'], answer:'7', hint:'Addition of numbers, not strings.', difficulty:'Easy', points:1, time:30},
  // 5
  {code:'int a = 3;\nint b = 4;\nSystem.out.println(a * b);', task:'Predict the output', choices:['7','12','34','Error'], answer:'12', hint:'Multiplication of integers.', difficulty:'Easy', points:1, time:30},
  // 6
  {code:'int a = 10;\nif(a = 5){\n    printf("a is 5\\n");\n}', task:'Fix the logic error', choices:['if(a == 5)','if(a = 10)','if(a != 5)','if(a = 5)'], answer:'if(a == 5)', hint:'Use == to compare, not =.', difficulty:'Easy', points:1, time:30},
  // 7
  {code:'numbers = [1,2,3,4,5]\ntotal = 0\nfor n in numbers:\n    total = n\nprint(total)', task:'Fix the logic error', choices:['total += n','total =+ n','total = total','total = n'], answer:'total += n', hint:'Use accumulation (+=) instead of assignment.', difficulty:'Medium', points:2, time:45},
  // 8
  {code:'for(int i=0; i<3; i++){\n    System.out.print(i);\n}', task:'Predict the output', choices:['012','123','0 1 2','321'], answer:'012', hint:'Loop starts at 0 and ends before 3.', difficulty:'Medium', points:2, time:45},
  // 9
  {code:'for(int i=0 i<5 i++){\n    printf("%d\\n", i);\n}', task:'Fix the syntax error', choices:['for(int i=0; i<5; i++)','for(int i=0; i<=5; i++)','for(i=0 i<5 i++)','for(int i=0; i<5)'], answer:'for(int i=0; i<5; i++)', hint:'Remember semicolons between for-loop statements.', difficulty:'Medium', points:2, time:45},
  // 10
  {code:'def func(x):\n    return x*2\nprint(func(3)+func(4))', task:'Predict the output', choices:['14','7','12','34'], answer:'14', hint:'Compute each function call then sum the results.', difficulty:'Hard', points:3, time:60},

  // 11
  {code:'a = 10\nb = 5\nif a < 5:\n    print("a is small")', task:'Predict the output', choices:['a is small','Nothing','Error','5'], answer:'Nothing', hint:'Condition a < 5 is false.', difficulty:'Easy', points:1, time:30},
  // 12
  {code:'for i in range(3):\nprint(i)', task:'Fix the syntax error', choices:['Indent the print statement','Change range(3) to range(1,4)','Add colon after print','No fix needed'], answer:'Indent the print statement', hint:'Python requires indentation inside loops.', difficulty:'Easy', points:1, time:30},
  // 13
  {code:'int numbers[3] = {1,2,3};\nprintf("%d", numbers[3]);', task:'Fix the logic error', choices:['numbers[2]','numbers[3]','numbers[0]','numbers[1]'], answer:'numbers[2]', hint:'Array index starts at 0.', difficulty:'Medium', points:2, time:45},
  // 14
  {code:'def add(a, b):\n    return a - b\nprint(add(3, 2))', task:'Fix the logic error', choices:['return a + b','return a - b','return b - a','return a * b'], answer:'return a + b', hint:'Function name is add, should add numbers.', difficulty:'Medium', points:2, time:45},
  // 15
  {code:'int x = 5;\nif(x > 2)\n    System.out.println("Greater")\nelse\n    System.out.println("Smaller");', task:'Fix the syntax error', choices:['Add braces {}','Remove else','Change > to >=','No fix needed'], answer:'Add braces {}', hint:'Java requires braces for multi-line if-else.', difficulty:'Medium', points:2, time:45},
  // 16
  {code:'numbers = [1,2,3]\nprint(numbers[3])', task:'Fix the logic error', choices:['numbers[2]','numbers[3]','numbers[0]','numbers[1]'], answer:'numbers[2]', hint:'List index starts at 0.', difficulty:'Medium', points:2, time:45},
  // 17
  {code:'for(int i=1; i<=5; i++){\n    printf("%d ", i);\n}', task:'Predict the output', choices:['1 2 3 4 5','0 1 2 3 4 5','1 2 3 4','2 3 4 5 6'], answer:'1 2 3 4 5', hint:'Loop from 1 to 5 inclusive.', difficulty:'Easy', points:1, time:30},
  // 18
  {code:'x = 0\nwhile x < 3:\n    print(x)\n    x += 1', task:'Predict the output', choices:['0 1 2','1 2 3','0 1 2 3','Error'], answer:'0 1 2', hint:'x increments after each print.', difficulty:'Easy', points:1, time:30},
  // 19
  {code:'def multiply(x, y):\n    return x + y\nprint(multiply(2,3))', task:'Fix the logic error', choices:['return x * y','return x + y','return y - x','return x - y'], answer:'return x * y', hint:'Function name is multiply, should multiply numbers.', difficulty:'Medium', points:2, time:45},
  // 20
  {code:'int a = 1, b = 2;\nif(a > b)\n    printf("a bigger");\nelse\n    printf("b bigger");', task:'Predict the output', choices:['a bigger','b bigger','Error','Nothing'], answer:'b bigger', hint:'Condition a > b is false.', difficulty:'Easy', points:1, time:30},

  // 21
  {code:'x = [1,2,3]\nx.append(4)\nprint(x)', task:'Predict the output', choices:['[1,2,3,4]','[1,2,3]','[4]','Error'], answer:'[1,2,3,4]', hint:'append adds element to list.', difficulty:'Easy', points:1, time:30},
  // 22
  {code:'for(int i=0;i<3;i++){\n    System.out.println(i*i);\n}', task:'Predict the output', choices:['0 1 4','0 1 2','1 4 9','0 1 4 9'], answer:'0 1 4', hint:'Prints square of i each iteration.', difficulty:'Medium', points:2, time:45},
  // 23
  {code:'int arr[3]={1,2,3};\nprintf("%d", arr[3]);', task:'Fix logic error', choices:['arr[2]','arr[3]','arr[0]','arr[1]'], answer:'arr[2]', hint:'Indexing starts at 0.', difficulty:'Medium', points:2, time:45},
  // 24
  {code:'def foo():\n    print("Hello")\nfoo()', task:'Predict the output', choices:['Hello','Error','foo','Nothing'], answer:'Hello', hint:'Function prints "Hello"', difficulty:'Easy', points:1, time:30},
  // 25
  {code:'x = 5\ny = 0\nprint(x/y)', task:'Predict the output', choices:['Error','0','5','Infinity'], answer:'Error', hint:'Division by zero.', difficulty:'Hard', points:3, time:60},
  // 26
  {code:'int a=5;\nint b=10;\nprintf("%d", a+b);', task:'Predict the output', choices:['15','510','Error','5'], answer:'15', hint:'Addition of integers.', difficulty:'Easy', points:1, time:30},
  // 27
  {code:'def func(a,b):\n    return a/b\nprint(func(10,2))', task:'Predict the output', choices:['5','0','Error','2'], answer:'5', hint:'10 divided by 2', difficulty:'Easy', points:1, time:30},
  // 28
  {code:'int x=0;\nwhile(x<3){\n    printf("%d", x);\n    x++;\n}', task:'Predict the output', choices:['012','123','0 1 2','Error'], answer:'012', hint:'Loop increments after print.', difficulty:'Easy', points:1, time:30},
  // 29
  {code:'def func(x):\n    return x*2\nprint(func(3))', task:'Predict the output', choices:['6','3','Error','9'], answer:'6', hint:'Multiply input by 2.', difficulty:'Easy', points:1, time:30},
  // 30
  {code:'int a=10;\nif(a<5)\n    printf("less");\nelse\n    printf("more");', task:'Predict the output', choices:['less','more','Error','10'], answer:'more', hint:'Condition a<5 is false.', difficulty:'Easy', points:1, time:30},

  // 31
  {code:'x = [1,2,3]\nx[1]=5\nprint(x)', task:'Predict the output', choices:['[1,5,3]','[1,2,3]','[5,2,3]','[1,3,5]'], answer:'[1,5,3]', hint:'Index 1 is changed to 5.', difficulty:'Easy', points:1, time:30},
  // 32
  {code:'for(int i=0;i<3;i++){\n    printf("%d",i+1);\n}', task:'Predict the output', choices:['123','012','1 2 3','Error'], answer:'123', hint:'Print i+1 each iteration.', difficulty:'Easy', points:1, time:30},
  // 33
  {code:'def sum_list(lst):\n    total=0\n    for x in lst:\n        total += x\n    return total\nprint(sum_list([1,2,3]))', task:'Predict the output', choices:['6','5','123','Error'], answer:'6', hint:'Sum all elements.', difficulty:'Easy', points:1, time:30},
  // 34
  {code:'int a=5;\nint b=3;\nprintf("%d",a-b);', task:'Predict the output', choices:['2','8','-2','Error'], answer:'2', hint:'5 minus 3', difficulty:'Easy', points:1, time:30},
  // 35
  {code:'def greet(name):\n    print("Hello " + name)\ngreet("Alice")', task:'Predict the output', choices:['Hello Alice','Hello name','Alice','Error'], answer:'Hello Alice', hint:'Concatenate string.', difficulty:'Easy', points:1, time:30},
  // 36
  {code:'int x=0;\nfor(int i=0;i<3;i++){\n    x+=i;\n}\nprintf("%d",x);', task:'Predict the output', choices:['3','6','0','Error'], answer:'3', hint:'x=0+1+2=3', difficulty:'Medium', points:2, time:45},
  // 37
  {code:'numbers = [1,2,3,4]\nprint(numbers[1:3])', task:'Predict the output', choices:['[2,3]','[1,2]','[2,3,4]','[1,2,3]'], answer:'[2,3]', hint:'Python slice from index 1 up to 3 (not including 3).', difficulty:'Medium', points:2, time:45},
  // 38
  {code:'int a=2,b=3;\nprintf("%d",a*b);', task:'Predict the output', choices:['6','5','23','Error'], answer:'6', hint:'Multiply a and b.', difficulty:'Easy', points:1, time:30},
  // 39
  {code:'x=10\ny=3\nprint(x//y)', task:'Predict the output', choices:['3','3.333','4','Error'], answer:'3', hint:'Integer division.', difficulty:'Medium', points:2, time:45},
  // 40
  {code:'int arr[5]={1,2,3,4,5};\nprintf("%d", arr[4]);', task:'Predict the output', choices:['5','4','1','Error'], answer:'5', hint:'Indexing starts at 0.', difficulty:'Easy', points:1, time:30},

  // 41
  {code:'def square(x):\n    return x**2\nprint(square(4))', task:'Predict the output', choices:['16','8','4','Error'], answer:'16', hint:'4 squared is 16.', difficulty:'Easy', points:1, time:30},
  // 42
  {code:'for(int i=1;i<=3;i++){\n    printf("%d", i*i);\n}', task:'Predict the output', choices:['149','123','149','Error'], answer:'149', hint:'Squares of 1,2,3', difficulty:'Medium', points:2, time:45},
  // 43
  {code:'x=[1,2,3]\nprint(x[0]+x[2])', task:'Predict the output', choices:['4','3','1','5'], answer:'4', hint:'Sum first and last element.', difficulty:'Easy', points:1, time:30},
  // 44
  {code:'int a=5,b=2;\nif(a%b==0)\n    printf("Divisible");\nelse\n    printf("Not divisible");', task:'Predict the output', choices:['Not divisible','Divisible','Error','2'], answer:'Not divisible', hint:'5 mod 2 is 1.', difficulty:'Medium', points:2, time:45},
  // 45
  {code:'def hello():\n    return "Hi"\nprint(hello())', task:'Predict the output', choices:['Hi','hello','Error','Nothing'], answer:'Hi', hint:'Function returns "Hi".', difficulty:'Easy', points:1, time:30},
  // 46
  {code:'int x=0;\nwhile(x<3){\n    x++;\n    printf("%d",x);\n}', task:'Predict the output', choices:['123','012','0 1 2','Error'], answer:'123', hint:'Increment happens before print.', difficulty:'Easy', points:1, time:30},
  // 47
  {code:'numbers = [1,2,3]\nprint(numbers[-1])', task:'Predict the output', choices:['3','1','Error','2'], answer:'3', hint:'Python negative index counts from the end.', difficulty:'Medium', points:2, time:45},
  // 48
  {code:'int a=0;\nfor(int i=0;i<5;i++){\n    a+=i;\n}\nprintf("%d",a);', task:'Predict the output', choices:['10','15','5','0'], answer:'10', hint:'Sum of 0+1+2+3+4', difficulty:'Medium', points:2, time:45},
  // 49
  {code:'def divide(a,b):\n    return a/b\nprint(divide(10,0))', task:'Predict the output', choices:['Error','0','Infinity','10'], answer:'Error', hint:'Division by zero.', difficulty:'Hard', points:3, time:60},
  // 50
  {code:'int arr[3]={1,2,3};\nfor(int i=0;i<3;i++){\n    printf("%d", arr[i]);\n}', task:'Predict the output', choices:['123','1 2 3','Error','321'], answer:'123', hint:'Print array elements.', difficulty:'Easy', points:1, time:30}
];

function startGame() {
  // ซ่อนกติกา
  document.getElementById('rules').style.display = 'none';
  // แสดงเกม
  document.getElementById('game').style.display = 'block';

  // รีเซ็ตตัวแปร
  hearts = 3;
  score = 0;
  hintFree = 1;

  document.getElementById('hearts').textContent = '❤❤❤';
  document.getElementById('score').textContent = score;
  document.getElementById('hintFree').textContent = hintFree;
  document.getElementById('gameOver').textContent = '';
  document.getElementById('gameClear').textContent = '';
  document.getElementById('hintArea').textContent = '';

  nextQuestion();
}

function getRandomQuestionWeighted() {
  const rand = Math.random();
  let candidates;
  if(rand < 0.5) candidates = questions.filter(q => q.difficulty === 'Easy');
  else if(rand < 0.8) candidates = questions.filter(q => q.difficulty === 'Medium');
  else candidates = questions.filter(q => q.difficulty === 'Hard');
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function nextQuestion() {
  document.getElementById('hintArea').textContent = '';
  document.getElementById('hintBtn').disabled = false;
  document.getElementById('choices').innerHTML = '';

  if(score >= 10){
    // เกมชนะ
    document.getElementById('gameClear').textContent = '🎉 Game clear! Congratulations! Choose your reward!';
    document.getElementById('codeArea').textContent = '';
    document.getElementById('choices').innerHTML = '';
    document.getElementById('difficultyLevel').textContent = '';
    document.getElementById('hintBtn').style.display = 'none';
    return;
  }
  if(hearts <= 0){
    // เกมแพ้
    document.getElementById('gameOver').textContent = '💀 Game Over! Final Score: ' + score;
    document.getElementById('codeArea').textContent = '';
    document.getElementById('choices').innerHTML = '';
    document.getElementById('difficultyLevel').textContent = '';
    document.getElementById('hintBtn').style.display = 'none';
    return;
  }

  currentQuestion = getRandomQuestionWeighted();

  // แสดงระดับความยาก + task
  document.getElementById('difficultyLevel').textContent = 
      'Levels: ' + currentQuestion.difficulty + ' | ' + currentQuestion.task;

  document.getElementById('codeArea').textContent = currentQuestion.code;

  currentQuestion.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.classList.add('choice-btn');
    btn.onclick = () => checkAnswer(choice, btn);
    document.getElementById('choices').appendChild(btn);
  });

  // ตั้งเวลา
  timeLeft = currentQuestion.time;
  document.getElementById('timer').textContent = timeLeft + ' seconds';
  clearInterval(timer);
  timer = setInterval(()=>{
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft + ' seconds';
    if(timeLeft <=0){
      clearInterval(timer);
      loseHeart('Time is up!');
    }
  },1000);
}

function checkAnswer(choice, btn){
  clearInterval(timer);
  if(choice === currentQuestion.answer){
    score += currentQuestion.points;
    document.getElementById('score').textContent = score;
    nextQuestion();
  }else{
    btn.style.background = '#800';
    loseHeart('Wrong answer!');
  }
}

function loseHeart(msg){
  hearts--;
  let heartDisplay = '';
  for(let i=0;i<hearts;i++) heartDisplay+='❤';
  document.getElementById('hearts').textContent = heartDisplay;
  document.getElementById('hintArea').textContent = msg;
  if(hearts <=0){
    document.getElementById('gameOver').textContent = '💀 Game Over! Final Score: ' + score;
  }else{
    setTimeout(nextQuestion,1000);
  }
}

function useHint(){
  if(hintFree > 0){
    document.getElementById('hintArea').textContent = '💡 Hint (Free): ' + currentQuestion.hint;
    hintFree--;
    document.getElementById('hintFree').textContent = hintFree;
    document.getElementById('hintBtn').disabled = true;
  } else {
    if(score >= 0.5){
      score -= 0.5;
      document.getElementById('score').textContent = score;
      document.getElementById('hintArea').textContent = '💡 Hint (Cost 0.5 points): ' + currentQuestion.hint;
      document.getElementById('hintBtn').disabled = true;
    } else {
      document.getElementById('hintArea').textContent = '❌ Not enough points for Hint!';
    }
  }
}