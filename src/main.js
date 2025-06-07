import "./styles.css";

document.addEventListener('touchend', () => {
  const sel = window.getSelection();
  if (!sel.isCollapsed) {
    const start = sel.anchorOffset;
    const end = sel.focusOffset;
    const text = sel.toString();
    console.log(`Mobile select from ${start} to ${end}: "${text}"`);
  }
});



const schoolDays = [0, 2];
const today = new Date();
const year = today.getFullYear();
const endDate = new Date(year, 11, 31);

let total = 0;
let remaining = 0;
let nextDate = null;

for (let d = new Date(year, 0, 1); d <= endDate; d.setDate(d.getDate() + 1)) {
  if (schoolDays.includes(d.getDay())) {
    total++;
    if (d >= today) {
      remaining++;
      if (!nextDate) nextDate = new Date(d);
    }
  }
}

const timeDifference = nextDate - today;
const hoursLeft = timeDifference / (1000 * 3600);

const now = new Date();
const nowGMT7 = new Date(
  now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
);
const isToday = nextDate.toDateString() === nowGMT7.toDateString();
const hourInGMT7 = nowGMT7.getHours();

let timeLeftStr;
if (isToday && hourInGMT7 >= 8 && hourInGMT7 < 14) {
  timeLeftStr = `today from 08:00 to 14:00 (GMT+7)`;
} else if (hoursLeft < 24) {
  const hours = hoursLeft.toFixed(1);
  timeLeftStr = `or in ${hours} hour${hours == 1 ? "" : "s"}`;
} else {
  const days = (hoursLeft / 24).toFixed(2);
  timeLeftStr = `or in ${days} day${days == 1 ? "" : "s"}`;
}

const sentence = `My school days are every Tuesday and Sunday, so there are ${remaining}/${total} school days left. The next school day is ${nextDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}, ${timeLeftStr}.`;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("schoolStatus").textContent = sentence;
  console.timeEnd("blockingCalc");
});

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
