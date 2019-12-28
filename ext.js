let regexp = /^\d{13}$/;
 
function replaceText (node) {
  
  if (node.nodeType === Node.TEXT_NODE) {

    if (node.parentNode &&
        node.parentNode.nodeName === 'TEXTAREA') {
          console.log(node.textContent);
       return;
    }

    if(regexp.test(node.textContent)){
      node.textContent = getDateFromContent(node.textContent);
    }  

  }
  else if(node.nodeType === Node.ELEMENT_NODE && node.nodeName === "INPUT"){
    if(regexp.test(node.value)){
      node.value = getDateFromContent(node.value);
      node.style.witdh = "300px";
    }  
}else {

  for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }    
  }

}

function getDateFromContent(content){
  let date = new Date(parseInt(content));;
    
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours()
  let minutes = date.getMinutes();
  
  return `${day}/${monthIndex+1}/${year} ${hour}:${minutes}`;
}

// Observe for DOM changes and apply the replacement for new elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added. Run our substitution
      // algorithm on each newly added node.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from the toolbar icon and rerun the replacement
browser.runtime.onMessage.addListener((message) => {
  if (message.command === "refresh") {
      console.log(`Refreshing...`)
      replaceText(document.body);
  }
});
