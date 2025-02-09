function initializeLocalStorage() {
	if (!localStorage.getItem("userDiary")) {
		const data = {
			dataCount: 0,
			diaries: [],
		};
		localStorage.setItem("userDiary", JSON.stringify(data));
	}
}

async function loadData() {
	try {
		initializeLocalStorage();
		const data = JSON.parse(localStorage.getItem("userDiary"));
		createCards(data.diaries);
		localStorage.setItem("userDiary", JSON.stringify(data));
	} catch (error) {
		console.error("Error loading data:", error);
	}
}

function createCards(data) {
	const cardContainer = document.querySelector(".card-container");

	data.forEach(({ id, title, content, created }) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");

		const frontFace = document.createElement("div");
		frontFace.classList.add("card", "front-face");

		const cardTitle = document.createElement("h3");
		cardTitle.classList.add("card-title");
		cardTitle.textContent = title;

		frontFace.appendChild(cardTitle);

		const backFace = document.createElement("div");
		backFace.classList.add("card", "back-face");

		const cardContent = document.createElement("p");
		cardContent.classList.add("card-content");
		if (content.length > 130) {
			content = content.substring(0, 130) + "...";
		}
		cardContent.textContent = content;
		backFace.appendChild(cardContent);

		const cardFooter = document.createElement("div");
		cardFooter.classList.add("card-footer");

		const createdDate = document.createElement("span");
		createdDate.textContent = created;

		cardFooter.appendChild(createdDate);

		const actionBtns = document.createElement("div");
		actionBtns.classList.add("action-btn");

		const editLink = document.createElement("a");
		editLink.href = `edit.html?id=${id}`;
		const editIcon = document.createElement("i");
		editIcon.classList.add("bi", "bi-pencil-square");
		editLink.appendChild(editIcon);

		const deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.setAttribute("id", `delete-${id}`);
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add("bi", "bi-x-square");
		deleteLink.appendChild(deleteIcon);

		actionBtns.appendChild(editLink);
		actionBtns.appendChild(deleteLink);

		cardFooter.appendChild(actionBtns);

		backFace.appendChild(cardFooter);

		wrapper.appendChild(frontFace);
		wrapper.appendChild(backFace);

		cardContainer.appendChild(wrapper);

		wrapper.addEventListener("click", (e) => {
			e.preventDefault();
			window.location.href = `html/detail.html?id=${id}`;
		});

		deleteLink.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			deleteDiary(id);
		});
	});
}

function deleteDiary(id) {
	let data = JSON.parse(localStorage.getItem("userDiary"));

	data.diaries = data.diaries.filter((diary) => diary.id !== id);

	localStorage.setItem("userDiary", JSON.stringify(data));

	document.querySelector(".card-container").innerHTML = "";
	loadData();
}

loadData();
