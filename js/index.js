/*  =====================
  Footer
  ====================== */
const createFooter = document.createElement("footer")
createFooter.style.backgroundColor = "white"
createFooter.style.textAlign = "center"
document.body.appendChild(createFooter)

const today = new Date()
const thisYear = today.getFullYear()

const footer = document.querySelector("footer")

const copyright = document.createElement("footer")
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

// adds ul so skillsList has something to select
const ul = document.createElement("ul")
skillsSection.appendChild(ul)

const skillsList = skillsSection.querySelector("ul")

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li")
  skill.innerText = skills[i]
  skillsList.appendChild(skill)
}
