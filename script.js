const timeframesBtns = document.querySelectorAll(
  ".dashboard__timeframe > .btn"
);

const dbGroupItemsDiv = document.getElementById("dashboard__group-items");

const fetchFn = async (e) => {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    generateDbItems(data);
  } catch (err) {
    console.error("Promise rejected");
  }
};

const generateDbItems = (data) => {
  console.log(data);

  const timeframeSelectedBtn = document.querySelector(
    ".dashboard__timeframe > .btn.selected"
  );

  dbGroupItemsDiv.innerHTML = "";

  data.forEach(({ title, timeframes }) => {
    dbGroupItemsDiv.innerHTML += `
      <div class="dashboard__item dashboard__item--${formatTitle(
        title
      )}" style="background-image: url(images/icon-${formatTitle(title)}.svg);">
          <div class="dashboard__item--group | bg-neutral-3 grid-flow">
              <h3 class="fw-500">${title}</h3>
  
              <button class="btn btn--ellipsis">
                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="var(--hover-clr, #BBC0FF)" fill-rule="evenodd"/></svg>
              </button>
  
              <p class="fs-900 span-2-md"><span class="dashboard__item__current">${
                timeframes[timeframeSelectedBtn.value].current
              }</span>hrs</p>
  
              <p class="fs-300 fw-400 txt-neutral-1 span-2-md">
                Last <span class="dashboard__item__timeframe">${timeframeSelectedBtn.getAttribute(
                  "data-timeframe"
                )}</span> -
                <span class="dashboard__item__previous">${
                  timeframes[timeframeSelectedBtn.value].previous
                }</span>hrs
              </p>
          </div>
      </div>
    `;
  });
};

const formatTitle = (title) => {
  return title.replace(/\s+/, "-").toLowerCase();
};

timeframesBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!btn.classList.contains("selected")) {
      const timeframeSelectedBtn = document.querySelector(
        ".dashboard__timeframe > .btn.selected"
      );

      timeframeSelectedBtn.classList.remove("selected");
      btn.classList.add("selected");
      fetchFn();
    }
  });
});

fetchFn();
