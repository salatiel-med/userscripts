// ==UserScript==
// @name         MGEWeb+
// @namespace    https://mgeweb.medgrupo.com.br/
// @version      1.0.5
// @description  Melhorias para o MGEWeb
// @author       Salatiel
// @match        https://mgeweb.medgrupo.com.br/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=medgrupo.com.br
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  waitForElm("app-loading").then((e) => {
    e.style.display = "none";
  });

  loopDetectFilterModal();
  loopDetectVideo();
  autoclickLoadVideoLink();

  function autoclickLoadVideoLink() {
    waitForElm(
      "mge-video-comentario > mge-quadro-borda .quadro-collapse.show a"
    ).then((elem) => {
      elem.click();
      console.log("(MGEWeb+) click button created");
      waitForElmRemoved(
        "mge-video-comentario > mge-quadro-borda .quadro-collapse.show a"
      ).then((elem) => {
        console.log("(MGEWeb+) click button removed");
        autoclickLoadVideoLink();
      });
    });
  }

  function loopDetectVideo() {
    waitForElm("mge-player-video video").then((_elem) => {
      betterVideoPlayer();
      console.log("(MGEWeb+) mge-player-video created");
      waitForElmRemoved("mge-player-video").then((_elem) => {
        console.log("(MGEWeb+) mge-player-video removed");
        loopDetectVideo();
      });
    });
  }

  function loopDetectFilterModal() {
    waitForElm("modal-container tab[heading=Filtros]").then((_elem) => {
      betterFilter();
      console.log("(MGEWeb+) filter modal created");
      waitForElmRemoved("modal-container").then((_elem) => {
        loopDetectFilterModal();
        console.log("(MGEWeb+) filter modal removed");
      });
    });
  }

  function betterFilter() {
    document
      .querySelector(".modal-body")
      .parentNode.insertBefore(
        document.querySelector(".modal-footer"),
        document.querySelector(".modal-body")
      );
    document
      .querySelector(".mgeSelect-search__field")
      .addEventListener("paste", (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData("text");
        e.preventDefault();
        document.querySelector(".mgeSelect-search__field").value = pastedText
          .trim()
          .split("\n")
          .join(" ")
          .split(" ")
          .join(";");
        document
          .querySelector(".mgeSelect-search__field")
          .dispatchEvent(new Event("input"));
        document
          .querySelector(".mgeSelect-search__field")
          .dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      });
      setTimeout(() => {
        document.querySelector('#checkQuestaoLiberadaParaVenda input').click()
        document.querySelector('#checkQuestaoLiberadaParaVenda input').click()
      }, 200);
  }

  function betterVideoPlayer() {
    document
      .querySelector(".video-player-wrapper")
      .appendChild(document.querySelector("mge-player-video video"));
    document
      .querySelector("mge-player-video video")
      .setAttribute("controls", "");
    document.querySelector("mge-player-video video").style.width = "100%";
    document.querySelector("mge-player-video video").playbackRate = 2.0;
    document.querySelector("mge-player-video video").defaultPlaybackRate = 2.0;
  }

  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((_mutations) => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // parameter 1 is not of type Node https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  function waitForElmRemoved(selector) {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);

      if (!element) {
        return resolve();
      }

      const observer = new MutationObserver(() => {
        if (!document.body.contains(element)) {
          observer.disconnect();
          resolve();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
})();
