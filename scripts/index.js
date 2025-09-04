const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data));
};

const loadLevelWord = id => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data));
};

const displayLevelWord = words => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  // id: 19;
  // level: 1;

  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="bg-white py-10 px-5 rounded-lg shadow-sm text-center space-y-4">
      <h3 class="text-3xl font-bold">${word.word}</h3>
      <p class="font-medium leading-6">Meaning /Pronunciation</p>
      <div class="font-semibold text-3xl text-[#18181B] font-bangla">${word.meaning} / ${word.pronunciation}</div>
      <div class="flex items-center justify-between">
        <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `;
    wordContainer.append(card);
  });
};

const displayLessons = lessons => {
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';

  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
   
        <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary">
           <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
   `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
