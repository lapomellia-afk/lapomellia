(() => {
  // Find all expandable audit sections and click to expand
  const buttons = document.querySelectorAll('[role="button"][aria-expanded]');
  buttons.forEach(b => b.click());
  
  return { expanded: buttons.length };
})()