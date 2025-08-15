// ==UserScript==
// @name         MGEWeb+
// @namespace    https://mgeweb.medgrupo.com.br/
// @version      0.0.2
// @description  Melhorias para o MGEWeb
// @author       Salatiel
// @match        https://mgeweb.medgrupo.com.br/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=medgrupo.com.br
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  loopDetectFilterModal();
  function loopDetectFilterModal() {
    waitForElm("modal-container tab[heading=Filtros]").then((elem) => {
      betterFilter();
      waitForElmRemoved("modal-container").then((elem) => {
        loopDetectFilterModal();
      });
      if (!document.querySelector("mge-player-video")) {
        waitForElm("mge-player-video video").then((elem) => {
          betterVideoPlayer();
        });
      }
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
      });
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
  }

  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
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
