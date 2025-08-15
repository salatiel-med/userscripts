// ==UserScript==
// @name         MGEWeb+
// @namespace    https://mgeweb.medgrupo.com.br/
// @version      0.0.1
// @description  Melhorias para o MGEWeb
// @author       Salatiel
// @match        https://mgeweb.medgrupo.com.br/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=medgrupo.com.br
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  waitForElm("mge-player-video video").then((elem) => {
    document
      .querySelector(".video-player-wrapper")
      .appendChild(document.querySelector("mge-player-video video"));
    document
      .querySelector("mge-player-video video")
      .setAttribute("controls", "");
    document.querySelector("mge-player-video video").style.width = "100%";
    document.querySelector("mge-player-video video").playbackRate = 2.0;
  });

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
})();
