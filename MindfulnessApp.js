export default function MindfulnessApp() {
  const container = document.createElement("div");
  container.style.maxWidth = "600px";
  container.style.margin = "2rem auto";
  container.style.padding = "1rem";
  container.style.fontFamily = "sans-serif";

  const title = document.createElement("h1");
  title.textContent = "Day 1: Body Scan Meditation";
  title.style.fontSize = "1.5rem";
  container.appendChild(title);

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = "audio/body_scan_day1.mp3"; // Add your file to /public/audio/
  container.appendChild(audio);

  const instructions = document.createElement("p");
  instructions.textContent = "Please listen to the 10-minute guided meditation.";
  container.appendChild(instructions);

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Write your journal entry here...";
  textarea.style.width = "100%";
  textarea.style.marginTop = "1rem";
  textarea.style.height = "100px";
  container.appendChild(textarea);

  const surveyLink = document.createElement("a");
  surveyLink.href = "https://your.qualtrics.survey.link"; // Replace with your link
  surveyLink.target = "_blank";
  surveyLink.textContent = "Submit Daily Survey";
  surveyLink.style.display = "inline-block";
  surveyLink.style.marginTop = "1rem";
  surveyLink.style.color = "white";
  surveyLink.style.background = "blue";
  surveyLink.style.padding = "0.5rem 1rem";
  surveyLink.style.borderRadius = "5px";
  container.appendChild(surveyLink);

  return container;
}
