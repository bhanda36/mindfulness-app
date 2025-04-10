export function renderHomePage() {
  const container = document.createElement("div");
  container.className = "home-container";

  const totalCompleted = Array.from({ length: 14 }, (_, i) => {
    const status = JSON.parse(localStorage.getItem(`day${i + 1}`)) || {};
    return status.survey ? 1 : 0;
  }).reduce((a, b) => a + b, 0);

  const progressPercent = Math.round((totalCompleted / 14) * 100);

  container.innerHTML = `
    <h1>Welcome, Parents & Caregivers!</h1>
    <p>Thank you for joining this two-week mindfulness intervention study. You will have a guided mindfulness audio each day for 14 days. Please start by completing the Pre-Intervention Survey.</p>

    <ul>
      <li><a href="https://your-pre-intervention-link.com" target="_blank">📋 Pre-Intervention Survey</a></li>
      <li><a href="https://your-post-intervention-link.com" target="_blank">📝 Post-Intervention Survey</a></li>
      <li><a href="https://your-followup-link.com" target="_blank">🔄 Follow-Up Survey (2 Weeks Later)</a></li>
    </ul>

    <h2>Your 14-Day Progress</h2>
    <div style="margin-bottom: 1rem;">
      <div style="background: #eee; height: 20px; border-radius: 10px; overflow: hidden;">
        <div style="width: ${progressPercent}%; background: #4caf50; height: 100%; text-align: center; color: white; font-size: 0.8rem;">${progressPercent}%</div>
      </div>
    </div>

    <div id="calendar" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 1rem;"></div>
  `;

  const calendar = container.querySelector("#calendar");
  let lastCompletedDay = 0;

  for (let i = 1; i <= 14; i++) {
    const status = JSON.parse(localStorage.getItem(`day${i}`)) || {};
    if (status.survey) lastCompletedDay = i;
  }

  for (let i = 1; i <= 14; i++) {
    const status = JSON.parse(localStorage.getItem(`day${i}`)) || {};
    const button = document.createElement("a");
    const isUnlocked = i === 1 || localStorage.getItem(`day${i - 1}`);

    button.href = isUnlocked ? `?day=${i}` : "#";
    button.textContent = `Day ${i} ${status.survey ? "✅" : ""}`;
    button.style.padding = "10px";
    button.style.background = isUnlocked ? (status.survey ? "#cce5ff" : "#eee") : "#ddd";
    button.style.border = "1px solid #ccc";
    button.style.textAlign = "center";
    button.style.textDecoration = isUnlocked ? "none" : "line-through";
    button.style.color = "#333";
    button.style.borderRadius = "5px";
    button.style.pointerEvents = isUnlocked ? "auto" : "none";
    calendar.appendChild(button);
  }

  return container;
}

export function renderDayPage(day) {
  const container = document.createElement("div");
  container.style.maxWidth = "600px";
  container.style.margin = "2rem auto";
  container.style.padding = "1rem";
  container.style.fontFamily = "sans-serif";

  const moduleType = day <= 7 ? "Body Scan Meditation" : "Mindful Breathing";
  const audioFile = day <= 7 ? `audio/body_scan_day${day}.mp3` : `audio/breathing_day${day}.mp3`;

  const title = document.createElement("h1");
  title.textContent = `Day ${day}: ${moduleType}`;
  title.style.fontSize = "1.5rem";
  container.appendChild(title);

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.src = audioFile;
  container.appendChild(audio);

  const instructions = document.createElement("p");
  instructions.textContent = "Please listen to the 10-minute guided audio.";
  container.appendChild(instructions);

  const surveyLink = document.createElement("a");
  surveyLink.href = "https://your.qualtrics.daily-survey.link";
  surveyLink.target = "_blank";
  surveyLink.textContent = "Submit Daily Survey";
  surveyLink.style.display = "inline-block";
  surveyLink.style.marginTop = "1rem";
  surveyLink.style.color = "white";
  surveyLink.style.background = "blue";
  surveyLink.style.padding = "0.5rem 1rem";
  surveyLink.style.borderRadius = "5px";

  surveyLink.onclick = () => {
    const data = { survey: true };
    localStorage.setItem(`day${day}`, JSON.stringify(data));
    alert("🎉 Congratulations on completing today’s mindfulness session and survey!");
  };

  container.appendChild(surveyLink);

  const backLink = document.createElement("a");
  backLink.href = "./";
  backLink.textContent = "← Back to Home";
  backLink.style.display = "block";
  backLink.style.marginTop = "2rem";
  container.appendChild(backLink);

  return container;
}
