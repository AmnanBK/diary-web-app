const addBtn = document.querySelector("#btn-add");
const cancelBtn = document.querySelector("#btn-cancel");

const urlParams = new URLSearchParams(window.location.search);
const diaryId = urlParams.get("id");

let currentDiary = null;
if (diaryId) {
	const data = JSON.parse(localStorage.getItem("userDiary"));
	currentDiary = data.diaries.find((diary) => diary.id === parseInt(diaryId));

	if (currentDiary) {
		document.querySelector("#title").value = currentDiary.title;
		document.querySelector("#content").value = currentDiary.content;
		addBtn.textContent = "Update Diary";
	} else {
		console.error("Diary not found.");
	}
}

addBtn.addEventListener("click", () => {
	const title = document.querySelector("#title").value;
	const content = document.querySelector("#content").value;

	const data = JSON.parse(localStorage.getItem("userDiary"));

	if (diaryId) {
		const diaryIndex = data.diaries.findIndex(
			(diary) => diary.id === parseInt(diaryId)
		);
		if (diaryIndex > -1) {
			data.diaries[diaryIndex] = {
				id: diaryId,
				title: title,
				content: content,
				created: new Date().toLocaleDateString(),
			};
		}
	} else {
		data.diaries.push({
			id: data.dataCount + 1,
			title: title,
			content: content,
			created: new Date().toLocaleDateString(),
		});
		data.dataCount++;
	}

	localStorage.setItem("userDiary", JSON.stringify(data));
	window.location.href = "../index.html";
});

cancelBtn.addEventListener("click", () => {
	window.location.href = "../index.html";
});
