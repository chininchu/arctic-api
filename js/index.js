/*  =====================
  Footer
  ====================== */
const createFooter = document.createElement("footer");
createFooter.style.backgroundColor = "white";
createFooter.style.marginBottom = "auto";
createFooter.style.textAlign = "center";
document.body.appendChild(createFooter);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.textContent = `\u00A9 Maria Fernanda Arredondo Garcia ${thisYear}`;
footer.appendChild(copyright);

/*  =====================
  List of Skills
  ====================== */
const skills = [
  "Krita",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe Indesign",
  "Maya",
  "JavaScript",
  "CSS",
  "HTML",
];
const skillsSection = document.querySelector("#Skills");

const skillsList = skillsSection.querySelector("ul");

for (const skillName of skills) {
  const skill = document.createElement("li");
  skill.innerText = skillName;
  skillsList.appendChild(skill);
}

/*  =====================
  Message Form Submit
  ====================== */
const messageForm = document.querySelector('form[name="leave_message"]');

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const uName = event.target.usersName.value;
  const uEmail = event.target.usersEmail.value;
  const uMessage = event.target.usersMessage.value;
  console.log(uName, uEmail, uMessage);

  const messageSection = document.querySelector("#messages");
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  const emailLink = document.createElement("a");
  emailLink.href = `mailto:${encodeURIComponent(uEmail)}`;
  emailLink.textContent = uName;

  const messageText = document.createElement("span");
  messageText.append(document.createElement("br"), uMessage);

  newMessage.append(emailLink, messageText);

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});

/*  =====================
  Fetch Request to Github
  ====================== */
try {
  const response = await fetch(
    "https://api.github.com/users/mariafarr002/repos",
  );
  if (!response.ok) {
    throw new Error("Request failed" + response.status);
  }
  const repoData = await response.json();
  console.log("repositories:", repoData);

  const projectSection = document.querySelector("#Projects");
  const projectList = projectSection.querySelector("ul");

  for (const repository of repoData) {
    const project = document.createElement("li");
    project.innerText = repository.name;
    projectList.appendChild(project);
  }
} catch (error) {
  console.error("Something went wrong...:", error);
}
