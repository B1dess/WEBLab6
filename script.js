let tabs = [];
const SERVER_URL = "http://0.0.0.0:5000"

function generateTabs() {
    const tabCount = document.getElementById("tabCount").value;
    const tabsContainer = document.getElementById("tabsContainer");
    tabsContainer.innerHTML = "";
    tabs = [];

    for (let i = 1; i <= tabCount; i++) {
        const tab = document.createElement("div");
        tab.className = "tab";
        tab.innerHTML = `
            <label>Назва табу ${i}: </label>
            <input type="text" id="tabTitle${i}" placeholder="Введіть назву" required>
            <br>
            <label>Контент табу ${i}: </label>
            <textarea id="tabContent${i}" placeholder="Введіть контент" required></textarea>
        `;
        tabsContainer.appendChild(tab);
        tabs.push({ title: `Tab ${i}`, content: `Content ${i}` });
    }
}

async function saveTabs() {
    tabs = tabs.map((_, index) => ({
        title: document.getElementById(`tabTitle${index + 1}`).value,
        content: document.getElementById(`tabContent${index + 1}`).value,
    }));

    const response = await fetch(`${SERVER_URL}/save-tabs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tabs),
    });

    if (response.ok) {
        alert("Tabs збережено успішно!");
    } else {
        alert("Сталася помилка під час збереження.");
    }
}