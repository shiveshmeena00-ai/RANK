const PASSWORD = "3453";

const nameInput = document.getElementById("nameInput");
const registerBtn = document.getElementById("registerBtn");
const rankList = document.getElementById("rankList");

const settingsBtn = document.getElementById("settingsBtn");
const adminOverlay = document.getElementById("adminOverlay");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const adminPanel = document.getElementById("adminPanel");

const editName = document.getElementById("editName");
const editRank = document.getElementById("editRank");
const changeRankBtn = document.getElementById("changeRankBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");
const resetBtn = document.getElementById("resetBtn");

let users = JSON.parse(localStorage.getItem("users")) || [];

function save() {
  localStorage.setItem("users", JSON.stringify(users));
}

function render() {
  rankList.innerHTML = "";
  users.sort((a, b) => a.rank - b.rank);

  users.forEach(u => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<span>#${u.rank}</span><span>${u.name}</span>`;
    rankList.appendChild(div);
  });
}

/* REGISTER (NO DUPLICATES) */
registerBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) return;

  if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
    alert("Name already exists");
    return;
  }

  users.push({ name, rank: users.length + 1 });
  nameInput.value = "";
  save();
  render();
};

/* ADMIN */
settingsBtn.onclick = () => {
  adminOverlay.style.display = "flex";
};

adminOverlay.onclick = (e) => {
  if (e.target === adminOverlay) adminOverlay.style.display = "none";
};

unlockBtn.onclick = () => {
  if (passwordInput.value === PASSWORD) {
    adminPanel.style.display = "block";
  } else {
    alert("Wrong password");
  }
};

changeRankBtn.onclick = () => {
  const user = users.find(
    u => u.name.toLowerCase() === editName.value.toLowerCase()
  );
  if (!user) return alert("User not found");

  user.rank = Number(editRank.value);
  save();
  render();
};

deleteUserBtn.onclick = () => {
  users = users.filter(
    u => u.name.toLowerCase() !== editName.value.toLowerCase()
  );
  users.forEach((u, i) => u.rank = i + 1);
  save();
  render();
};

resetBtn.onclick = () => {
  if (confirm("Reset everything?")) {
    users = [];
    save();
    render();
  }
};

render();