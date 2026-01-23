/**
 * @file Service Worker principal para la extensión "Navegador de Pestañas".
 * Gestiona los eventos de comandos de teclado para la navegación y control de pestañas.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/commands/|Chrome Commands API}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/tabs/|Chrome Tabs API}
 */

/**
 * Escucha los comandos ejecutados por el usuario y realiza la acción correspondiente.
 *
 * Maneja las siguientes acciones:
 * - `close-actual-tab`: Cierra la pestaña activa.
 * - `open-and-focus-new-tab`: Crea una nueva pestaña y la pone en primer plano.
 * - `switch-left/right`: Navegación circular entre pestañas basada en su índice visual.
 *
 * @param {string} command - El identificador del comando definido en manifest.json.
 */
chrome.commands.onCommand.addListener(async (command) => {
  // Obtengo la pestaña activa y todas las de la ventana actual en paralelo para optimizar el tiempo de respuesta.
  const [tabs, [activeTab]] = await Promise.all([
    chrome.tabs.query({ currentWindow: true }),
    chrome.tabs.query({ active: true, currentWindow: true }),
  ]);

  // Si no hay pestaña activa, salimos.
  if (!activeTab) return;

  // Manejo de comandos de acción directa (cerrar/abrir)
  if (command === "close-actual-tab") {
    chrome.tabs.remove(activeTab.id);
    return;
  } else if (command === "open-and-focus-new-tab") {
    await chrome.tabs.create({ active: true });
    return;
  }

  // Ordenamos las pestañas por su índice visual para asegurar una navegación intuitiva.
  tabs.sort((a, b) => a.index - b.index);

  const currentIndex = activeTab.index;
  let targetTab;

  // Manejo de comandos de navegación (izquierda/derecha)
  if (command === "switch-left") {
    // Lógica circular: si estamos en la primera, vamos a la última.
    const newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    targetTab = tabs[newIndex];
  } else if (command === "switch-right") {
    // Lógica circular: si estamos en la última, volvemos a la primera.
    const newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    targetTab = tabs[newIndex];
  }

  // Si se determinó una pestaña destino, la activamos.
  if (targetTab) {
    chrome.tabs.update(targetTab.id, { active: true });
  }
});
