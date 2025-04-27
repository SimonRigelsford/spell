const wordLists = {
  "Summer 1 Week 1": [
    { word: "would", definition: "used to indicate a possible situation or action", examples: ["I ______ like to go to the park today.", "He said he ______ bring the book tomorrow."] },
    { word: "could", definition: "used to express possibility or ability in the past", examples: ["She ______ see the mountains from her window.", "We ______ have been there earlier."] },
    { word: "should", definition: "used to indicate obligation or duty", examples: ["You ______ brush your teeth twice a day.", "We ______ finish our homework before playing."] },
    { word: "because", definition: "for the reason that", examples: ["He stayed home ______ he was sick.", "They left early ______ the weather was bad."] },
    { word: "said", definition: "past tense of say", examples: ["She ______ she was tired.", "He ______ he liked chocolate."] },
    { word: "hear", definition: "perceive with the ear", examples: ["Can you ______ the music playing?", "I ______ a noise outside."] },
    { word: "here", definition: "in this place", examples: ["Come ______ and sit next to me.", "Your book is right ______."] },
    { word: "where", definition: "in or to what place", examples: ["Do you know ______ she went?", "Tell me ______ you are."] },
    { word: "were", definition: "past tense of are", examples: ["They ______ playing outside all afternoon.", "We ______ very tired after the trip."] },
    { word: "people", definition: "human beings in general", examples: ["There were many ______ at the concert.", "The ______ in the village were friendly."] },
    { word: "night", definition: "the time of darkness between sunset and sunrise", examples: ["We stayed up late into the ______.", "It was a cold ______."] },
    { word: "father", definition: "a male parent", examples: ["Her ______ made breakfast every morning.", "My ______ is reading a book."] },
    { word: "mother", definition: "a female parent", examples: ["His ______ read him a story.", "Her ______ works at the hospital."] },
    { word: "beautiful", definition: "pleasing the senses or mind aesthetically", examples: ["The ______ sunset lit up the sky.", "It was a ______ dress."] },
    { word: "water", definition: "a clear liquid essential for life", examples: ["Drink plenty of ______ every day.", "The glass was full of ______."] },
    { word: "friend", definition: "a person with whom one has a bond of mutual affection", examples: ["My best ______ and I went to the beach.", "He is a good ______."] },
    { word: "knight", definition: "a man awarded a non-hereditary title of honour", examples: ["The ______ rode a horse in shining armour.", "He was made a ______ by the Queen."] },
    { word: "children", definition: "young human beings", examples: ["The ______ played in the park all afternoon.", "Many ______ enjoy reading stories."] }
  ],
  "Spring 2 Week 6": [
    { word: "purple", definition: "a colour between blue and red", examples: ["She wore a ______ dress.", "The flower was a bright shade of ______."] },
    { word: "answer", definition: "a response to a question", examples: ["Please write your ______ clearly.", "He gave the wrong ______."] },
    { word: "decision", definition: "a choice made after thinking", examples: ["Making a ______ can be difficult.", "She made the ______ to stay home."] },
    { word: "completion", definition: "the act of finishing something", examples: ["The ______ of the project took two weeks.", "Upon ______, we celebrated."] },
    { word: "invention", definition: "something created for the first time", examples: ["The telephone was a great ______.", "His ______ changed the world."] },
    { word: "eighty", definition: "the number 80", examples: ["There are ______ students in the class.", "The cake was for Grandma's ______ birthday."] },
    { word: "believe", definition: "to accept as true", examples: ["I ______ you can do it.", "Do you ______ in magic?"] },
    { word: "collision", definition: "an instance of two objects hitting each other", examples: ["The cars had a ______.", "There was a loud ______."] },
    { word: "confession", definition: "an admission of wrongdoing", examples: ["He made a ______ about the broken window.", "Her ______ surprised everyone."] },
    { word: "expansion", definition: "the act of becoming larger", examples: ["The ______ of the city continued.", "They planned the ______ of their home."] },
    { word: "turquoise", definition: "a blue-green colour", examples: ["She painted her room ______.", "The ocean looked ______."] },
    { word: "calendar", definition: "a chart showing days, weeks, and months", examples: ["Mark the date on your ______.", "The ______ is hanging on the wall."] },
    { word: "television", definition: "a device for watching programmes", examples: ["We watched the news on ______.", "She turned off the ______ before bed."] },
    { word: "action", definition: "the process of doing something", examples: ["Quick ______ saved the day.", "He took ______ immediately."] },
    { word: "magician", definition: "a person who performs magic tricks", examples: ["The ______ pulled a rabbit from the hat.", "Everyone clapped for the ______."] },
    { word: "mystery", definition: "something difficult to explain or understand", examples: ["The book was a thrilling ______.", "Solving the ______ took weeks."] },
    { word: "typical", definition: "usual or expected", examples: ["It was a ______ rainy day.", "She gave a ______ answer."] },
    { word: "gymnast", definition: "a person trained in gymnastics", examples: ["The ______ performed a flip.", "She is a talented ______."] }
  ]
};
let currentList = null;
let quizWords = [];
let wrongWords = [];
let round = 1;
let currentIndex = 0;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-GB';
  window.speechSynthesis.speak(utterance);
}

