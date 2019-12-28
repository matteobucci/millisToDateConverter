/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
  
  document.addEventListener("click", (e) => {

    function reset(tabs) {
      console.log("calling reset...")
      browser.tabs.sendMessage(tabs[0].id, {
        command: "refresh",
      });
    }

    /**
    * Just log the error to the console.
    */
    function reportError(error) {
      console.error(`Something went wrong: ${error}`);
    }

    // Tell the extension in the tab to rerun the replacement
    if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }

  });

}
function reportPageNotSupportedError(){
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#wrong-page-content").classList.remove("hidden");
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.query({active: true, currentWindow: true})
  .then(result => {
    if(result[0].url.indexOf("firebase.google") === -1){
      reportPageNotSupportedError()
    }else{
      listenForClicks();
    }

  });

