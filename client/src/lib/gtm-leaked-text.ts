/** Matches GTM Custom HTML tag labels leaked as body text (// comments outside <script>). */
const GTM_LEAKED_TEXT =
  /\/\/\s*GTM Custom HTML|Fires gallery_engaged when user views/i;

function isLeakedGtmText(text: string): boolean {
  return GTM_LEAKED_TEXT.test(text);
}

function scanLeakedTextNodes(root: ParentNode): Text[] {
  const found: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const content = node.textContent ?? "";
    if (isLeakedGtmText(content)) {
      found.push(node as Text);
    }
  }
  return found;
}

function collectLeakedFromAddedNodes(nodes: NodeList | Node[]): Text[] {
  const found: Text[] = [];
  // Convert NodeList to an actual array so TS doesn't require downlevelIteration.
  for (const added of Array.from(nodes)) {
    if (added.nodeType === Node.TEXT_NODE && isLeakedGtmText(added.textContent ?? "")) {
      found.push(added as Text);
    } else if (added.nodeType === Node.ELEMENT_NODE) {
      found.push(...scanLeakedTextNodes(added as ParentNode));
    }
  }
  return found;
}

function removeLeakedTextNodes(nodes: Text[]): void {
  for (const node of nodes) {
    node.remove();
  }
}

/**
 * GTM Custom HTML tags in container GTM-WK9PD9T3 use `//` comment lines before
 * `<script>`; the browser shows those lines as visible text. Observe and remove them.
 */
export function initGtmLeakedTextCleanup(): void {
  const cleanup = (nodes: Text[]) => {
    if (nodes.length > 0) {
      removeLeakedTextNodes(nodes);
    }
  };

  cleanup(scanLeakedTextNodes(document.body));

  const observer = new MutationObserver((mutations) => {
    const added: Node[] = [];
    for (const mutation of mutations) {
      added.push(...Array.from(mutation.addedNodes));
    }
    cleanup(collectLeakedFromAddedNodes(added));
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
