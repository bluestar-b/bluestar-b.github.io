import "./styles.css";

const schoolDays = [0, 3]; // Sunday, Wed

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const now = new Date();
const nowGMT7 = new Date(
  now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
);
const todayDateOnly = stripTime(nowGMT7);
const year = nowGMT7.getFullYear();

const startDate = new Date(
  new Date(`${year}-01-01T00:00:00`).toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  }),
);
const endDate = new Date(
  new Date(`${year}-12-31T00:00:00`).toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  }),
);

let total = 0;
let remaining = 0;
let nextDate = null;

for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
  if (schoolDays.includes(d.getDay())) {
    total++;
    if (stripTime(d) >= todayDateOnly) {
      remaining++;
      if (!nextDate) nextDate = new Date(d);
    }
  }
}

// Set school start time on nextDate to 08:00 AM GMT+7
const schoolStart = new Date(nextDate);
schoolStart.setHours(8, 0, 0, 0);

const timeDifference = schoolStart - nowGMT7;
const hoursLeft = timeDifference / (1000 * 3600);
const hourInGMT7 = nowGMT7.getHours();

let timeLeftStr;
if (
  stripTime(nextDate).getTime() === todayDateOnly.getTime() &&
  hourInGMT7 >= 8 &&
  hourInGMT7 < 14
) {
  timeLeftStr = `today from 08:00 to 14:00 (GMT+7)`;
} else if (hoursLeft < 0) {
  timeLeftStr = `school already ended today, waiting for next school day`;
} else if (hoursLeft < 24) {
  const hours = hoursLeft.toFixed(1);
  timeLeftStr = `${hours} hour${hours == 1 ? "" : "s"}`;
} else {
  const days = (hoursLeft / 24).toFixed(2);
  timeLeftStr = `${days} day${days == 1 ? "" : "s"}`;
}

const sentence = `My school days are every Wednesday and Sunday, so there are ${remaining}/${total} school days left. The next school day is ${nextDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}, ${timeLeftStr}.`;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("schoolStatus").textContent = sentence;
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
