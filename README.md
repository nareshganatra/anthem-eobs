# Anthem EOB Bulk Downloader

A tiny browser console script that automatically clicks through every "Download EOB" button on an Anthem page — in safe, paced batches — so you don't have to download your Explanation of Benefits statements one at a time.

No extension. No dependencies. No install. Just paste it into your browser's developer console and run it.

🎥 **How to use & How this was built:** If you are non-technical, watch the video link below for a step-by-step visual guide on how to run this. It also breaks down how I used AI to generate the script without hand-writing it from scratch: [YouTube video link]

## Table of Contents
* [What it does](#what-it-does)
* [Usage](#usage)
* [Configuration](#configuration)
* [How it works](#how-it-works)
* [Requirements & Limitations](#requirements--limitations)
* [Disclaimer](#disclaimer)
* [License](#license)

## What it does
* Scans the current page for every clickable `<a>` or `<button>` whose text matches "Download EOB".
* Clicks through them in batches (default: 20 at a time).
* Waits between each click, and takes a longer pause between batches, so the page isn't hammered with requests.
* Logs live progress to the console (*Clicked 3 of 46*, etc.) so you can watch it work.
* Runs entirely in your browser tab — no server, no external service, nothing installed.

## Usage

> [!NOTE]
> **Never done this before?** Watch the [YouTube video link] for a quick visual walkthrough showing exactly how to complete these steps.

1. Log into your Anthem account in a desktop browser (Chrome, Edge, or Firefox).
2. Navigate to the page that lists your EOBs — the one with the "Download EOB" option next to each statement.
3. Open Developer Tools:
   * **Windows/Linux:** `F12` or `Ctrl+Shift+I`
   * **Mac:** `Cmd+Option+I`
4. Click the **Console** tab.
5. Paste the script below and press `Enter`.
6. Your browser will likely ask permission to allow multiple downloads — click **Allow**.
7. Watch the console — downloads will land in your Downloads folder in batches of 20 until everything's done.

```js
/*
  Anthem EOB Bulk Downloader
  License: MIT (AI-assisted project by [Your Name/Username])
  
  Login into Anthem and go to the page that has the "Download EOB" option.
  Run this script from the browser console in developer mode.
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
```

## Configuration

Edit these three constants near the top of the script to change its behavior:

| Constant | Default | What it controls |
| :--- | :--- | :--- |
| `batchSize` | `20` | How many EOBs are clicked before taking a longer pause. |
| `clickDelayMs` | `2000` (2s) | How long to wait between each individual click. |
| `batchPauseMs` | `10000` (10s) | How long to pause between batches. |

> [!TIP]
> If downloads are silently failing or the page feels sluggish, try raising `clickDelayMs` and `batchPauseMs` rather than lowering them.

## How it works
1. `document.querySelectorAll('a,button')` grabs every clickable link and button currently on the page.
2. `.filter(...)` narrows that list down to only elements whose visible text matches "download eob" (case-insensitive).
3. The script loops through the matches in chunks of `batchSize`, calling `scrollIntoView()` and `.click()` on each one — exactly what a person would do manually, just automated.
4. `await new Promise(r => setTimeout(r, ms))` is used to pace the clicks and batches so the page isn't overwhelmed.
5. `console.log` calls print progress the entire way through, so you always know how far along it is.

## Requirements & limitations
* **Authentication:** You must already be logged in. This script does not bypass authentication of any kind — it only clicks buttons that are already present on a page you're logged into. It uses the access you already have, nothing more.
* **DOM Presence:** Only finds elements already in the DOM. If Anthem lazy-loads or paginates the EOB list, you may need to scroll/load the full list before running the script.
* **Layout Dependent:** Tied to Anthem's current page structure. If Anthem changes their button labels or page layout, the selector (`/download eob/i`) may need to be updated to match.
* **Site Specific:** Not guaranteed to work on other sites. The technique generalizes (find the button's label, describe the task to an AI, get a script back) — but the exact code here is specific to Anthem's current "Download EOB" buttons and won't run as-is elsewhere.
* **Browser Permissions:** Most browsers prompt for permission before allowing many downloads in a row — you'll need to click "Allow" when asked.

## Disclaimer

This project is not affiliated with, endorsed by, or connected to Anthem or Elevance Health in any way. "Anthem" is used here only to describe which website this script was written for.

This script is intended for downloading your own documents from your own account. It doesn't access, request, or download anything you don't already have permission to view. Automating clicks on a website may still be subject to that website's terms of service — review Anthem's terms before using this, and use it at your own discretion and risk.

Provided as-is, with no warranty of any kind. The author is not responsible for any account restrictions, data loss, or other issues that may result from using this script.

## License

MIT License

Copyright (c) 2026 [Your Name or GitHub Username] (AI-assisted project)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
*If this saved you from clicking "Download" fifty times, consider ⭐ starring the repo — and check out the video for how the AI-generation process behind it actually worked: [YouTube video link]*
