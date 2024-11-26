const SERVER_URL = "http://0.0.0.0:5000"

async function fetchTabs() {
    const response = await fetch(`${SERVER_URL}/load-tabs`);
    if (response.ok) {
        const tabs = await response.json();
        const savedTabs = JSON.parse(localStorage.getItem('tabs'));
        if (JSON.stringify(tabs) !== JSON.stringify(savedTabs)) {
            renderTabs(tabs);
            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
    } else {
        alert("Не вдалося завантажити Tabs.");
    }
}

function renderTabs(tabs) {
    const tabsContainer = document.getElementById("tabs");
    tabsContainer.innerHTML = ""; // Очищаємо контейнер

    // Створюємо контейнер для кнопок
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "tabs-buttons";

    // Створюємо контейнер для контенту
    const contentContainer = document.createElement("div");
    contentContainer.className = "tabs-content";

    tabs.forEach((tab, index) => {
        // Кнопка
        const button = document.createElement("button");
        button.innerText = tab.title;
        button.onclick = () => setActiveTab(index);

        // Додаємо кнопку до контейнера
        buttonsContainer.appendChild(button);

        // Контент
        const content = document.createElement("div");
        content.className = "tab-content";
        content.id = `tab-content-${index}`;
        content.innerText = tab.content;

        // Додаємо контент до контейнера
        contentContainer.appendChild(content);
    });

    // Додаємо кнопки та контент до основного контейнера
    tabsContainer.appendChild(buttonsContainer);
    tabsContainer.appendChild(contentContainer);
}

// Функція для відображення активної вкладки
function setActiveTab(index) {
    const activeContent = document.getElementById(`tab-content-${index}`);
    const isActive = activeContent.style.display === "block";

    // Якщо контент вже відображається, приховуємо його
    if (isActive) {
        activeContent.style.display = "none";
    } else {
        // Приховуємо весь контент
        const contents = document.querySelectorAll(".tab-content");
        contents.forEach(content => content.style.display = "none");

        // Показуємо лише контент активної вкладки
        activeContent.style.display = "block";
    }

    // Оновлюємо стиль кнопок (активна/неактивна)
    const buttons = document.querySelectorAll(".tabs-buttons button");
    buttons.forEach((button, i) => {
        if (i === index) {
            button.classList.toggle("active");
        } else {
            button.classList.remove("active");
        }
    });
}

const savedTabs = localStorage.getItem('tabs');
if (savedTabs) {
    renderTabs(JSON.parse(savedTabs));
} else {
    fetchTabs();
}

setInterval(fetchTabs, 10000);