function goHome() {
  document.getElementById('root').innerHTML = `
    <h1>Choose a List</h1>
    <button onclick="selectList('Summer 1 Week 1')">Summer 1 Week 1</button>
    <button onclick="selectList('Spring 2 Week 6')">Spring 2 Week 6</button>
    <div id="content"></div>
  `;
}

function selectList(listName) {
  currentList = listName;
  document.getElementById('root').innerHTML = `
    <h1>${listName}</h1>
    <button onclick="startQuiz()">Start Quiz</button>
    <button onclick="viewWords()">View Words</button>
    <button onclick="goHome()">Back</button>
    <div id="content"></div>
  `;
}

function viewWords() {
  const words = wordLists[currentList];
  document.getElementById('content').innerHTML = `
    <h2>${currentList} - Words</h2>
    ${words.map(w => `
      <div class="card">
        <h3>${w.word}</h3>
        <p><strong>${w.definition}</strong></p>
        ${w.examples.map(e => `<div><em>${e}</em></div>`).join('')}
      </div>
    `).join('')}
    <button onclick="goHome()">Back</button>
  `;
}

function startQuiz() {
  quizWords = [...wordLists[currentList]];
  wrongWords = [];
  round = 1;
  currentIndex = 0;
  showQuiz();
}
function showQuiz() {
  if (currentIndex >= quizWords.length) {
    if (wrongWords.length) {
      quizWords = [...wrongWords];
      wrongWords = [];
      round++;
      currentIndex = 0;
      document.getElementById('content').innerHTML = `<h2>Round ${round} begins!</h2><button onclick="showQuiz()">Start!</button>`;
    } else {
      document.getElementById('content').innerHTML = `<h2>🎉 Congratulations! You completed the test!</h2><button onclick="goHome()">Home</button>`;
    }
    return;
  }

  const word = quizWords[currentIndex];
  document.getElementById('content').innerHTML = `
    <h2>${currentList} - Round ${round}</h2>
    <div class="card">
      <p><strong>${word.definition}</strong></p>
      ${word.examples.map(e => `<div><em>${e}</em></div>`).join('')}
      <br>
      <button onclick="speak('${word.word}')">Hear Word</button>
      <br><br>
      <input id="userInput" type="text" placeholder="Type the word" onkeydown="if(event.key==='Enter') checkAnswer()">
      <div id="message" style="margin-top:10px; font-weight:bold;"></div>
      <br>
      <button onclick="checkAnswer()">Check</button>
    </div>
  `;

  document.getElementById('userInput').focus(); // Make sure typing is automatic!
  speak(word.word);
}

function checkAnswer() {
  const input = document.getElementById('userInput').value.trim().toLowerCase();
  const correct = quizWords[currentIndex].word.toLowerCase();
  const messageDiv = document.getElementById('message');
  
  if (input === correct) {
    messageDiv.textContent = "✅ Correct!";
    currentIndex++;
    setTimeout(showQuiz, 1000);
  } else {
    messageDiv.textContent = `❌ Try again! Correct spelling was: ${quizWords[currentIndex].word}`;
    if (!wrongWords.includes(quizWords[currentIndex])) {
      wrongWords.push(quizWords[currentIndex]);
    }
    currentIndex++;
    setTimeout(showQuiz, 2000);
  }
}

// Start the app!
goHome();
