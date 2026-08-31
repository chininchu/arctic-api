/*  =====================
  Footer
  ====================== */
const createFooter = document.createElement("footer")
createFooter.style.backgroundColor = "white"
createFooter.style.marginBottom = "auto"
createFooter.style.textAlign = "center"
document.body.appendChild(createFooter)

const today = new Date()
const thisYear = today.getFullYear()

const footer = document.querySelector("footer")

const copyright = document.createElement("p")
copyright.textContent = `\u00A9 Maria Fernanda Arredondo Garcia ${thisYear}`
footer.appendChild(copyright)

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
]
const skillsSection = document.querySelector("#Skills")

const skillsList = skillsSection.querySelector("ul")

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li")
  skill.innerText = skills[i]
  skillsList.appendChild(skill)
}

/*  =====================
  Message Form Submit
  ====================== */
const messageForm = document.querySelector('form[name="leave_message"]')

messageForm.addEventListener("submit", function (event) {
  event.preventDefault()
  const uName = event.target.usersName.value
  const uEmail = event.target.usersEmail.value
  const uMessage = event.target.usersMessage.value
  console.log(uName, uEmail, uMessage)

  const messageSection = document.querySelector("#messages")
  const messageList = messageSection.querySelector("ul")
  const newMessage = document.createElement("li")

  newMessage.innerHTML = `<a href="mailto:${uEmail}">${uName}</a> <span><br/>${uMessage}</span>`

  const removeButton = document.createElement("button")
  removeButton.innerText = "remove"
  removeButton.type = "button"

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode
    entry.remove()
  })

  newMessage.appendChild(removeButton)
  messageList.appendChild(newMessage)

  messageForm.reset()
})
