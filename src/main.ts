document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#nav a");

  const glow: HTMLDivElement = document.querySelector(".glow")!;

  const rightPart = document.querySelector("#content");
  if (rightPart) {
    rightPart.scrollTop = 0;
  }

  document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    glow.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "bg-indigo-500",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href")!.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

const changeLanguage = () => {
  let currentlanguage = getComputedStyle(document.body).getPropertyValue(
    "--language"
  );

  if (currentlanguage == "data-en") {
    document.documentElement.style.setProperty("--language", "data-ru");
    currentlanguage = "data-ru";
  } else {
    document.documentElement.style.setProperty("--language", "data-en");
    currentlanguage = "data-en";
  }
};
