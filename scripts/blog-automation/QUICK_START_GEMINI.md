# 🚀 Automated Daily Blog Publishing with Google Gemini - Quick Start

## What This Does
Generates a new, unique 1800-2000 word SEO-optimized blog post **every day at 9:00 AM** automatically using **Google's Gemini API**. No manual work required.

## Why Gemini?
✅ Free tier available
✅ Fast generation
✅ High quality output
✅ No subscription required to start

## Installation (5 minutes)

### Step 1: Generate New Gemini API Key (Secure)

**IMPORTANT: Create a new API key (the old one was exposed)**

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API key"
3. Copy your NEW key
4. **Never share it again** - store it securely

### Step 2: Create `.env` File

In `scripts/blog-automation/`, create `.env`:

```env
GEMINI_API_KEY=your-NEW-gemini-api-key-here
NODE_ENV=production
```

**Keep this file private - add to `.gitignore`:**
```
.env
.env.local
*.env
```

### Step 3: Install Dependencies
```bash
cd scripts/blog-automation
npm install
npm run build
```

### Step 4: Test It
```bash
npm run generate
```

✅ If successful, you'll see:
- Blog post generated
- Files saved to `src/content/blog/[slug]/`
- Blog index updated

## Set Up Windows Task Scheduler

### Automatic Setup:
```powershell
# Run as Administrator
powershell -ExecutionPolicy Bypass -File .\deploy-windows-scheduler-gemini.ps1
```

### Manual Setup:

**1. Create wrapper batch file** (`run-blog-generator.bat`):
```batch
@echo off
cd /d "C:\Users\w\.antigravity\extensions\scripts\blog-automation"
setlocal enabledelayedexpansion
for /f "tokens=*" %%a in (.env) do (
  set "%%a"
)
npm run generate
```

**2. Add to Task Scheduler:**
1. Open Task Scheduler
2. Create Basic Task
3. Name: "PDFA2Z Daily Blog Generator"
4. Trigger: Daily at 9:00 AM
5. Action: Start program → `run-blog-generator.bat`
6. Advanced: "Run whether user is logged in"

## What Gets Generated Daily

✅ 1800-2000 words of unique content
✅ H2 headings (Introduction, Use Cases, Guide, Pro Tips, FAQ, Conclusion)
✅ 8-10 FAQ questions
✅ Internal links to related tools
✅ SEO meta description (155-160 chars)
✅ Target keywords (5-7 natural mentions)
✅ Reading time estimate
✅ Markdown + JSON format

## Daily Blog Topics (8-Day Rotation)

- **Day 1:** How to merge PDF files
- **Day 2:** Compress PDF without losing quality
- **Day 3:** Remove background from image AI
- **Day 4:** Best free PDF tools
- **Day 5:** PDF merger online free
- **Day 6:** Image compression tool free
- **Day 7:** Background remover online
- **Day 8:** Split PDF online
- *(Then cycle repeats)*

## Expected Monthly Results

| Metric | Value |
|--------|-------|
| Posts per month | 30 unique posts |
| Total words | 54,000+ new words |
| Daily cost | FREE (Gemini free tier) |
| Setup time | 5 minutes |
| Time to first post | Immediate |

## Gemini API Pricing

**Free Tier:**
- 60 requests per minute
- 1500 requests per day
- Sufficient for 1 blog post per day

**Paid Tier (if needed):**
- $0.00025 per input token
- $0.00075 per output token
- ~$0.50-1.00 per 2000-word post

## File Structure

Posts are saved to:
```
src/content/blog/
├── how-to-merge-pdf-files/
│   ├── metadata.json
│   └── content.md
├── compress-pdf-without-losing-quality/
│   ├── metadata.json
│   └── content.md
└── blog-index.json (auto-updated)
```

## Verify It's Working

### Check Recent Posts
```bash
ls src/content/blog/
```

### View Latest Post
```bash
cat src/content/blog-index.json | head -10
```

## Customize

### Change Daily Time
Edit `.bat` file or Task Scheduler trigger time

### Change Keywords
Edit `BLOG_TEMPLATES` in `generateDailyBlog-gemini.ts`:
```typescript
const BLOG_TEMPLATES = [
  {
    keyword: "your custom keyword",
    category: "Category",
    relatedTools: ["tool1", "tool2"],
    description: "What this covers",
  },
];
```

### Change Post Length
In `generateDailyBlog-gemini.ts` prompt:
```
- Length: 2500-3000 words  // Instead of 1800-2000
```

## Troubleshooting

**"GEMINI_API_KEY not set"**
- Check .env file exists in blog-automation directory
- Restart terminal/IDE
- Verify key is pasted correctly

**"Cannot find module '@google/generative-ai'"**
- Run: `npm install`

**Posts not saving**
- Check `src/content/blog/` directory exists
- Verify permissions
- Run manually: `npm run generate`

**API key invalid**
- Regenerate key at [Google AI Studio](https://aistudio.google.com/app/apikey)
- Update .env file
- Test with: `npm run generate`

## Security Best Practices

✅ **DO:**
- Store API key in `.env` file (local only)
- Add `.env` to `.gitignore`
- Regenerate if exposed
- Use minimal permissions

❌ **DON'T:**
- Commit `.env` to git
- Share API key in chat/email
- Hardcode key in source code
- Use same key for multiple projects

## Stop/Pause Automation

### Disable Task
```powershell
Disable-ScheduledTask -TaskName "PDFA2Z Daily Blog Generator"
```

### Re-enable Task
```powershell
Enable-ScheduledTask -TaskName "PDFA2Z Daily Blog Generator"
```

### Remove Task
```powershell
Unregister-ScheduledTask -TaskName "PDFA2Z Daily Blog Generator" -Confirm:$false
```

## Next Steps

1. ✅ Regenerate API key securely
2. ✅ Create `.env` file with new key
3. ✅ Install dependencies: `npm install`
4. ✅ Test generation: `npm run generate`
5. ✅ Set up Task Scheduler
6. ✅ Monitor first week of automatic posts
7. ✅ Customize topics/timing as needed

## Monitor Your Usage

Check free tier status:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. View API quotas and usage
3. 1 blog post = ~1000 tokens (well within free tier)

## Done! 🎉

Your automated blog publishing with **Google Gemini** is now active and running **completely free**.

Check back tomorrow at 9:00 AM to see your first auto-generated blog post!

---

**Questions?** See SETUP.md for detailed configuration.
