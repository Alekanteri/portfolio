const sections = document.querySelectorAll("section");
const navButtons = document.querySelectorAll(".nav-btn");
const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
const imageElement = document.getElementById("image") as HTMLImageElement;

const observerOptions = {
  root: document.getElementById("content-block"),
  rootMargin: "0px",
  threshold: 0.5,
};

const observerCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(sections).indexOf(entry.target as HTMLElement);
      navButtons.forEach((btn) =>
        btn.classList.remove("bg-indigo-600", "text-white")
      );
      navButtons[index].classList.add("bg-indigo-600", "text-white");
      imageElement.classList.add("slide-out");
      imageElement.src = images[index];

      imageElement.addEventListener(
        "animationend",
        () => {
          imageElement.classList.remove("slide-out");
        },
        { once: true }
      );
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section, index) => {
  observer.observe(section);
  section.classList.add(`z=[${index + 1}0]`);
});

navButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    sections[index].scrollIntoView({ behavior: "smooth" });
  });
});
