function animateFrom(elem, direction) {
  direction = direction || 1;
  let x = 0,
    y = direction * 100;
  if (elem.classList.contains("animate-slide-from-left")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("animate-slide-from-right")) {
    x = 100;
    y = 0;
  } else if (elem.classList.contains("animate-slide-from-bottom")) {
    x = 0;
    y = 100;
  }

  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
    duration: 3,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

function tabClicks(e) {
  const tabs = document.querySelectorAll("ul.tab-control > li");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  const tabSelected = e.currentTarget;

  tabSelected.classList.add("active");

  e.preventDefault();

  const tabContent = document.getElementsByClassName('tab-pane');

  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove("active");
  }

  const anchorReference = e.target;
  const activePaneId = anchorReference.getAttribute("href");
  const activePane = document.querySelector(activePaneId);

  activePane.classList.add("active");

  TweenMax.to(tabs, 0.5, { opacity: 0.1 });
  TweenMax.to(tabSelected, 0.5, { opacity: 1 });

  TweenMax.to(tabContent, 0.5, { opacity: 0 });
  TweenMax.to(activePane, 0.5, { opacity: 1 });

  gsap.fromTo(activePane, { x: 100, y: 0, autoAlpha: 0 }, {
    duration: 1,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".animation-scroll").forEach(function (elem) {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function () { animateFrom(elem) },
      onEnterBack: function () { animateFrom(elem, -1) },
      onLeave: function () { hide(elem) }
    });
  });

  const tabs = document.querySelectorAll("ul.tab-control > li");

  for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", tabClicks);
  }
});
