/**
 * @file Main Service Worker for the "Tab Navigator" extension.
 * Handles keyboard command events for tab navigation and management.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/commands/|Chrome Commands API}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/tabs/|Chrome Tabs API}
 */

/**
 * Listens for user-triggered commands and executes the corresponding action.
 *
 * Handles the following actions:
 * - `close-actual-tab`: Closes the active tab.
 * - `open-and-focus-new-tab`: Creates a new tab and focuses it.
 * - `switch-left/right`: Circular navigation between tabs based on visual index.
 *
 * @param {string} command - The command identifier defined in manifest.json.
 */
chrome.commands.onCommand.addListener(async (command) => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (!activeTab) return;

  try {
    // Handle direct commands without querying all tabs
    if (command === "close-actual-tab") {
      await chrome.tabs.remove(activeTab.id);
      return;
    } else if (command === "open-and-focus-new-tab") {
      await chrome.tabs.create({ active: true });
      return;
    }

    // Query all tabs in the current window for navigation
    const tabs = await chrome.tabs.query({ currentWindow: true });
    if (tabs.length <= 1) return;

    tabs.sort((a, b) => a.index - b.index);

    // Find current active tab index
    const currentIndex = tabs.findIndex((t) => t.id === activeTab.id);
    if (currentIndex === -1) return;

    let targetTab;
    if (command === "switch-left") {
      const newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      targetTab = tabs[newIndex];
    } else if (command === "switch-right") {
      const newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
      targetTab = tabs[newIndex];
    }

    if (targetTab) {
      await chrome.tabs.update(targetTab.id, { active: true });
    }
  } catch (error) {
    console.error(`Error executing command ${command}:`, error);
  }
});
