import "./styles.css";

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
