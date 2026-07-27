(() => {
  const result = {};

  // Extract Render-blocking resources
  const rbAudit = [...document.querySelectorAll('.lh-audit')].find(a => a.textContent.includes('渲染阻塞请求'));
  if (rbAudit) {
    const items = [];
    rbAudit.querySelectorAll('tr').forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 2) {
        items.push({ url: cells[0]?.textContent?.trim(), savings: cells[1]?.textContent?.trim() });
      }
    });
    // Also try to get URLs from links
    rbAudit.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && a.offsetParent !== null) items.push({ url: href });
    });
    result.renderBlocking = { items: items.slice(0, 20), fullText: rbAudit.textContent.substring(0, 2000) };
  }

  // Extract LCP breakdown
  const lcpAudit = [...document.querySelectorAll('.lh-audit')].find(a => a.textContent.includes('LCP 细分'));
  if (lcpAudit) {
    result.lcp = { fullText: lcpAudit.textContent.substring(0, 2000) };
  }

  // Extract Third-party
  const tpAudit = [...document.querySelectorAll('.lh-audit')].find(a => a.textContent.includes('第三方'));
  if (tpAudit) {
    result.thirdParty = { fullText: tpAudit.textContent.substring(0, 2000) };
  }

  // Extract Efficient Cache
  const cacheAudit = [...document.querySelectorAll('.lh-audit')].find(a => a.textContent.includes('缓存生命周期'));
  if (cacheAudit) {
    result.cache = { fullText: cacheAudit.textContent.substring(0, 2000) };
  }

  // Search for cdn.tailwindcss.com anywhere on page
  const pageText = document.body.textContent;
  result.tailwindcss = {
    found: pageText.includes('cdn.tailwindcss.com'),
    count: (pageText.match(/cdn\.tailwindcss\.com/g) || []).length
  };

  // Search for sc01.alicdn.com
  result.alicdn = {
    found: pageText.includes('sc01.alicdn.com'),
    count: (pageText.match(/sc01\.alicdn\.com/g) || []).length
  };

  return result;
})()