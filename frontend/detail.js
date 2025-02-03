const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const data = JSON.parse(localStorage.getItem("userDiary")).diaries;

const diary = data.find((d) => d.id == id);
console.log(diary);

const title = diary.title;
document.title = title;

const titleContainer = document.querySelector(".title-container");
const contentContainer = document.querySelector(".content-container");
const diaryTittle = document.createElement("h1");
diaryTittle.textContent = title;
diaryTittle.classList.add("main-title");
titleContainer.appendChild(diaryTittle);
const diaryContent = document.createElement("p");
diaryContent.innerHTML = diary.content.replace(/\n/g, "<br>");
contentContainer.appendChild(diaryContent);
