import "./styles.css";

function getVibe(hour) {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  if (hour >= 20 && hour < 23) return "night";
  return "late night";
}

function getGreeting(vibe) {
  return vibe === "late night" ? "You're up late!" : `Good ${vibe}!`;
}

function updateClock() {
  const userNow = new Date();
  const userHours = userNow.getHours();
  const userMinutes = userNow.getMinutes().toString().padStart(2, "0");
  const userSeconds = userNow.getSeconds().toString().padStart(2, "0");

  const dateStr = userNow.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("datetime").textContent =
    `${dateStr} — ${userHours}:${userMinutes}:${userSeconds}`;

  const userVibe = getVibe(userHours);
  document.getElementById("greeting").textContent = getGreeting(userVibe);

  const utc = userNow.getTime() + userNow.getTimezoneOffset() * 60000;
  const gmt7 = new Date(utc + 7 * 3600000);
  const gmt7Hours = gmt7.getHours();
  const myVibe = getVibe(gmt7Hours);

  let compareMsg = "";
  if (userVibe !== myVibe) {
    compareMsg = `It's my ${myVibe} and it's your ${userVibe}.`;
  } else {
    compareMsg = `It's ${userVibe} for both of us. Sync'd up.`;
  }

  document.getElementById("compare").textContent = compareMsg;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tick() {
  while (true) {
    updateClock();

    const now = performance.now();

    const delay = 1000 - (now % 1000);
    await sleep(delay);
  }
}

tick();

document.addEventListener("keydown", async function (e) {
  await new Promise((resolve) => setTimeout(resolve, 0));

  if (
    e.key === "F12" ||
    (e.ctrlKey &&
      e.shiftKey &&
      (e.key === "I" || e.key === "J" || e.key === "C")) ||
    (e.ctrlKey && e.key === "U")
  ) {
    console.log(
      "%cmeow <3 stop peeking at my ass",
      "color: hotpink; font-size: 20px; font-weight: bold; background: black; padding: 5px; border-radius: 5px;",
    );
  }
});
