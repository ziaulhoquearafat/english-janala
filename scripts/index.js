const createElements = arr => {
  const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
  return htmlElements.join(' ');
};

const manageSpinner = status => {
  if (status == true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else {
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
};

const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => displayLessons(json.data));
};

const removeAactive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  // console.log(lessonButtons);
  lessonButtons.forEach(btn => {
    btn.classList.remove('active');
  });
};

const loadLevelWord = id => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeAactive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add('active');
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async id => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }

const displayWordDetails = word => {
  console.log(word);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
  
        <div>
          <h2 class="text-2xl font-bold">${
            word.word
          } (<i class="fa-solid fa-microphone-lines"></i> : ${
    word.pronunciation
  })</h2>
        </div>
        <div>
          <h2 class="font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2 class="font-bold">Synonym</h2>
         <div class="">${createElements(word.synonyms)}</div>
        </div>
  
  `;
  document.getElementById('word_modal').showModal();
};

const displayLevelWord = words => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  if (words.length == 0) {
    wordContainer.innerHTML = `
    
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">
        <img src="./assets/alert-error.png" alt="" class="mx-auto">
      <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h3 class="font-bangla font-semibold text-4xl">নেক্সট Lesson এ যান</h3>
    </div>
    
    `;
    manageSpinner(false);
    return;
  }

  words.forEach(word => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="bg-white py-10 px-5 rounded-lg shadow-sm text-center space-y-4">
      <h3 class="text-3xl font-bold">${
        word.word ? word.word : 'শব্দ পাওয়া যায়নি'
      }</h3>
      <p class="font-medium leading-6">Meaning /Pronunciation</p>
      <div class="font-semibold text-3xl text-[#18181B] font-bangla">${
        word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'
      } / ${
      word.pronunciation ? word.pronunciation : 'pronunciation পাওয়া যায়নি'
    }</div>
      <div class="flex items-center justify-between">
        <button onclick="loadWordDetail(${
          word.id
        })" class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1a91ff1a] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLessons = lessons => {
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';

  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
   
        <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn">
           <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
   `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
