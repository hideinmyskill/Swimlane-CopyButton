// Listen for when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: executeScript
  });
});

// Notification
function executeScript() {
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = '#28a745';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '1000';
    notification.style.fontSize = '14px';
    notification.style.fontWeight = 'bold';

    document.body.appendChild(notification);

    // Remove the notification after 2 seconds
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }

// Function to replace select-box elements with Copy buttons
function replaceSelectBoxWithCopyButton() {
   const contentRowEven = document.getElementsByClassName("dt-row dt-row-even")
   const contentRowOdd = document.getElementsByClassName("dt-row dt-row-odd")

   for (let i = 0; i < contentRowEven.length; i++) {
    const contentRowEvenText = contentRowEven[i].getElementsByClassName("dt-cell-content")[2].textContent
    // Create a new Copy button
    const copyButton = document.createElement("button");
    copyButton.innerHTML = "📋"; // Icon for the button
    copyButton.id = "copyButton1";
    copyButton.style.border = "none";
    copyButton.style.background = "none";
    copyButton.style.cursor = "pointer";
    copyButton.style.fontSize = "16px";
    copyButton.style.marginLeft = "2px";

     // Click event to copy text
    copyButton.addEventListener("click", () => {
	event.stopPropagation();
        event.preventDefault();
        navigator.clipboard.writeText(contentRowEvenText)
            .then(() => showNotification('Copied to clipboard!'))
            .catch((error) => alert("Failed to copy title: " + error));
    });
    
    const button = contentRowEven[i].querySelector("#copyButton1")

    if (button) {
        console.log("Copy button is already there, not adding...");
    } else {
        // Replace the select-box with the Copy button
    	contentRowEven[i].querySelector('.select-box').replaceWith(copyButton);
    }
  }
  for (let i = 0; i < contentRowOdd.length; i++) {
    const contentRowOddText = contentRowOdd[i].getElementsByClassName("dt-cell-content")[2].textContent
    // Create a new Copy button
    const copyButton = document.createElement("button");
    copyButton.innerHTML = "📋"; // Icon for the button
    copyButton.id = "copyButton1";
    copyButton.style.border = "none";
    copyButton.style.background = "none";
    copyButton.style.cursor = "pointer";
    copyButton.style.fontSize = "16px";
    copyButton.style.marginLeft = "2px";

     // Click event to copy text
    copyButton.addEventListener("click", () => {
	event.stopPropagation();
        event.preventDefault();
        navigator.clipboard.writeText(contentRowOddText)
            .then(() => showNotification('Copied to Clipboard!'))
            .catch((error) => alert("Failed to copy title: " + error));
    });
    
    const button = contentRowOdd[i].querySelector("#copyButton1")

    if (button) {
        console.log("Copy button is already there, not adding...");
    } else {
        // Replace the select-box with the Copy button
    	contentRowOdd[i].querySelector('.select-box').replaceWith(copyButton);
    }
  }
}
// Call the function to replace select-box elements
replaceSelectBoxWithCopyButton();
}