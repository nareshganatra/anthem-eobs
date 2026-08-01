/*
Login into Anthem and goto the page that has the "Download EOB" option and run this script from the consolve in developer mode.
It will download the EOBs in batches of 20
*/

(async () => {
  const items = [...document.querySelectorAll('a,button')].filter(el =>
    /download eob/i.test((el.innerText || el.textContent || '').trim())
  );

  const batchSize = 20;
  const clickDelayMs = 2000;   // time between clicks
  const batchPauseMs = 10000;  // pause between batches

  console.log('Found', items.length, 'Download EOB elements');

  for (let start = 0; start < items.length; start += batchSize) {
    const batch = items.slice(start, start + batchSize);
    console.log(`Starting batch ${start + 1} to ${start + batch.length}`);

    for (let i = 0; i < batch.length; i++) {
      const el = batch[i];
      el.scrollIntoView({ block: 'center' });
      el.click();
      console.log('Clicked', start + i + 1, 'of', items.length);
      await new Promise(r => setTimeout(r, clickDelayMs));
    }

    if (start + batchSize < items.length) {
      console.log(`Batch complete. Pausing ${batchPauseMs / 1000}s...`);
      await new Promise(r => setTimeout(r, batchPauseMs));
    }
  }

  console.log('All batches done');
})();
    
