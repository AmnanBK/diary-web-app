const addBtn = document.querySelector("#btn-add");
const cancelBtn = document.querySelector("#btn-cancel");

addBtn.addEventListener("click", () => {
	const title = document.querySelector("#title").value;
	const content = document.querySelector("#content").value;

	const data = JSON.parse(localStorage.getItem("userDiary"));
	data.diaries.push({
		id: data.dataCount + 1,
		title: title,
		content: content,
		created: new Date().toLocaleDateString(),
	});
	data.dataCount++;
	localStorage.setItem("userDiary", JSON.stringify(data));
	console.log(data);
	window.location.href = "index.html";
});

cancelBtn.addEventListener("click", () => {
	window.location.href = "index.html";
});
