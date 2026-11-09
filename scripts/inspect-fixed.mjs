import http from 'node:http';

http.get('http://127.0.0.1:9222/json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const tabs = JSON.parse(data);
    const pageTab = tabs.find(t => t.type === 'page' && (t.url.includes('localhost:4321')));
    if (!pageTab) {
      console.log('Nenhuma aba encontrada');
      return;
    }
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            (() => {
              const els = document.querySelectorAll('*');
              const res = [];
              for (const el of els) {
                const s = window.getComputedStyle(el);
                if ((s.position === 'fixed' || s.position === 'sticky') && el.offsetHeight > 0) {
                  const r = el.getBoundingClientRect();
                  res.push({
                    tag: el.tagName,
                    id: el.id,
                    className: (el.className || '').toString().slice(0, 50),
                    text: (el.innerText || '').slice(0, 50).replace(/\\n/g, ' '),
                    top: Math.round(r.top),
                    bottom: Math.round(r.bottom),
                    left: Math.round(r.left),
                    width: Math.round(r.width),
                    height: Math.round(r.height),
                    zIndex: s.zIndex
                  });
                }
              }
              return JSON.stringify(res);
            })()
          `
        }
      }));
    };
    ws.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);
      if (parsed.result && parsed.result.result) {
        const val = JSON.parse(parsed.result.result.value);
        console.table(val);
      } else {
        console.log(parsed);
      }
      ws.close();
    };
  });
});
