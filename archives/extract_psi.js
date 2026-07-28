(() => {
  // Expand all collapsed sections first
  document.querySelectorAll('[aria-expanded="false"]').forEach(el => el.click());
  
  // Wait a bit for DOM to update, then extract all text content from relevant sections
  const results = {};
  
  // Get all audit items
  const auditItems = document.querySelectorAll('[class*="lh-audit"]');
  auditItems.forEach(item => {
    const title = item.querySelector('[class*="lh-audit__title"]')?.textContent?.trim();
    const description = item.querySelector('[class*="lh-audit__description"]')?.textContent?.trim();
    if (title) {
      results[title] = { description };
      
      // Get detail items (like individual URLs)
      const details = item.querySelectorAll('[class*="lh-details"] li, [class*="lh-details"] tr');
      if (details.length) {
        const items = [];
        details.forEach(d => {
          const txt = d.textContent.trim();
          if (txt) items.push(txt);
        });
        results[title].details = items.slice(0, 30);
      }
    }
  });
  
  return results;
})()