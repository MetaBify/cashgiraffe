const LINKS = {
  ios: "https://taprain.com/api/stats/register-redirect?data=aHR0cHM6Ly9tb2IuZzJ0cmNrLmNvbS9jbGljaz9waWQ9MiZvZmZlcl9pZD0xMjA2NCZzdWIyPXU3MDE4NTMmc3ViNT1zMTY5MThiMDA4MTk4N2Y3YzgyNTA5NjhhMCZzdWI3PXJmbnVsbCZzdWI4PXJkbnVsbCZzdWIxNT0zZDhjNTI5OTFmZTMmczE9NjkxOGIwMDgxOTg3ZjdjODI1MDk2OGEw&userId=6918b0081987f7c8250968a0",
  android: "https://taprain.com/api/stats/register-redirect?data=aHR0cHM6Ly9tb2IuZzJ0cmNrLmNvbS9jbGljaz9waWQ9MiZvZmZlcl9pZD00MjAyJnN1YjI9dTcwMTg1MyZzdWI1PXMxNjkxOGIwMDgxOTg3ZjdjODI1MDk2OGEwJnN1Yjc9cmZudWxsJnN1Yjg9cmRudWxsJnN1YjE1PWYyMGQxN2ZiMjU1ZCZzMT02OTE4YjAwODE5ODdmN2M4MjUwOTY4YTA=&userId=6918b0081987f7c8250968a0",
};

const SCREEN_IMAGES = [
  {
    src: "./assets/rewards.webp",
    alt: "Choose PayPal or gift cards with your gems",
  },
  {
    src: "./assets/games.webp",
    alt: "Discover games that pay the most gems",
  },
  {
    src: "./assets/iamge2.webp",
    alt: "Track streaks and earn gem bonuses",
  },
  {
    src: "./assets/newimg.webp",
    alt: "Proof of cash outs and payouts",
  },
];

const storageKey = "cashgiraffe-platform";

const detectPlatform = () => {
  const cached = localStorage.getItem(storageKey);
  if (cached) {
    return cached;
  }

  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (/mac/i.test(platform) && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(ua);

  const detected = isIOS ? "ios" : isAndroid ? "android" : "android";
  localStorage.setItem(storageKey, detected);
  return detected;
};

const applyLink = () => {
  const button = document.getElementById("downloadButton");
  const ctaLabel = document.getElementById("ctaLabel");
  const detectedText = document.getElementById("detectedText");

  if (!button || !ctaLabel || !detectedText) return;

  const platform = detectPlatform();
  const link = LINKS[platform] ?? LINKS.android;

  button.href = link;
  button.target = "_blank";
  button.rel = "noopener";

  ctaLabel.textContent = `Download for ${platform === "ios" ? "iOS" : "Android"}`;
  detectedText.textContent =
    platform === "ios"
      ? "Sending you to the App Store."
      : "Sending you to Google Play.";
};

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildScreenTrack = () => {
  const track = document.getElementById("screenTrack");
  if (!track) return;

  const firstLoop = shuffle(SCREEN_IMAGES);
  let secondLoop = shuffle(SCREEN_IMAGES);

  if (firstLoop[firstLoop.length - 1].src === secondLoop[0].src) {
    secondLoop = secondLoop.slice(1).concat(secondLoop[0]);
  }

  const combined = firstLoop.concat(secondLoop);
  const frag = document.createDocumentFragment();

  combined.forEach((imgData, index) => {
    const img = document.createElement("img");
    img.src = imgData.src;
    img.loading = "lazy";

    if (index < firstLoop.length) {
      img.alt = imgData.alt;
    } else {
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
    }

    frag.appendChild(img);
  });

  track.innerHTML = "";
  track.appendChild(frag);
};

document.addEventListener("DOMContentLoaded", () => {
  applyLink();
  buildScreenTrack();
});
