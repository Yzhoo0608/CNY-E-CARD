// script-ecard.js

// // CNY Fortune Floating Effect
const cnyEmojis = ['🏮', '🧨'];
const MAX_FORTUNES = 8; // maximum emojis on screen

function createFortune() {
  const existing = document.querySelectorAll('.fortune');
  if (existing.length >= MAX_FORTUNES) return; // stop if too many

  const fortune = document.createElement("div");
  fortune.classList.add("fortune");

  fortune.textContent = cnyEmojis[Math.floor(Math.random() * cnyEmojis.length)];
  fortune.style.left = `${Math.random() * 100}vw`;
  fortune.style.animationDuration = `${6 + Math.random() * 4}s`;
  fortune.style.fontSize = `${16 + Math.random() * 12}px`;

  document.body.appendChild(fortune);

  setTimeout(() => fortune.remove(), 9000);
}

// create fortune every 600ms (much calmer)
setInterval(createFortune, 600);

/*CNY Fireworks Effect */
const fireworkColors = [
  "#ff3b3b", // red
  "#ffd700", // gold
  "#ff8c00", // orange
  "#00e5ff", // cyan
  "#ff69b4"  // pink
];

function launchFireworks() {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.4; // upper screen only

  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "fw";

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.backgroundColor =
      fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;

    p.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 1000);
  }
}

/* Fireworks every 1.2 seconds (calm & festive) */
setInterval(launchFireworks, 1200);


// display Postcard Content
function displayPostcard() {
  const sender = document.getElementById("senderName").value;
  const receiver = document.getElementById("receiverName").value;
  const builtIn = document.getElementById("builtInMessage").value;
  const custom = document.getElementById("customMessage").value;

  // Prevent empty card
  if (!sender && !receiver && !custom) return;

  const overlay = document.getElementById("messageOverlay");

  overlay.textContent =
`🧧 To: ${receiver}
${builtIn}${custom ? '\n' + custom : ''}
✨ From: ${sender}`;

  overlay.style.display = "block";
}

// background music
function toggleMusic() {
  const player = document.getElementById("musicPlayer");
  player.paused ? player.play() : player.pause(); // to play and pause music
}

function enableEmojiPicker() {
            const emojiList = document.getElementById("emojiList");
            emojiList.style.display = (emojiList.style.display === "none" || emojiList.style.display === "") ? "flex" : "none";
        }

        function selectEmoji(emoji) {
            const messageInput = document.getElementById("customMessage");
            messageInput.value += " " + emoji;
        }

        function openAngpao() {
            const envelope = document.querySelector('.angpao');
            const messageCard = document.querySelector('.message-card');
            envelope.classList.add('open');
            messageCard.classList.add('visible');

            // Play background music when the envelope is opened
            const music = document.getElementById("backgroundMusic");
            if (music.paused) {
                music.play();
            }
        }


// show blessing when user clicked
function showBlessing(message) {
  alert(`✨ ${message} ✨`);
}

// shareable link for the user
document.addEventListener("DOMContentLoaded", function () {
  // generate buttons and the functions
  const shareBtn = document.getElementById("shareBtn");
  const generateBtn = document.querySelector("button[onclick='displayPostcard()']");

  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      // get user input values
      let senderName = document.getElementById("senderName").value;
      let receiverName = document.getElementById("receiverName").value;
      let builtInMessage = document.getElementById("builtInMessage").value;
      let customMessage = document.getElementById("customMessage").value;

      
    // Prevent sharing empty card
    if (!senderName && !receiverName && !customMessage) {
      alert("Please generate your e-card before sharing 🧧");
      return;
    }

      // encode the data to make sure it can work in a url link
      let encodedSender = encodeURIComponent(senderName);
      let encodedReceiver = encodeURIComponent(receiverName);
      let encodedBuiltIn = encodeURIComponent(builtInMessage);
      let encodedCustom = encodeURIComponent(customMessage);

      // get the current page link and and user input data to the link
      let currentURL = window.location.origin + window.location.pathname;
      let shareableLink = `${currentURL}?sender=${encodedSender}&receiver=${encodedReceiver}&builtIn=${encodedBuiltIn}&custom=${encodedCustom}`;

      // open the link in another new tab
      window.open(shareableLink, "_blank");

      // copy the link to the clipboard
      navigator.clipboard.writeText(shareableLink).then(() => {
        alert("Link copied! Share it with your receiver.");
      });
    });
  }

  // load the data from the url link
  let urlParams = new URLSearchParams(window.location.search);
  let senderName = urlParams.get("sender");
  let receiverName = urlParams.get("receiver");
  let builtInMessage = urlParams.get("builtIn");
  let customMessage = urlParams.get("custom");

  if (senderName || receiverName || builtInMessage || customMessage) {

  const overlay = document.getElementById("messageOverlay");

  overlay.textContent =
`🧧 To: ${receiverName || ""}
${builtInMessage || ""}${customMessage ? '\n' + customMessage : ""}
✨ From: ${senderName || ""}`;

  overlay.style.display = "block";

  // hide input form for receiver
  document.getElementById("senderName").style.display = "none";
  document.getElementById("receiverName").style.display = "none";
  document.getElementById("builtInMessage").style.display = "none";
  document.getElementById("customMessage").style.display = "none";

  if (generateBtn) generateBtn.style.display = "none";
  if (shareBtn) shareBtn.style.display = "none";
}
});

