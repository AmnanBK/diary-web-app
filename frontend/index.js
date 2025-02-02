async function loadData() {
	try {
		const response = await fetch("data.json");
		const data = await response.json();
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
		editLink.href = "#";
		const editIcon = document.createElement("i");
		editIcon.classList.add("bi", "bi-pencil-square");
		editLink.appendChild(editIcon);

		const deleteLink = document.createElement("a");
		deleteLink.href = "#";
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
	});
}

loadData();
