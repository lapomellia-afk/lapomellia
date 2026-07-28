(() => {
  const result = {};
  
  // LCP detailed breakdown - get the audit container
  const allAudits = document.querySelectorAll('.lh-audit');
  allAudits.forEach(audit => {
    const title = audit.querySelector('.lh-audit__title')?.textContent?.trim();
    if (!title) return;
    
    if (title.includes('LCP 细分')) {
      const rows = [];
      audit.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const vals = [...cells].map(c => c.textContent.trim());
        if (vals.length >= 2) rows.push(vals);
      });
      result.lcpDetail = { title, rows };
    }
    
    if (title.includes('第三方') && !title.includes('Cookie')) {
      const rows = [];
      audit.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const vals = [...cells].map(c => c.textContent.trim());
        if (vals.length >= 2) rows.push(vals);
      });
      result.thirdPartyDetail = { title, rows };
      
      const links = [];
      audit.querySelectorAll('a').forEach(a => {
        if (a.offsetParent !== null) links.push(a.textContent.trim() + ' | ' + a.href);
      });
      result.thirdPartyDetail.links = links.slice(0, 10);
    }
  });
  
  return result;
})()