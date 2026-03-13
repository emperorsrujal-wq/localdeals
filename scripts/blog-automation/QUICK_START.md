# 🚀 Automated Daily Blog Publishing - Quick Start

## What This Does
Generates a new, unique 1800-2000 word SEO-optimized blog post **every day at 9:00 AM** automatically. No manual work required.

## Installation (5 minutes)

### Step 1: Install Dependencies
```bash
cd scripts/blog-automation
npm install
```

### Step 2: Build TypeScript
```bash
npm run build
```

### Step 3: Set Up Windows Task Scheduler (Easiest)

**Option A - Automatic Setup:**
```powershell
# Run as Administrator
powershell -ExecutionPolicy Bypass -File .\deploy-windows-scheduler.ps1 -ApiKey "sk-ant-api03-YOUR-KEY-HERE"
```

**Option B - Manual Setup:**
1. Open Task Scheduler
2. Click "Create Basic Task"
3. Name: "PDFA2Z Daily Blog Generator"
4. Trigger: Daily at 9:00 AM
5. Action: Start program
   - Program: `node`
   - Arguments: `"C:\Users\w\.antigravity\extensions\scripts\blog-automation\dist\generateDailyBlog.js"`
6. Advanced: Check "Run whether user is logged in or not"

### Step 4: Test It
```bash
npm run generate
```

✅ If successful, you'll see:
- Blog post generated
- Files saved to `src/content/blog/[slug]/`
- Blog index updated

## Daily Workflow

The system automatically:
1. ✅ **9:00 AM** - Generates new blog post targeting today's keyword
2. ✅ Creates 1800-2000 word article
3. ✅ Adds internal links to your tools
4. ✅ Optimizes for Google rankings
5. ✅ Saves as markdown + JSON metadata
6. ✅ Updates blog index

## Blog Post Topics (8-Day Rotation)

Each day targets a different keyword:
- **Day 1:** How to merge PDF files
- **Day 2:** Compress PDF without losing quality
- **Day 3:** Remove background from image AI
- **Day 4:** Best free PDF tools
- **Day 5:** PDF merger online free
- **Day 6:** Image compression tool free
- **Day 7:** Background remover online
- **Day 8:** Split PDF online
- *(Then cycle repeats)*

## What Gets Generated Per Post

✅ 1800-2000 words of unique content
✅ H2 headings (Introduction, Use Cases, Guide, Pro Tips, FAQ, Conclusion)
✅ 8-10 FAQ questions
✅ Internal links to related tools
✅ SEO meta description
✅ Target keywords (5-7 natural mentions)
✅ Reading time estimate
✅ Markdown + JSON format

## File Structure Created

```
src/
├── content/
│   ├── blog/
│   │   ├── how-to-merge-pdf-files/
│   │   │   ├── metadata.json
│   │   │   └── content.md
│   │   ├── compress-pdf-without-losing-quality/
│   │   │   ├── metadata.json
│   │   │   └── content.md
│   │   └── [more posts...]
│   └── blog-index.json (automatically updated)
```

## Verify It's Working

### Check Recent Blog Posts
```bash
ls src/content/blog/
```

### Verify Latest Index Update
```bash
cat src/content/blog-index.json | head -20
```

### View Task Status (Windows)
1. Open Task Scheduler
2. Search for "PDFA2Z Daily Blog Generator"
3. Click to see last run time and status

## Expected Results

**After 1 month:**
- 30 new blog posts
- ~50,000 words of new content
- 8 different keywords being targeted
- Foundation for organic traffic growth

**After 3 months:**
- 90+ blog posts published
- ~150,000 words of content
- Multiple keywords ranking in top 10
- Significant organic traffic increase

## Monthly Content Value

At $0.15-0.30 per post:
- **Daily cost:** ~$4.50-9.00 for automated content
- **Monthly:** ~$135-270 for 30 new, high-quality SEO posts
- **Typical agency cost:** $2,000-5,000/month for equivalent content

## Customization

### Change Daily Time
Edit `deploy-windows-scheduler.ps1`:
```powershell
-Time "14:00"  # 2:00 PM instead
```

### Change Keywords Targeted
Edit `generateDailyBlog.ts` - modify `BLOG_TEMPLATES` array:
```typescript
const BLOG_TEMPLATES = [
  {
    keyword: "your custom keyword",
    category: "Category",
    relatedTools: ["tool1", "tool2"],
    description: "What this post covers",
  },
];
```

### Change Post Length
In `generateDailyBlog.ts` prompt, change:
```
- Length: 2500-3000 words  // Instead of 1800-2000
```

## Troubleshooting

**Task not running?**
- Check Windows Task Scheduler → History tab
- Verify API key is set in wrapper script
- Run manually: `npm run generate`

**Posts not saving?**
- Verify directory exists: `src/content/blog/`
- Check file permissions
- Run `npm run generate` manually to see errors

**API Key Error?**
- Edit wrapper script with your API key
- Or use automatic deployment script

**Posts look similar?**
- They shouldn't - Claude generates unique content daily
- Each day targets different keyword and use cases
- Check blog index to verify different posts each day

## Stop/Pause Automation

### Disable Task (Pause)
```powershell
Disable-ScheduledTask -TaskName "PDFA2Z Daily Blog Generator"
```

### Re-enable Task
```powershell
Enable-ScheduledTask -TaskName "PDFA2Z Daily Blog Generator"
```

### Remove Task (Stop)
```powershell
Unregister-ScheduledTask -TaskName "PDFA2Z Daily Blog Generator"
```

## Monitor Performance

### View Generated Post
```bash
# Today's post (most recent)
cat src/content/blog-index.json | head -5
```

### Check API Usage
Your Claude API dashboard shows:
- Tokens used per day
- Cost per month
- Model usage

## Next: Publishing Integration

Once blog posts are generating automatically, integrate with:

1. **Website Publishing**
   - Auto-upload to your blog CMS
   - Trigger website rebuild

2. **Search Console**
   - Submit sitemap
   - Track keyword rankings

3. **Social Media**
   - Auto-post summaries to Twitter/LinkedIn
   - Link to full blog posts

4. **Email List**
   - Send daily digest to subscribers
   - Drive traffic to new posts

## Support Commands

```bash
# Test generation
npm run generate

# Build TypeScript
npm run build

# Check logs
Get-EventLog -LogName Application -Source "Task Scheduler" -Newest 10
```

## Done! 🎉

Your automated blog publishing system is now active. Check back tomorrow at 9:00 AM to see your first auto-generated blog post!

**Key Metrics to Track:**
- Posts generated: X per month
- Organic traffic: Monitor Google Search Console
- Keyword rankings: Track in SEMrush/Ahrefs
- Engagement: Blog analytics (bounce rate, time on page)

---

**Questions?** Check SETUP.md for detailed configuration options.
