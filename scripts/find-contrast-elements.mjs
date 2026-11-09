const port = 9222;
const resp = await fetch(`http://127.0.0.1:${port}/json`);
const targets = await resp.json();
const target = targets.find((t) => t.type === 'page' && t.url.includes('localhost:4321'));
if (!target) {
  console.error('No page target found');
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
ws.onopen = () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: `
        (function() {
          const results = [];
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
          let node;
          while (node = walker.nextNode()) {
            const style = window.getComputedStyle(node);
            const text = (node.innerText || '').trim();
            if (text && (style.color.includes('255, 136, 17') || style.backgroundColor.includes('225, 113, 0') || style.backgroundColor.includes('255, 136, 17'))) {
              results.push({
                tag: node.tagName,
                cls: node.className,
                text: text.slice(0, 40),
                color: style.color,
                bg: style.backgroundColor
              });
            }
          }
          return results;
        })()
      `,
      returnByValue: true
    }
  }));
};

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  if (data.id === 1) {
    console.log(JSON.stringify(data.result?.result?.value || data.result, null, 2));
    ws.close();
    process.exit(0);
  }
};
