# Automated Daily Blog Publishing Setup

## Overview
This system automatically generates and publishes a new SEO-optimized blog post every day at 9:00 AM. Each post targets a different high-value keyword and is immediately ready for publication.

## Features
✅ Daily automated blog generation
✅ Rotating keyword targeting (8 different keywords)
✅ 1800-2000 word posts
✅ SEO-optimized with internal links
✅ Unique content each day
✅ Automatic blog index updates
✅ JSON + Markdown output format

## Prerequisites
- Node.js 16+
- npm or yarn
- ANTHROPIC_API_KEY environment variable set
- Access to your project's blog content directory

## Installation

### Step 1: Install Dependencies
```bash
cd scripts/blog-automation
npm install
```

### Step 2: Set Up API Key
Set your Anthropic API key as an environment variable:

**Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY = "your-api-key-here"
```

**Windows (Command Prompt):**
```cmd
set ANTHROPIC_API_KEY=your-api-key-here
```

**Mac/Linux:**
```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

**Permanent (Windows):**
1. Right-click "This PC" → Properties
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Click "New" under System variables
5. Variable name: `ANTHROPIC_API_KEY`
6. Variable value: Your API key

### Step 3: Test the Generator
```bash
npm run generate
```

This will generate one blog post and save it to your blog directory.

## Scheduling

### Option 1: Windows Task Scheduler (Recommended for Windows)

1. Open Task Scheduler (search for "Task Scheduler")
2. Click "Create Basic Task"
3. Name: "Daily Blog Generator"
4. Set trigger: Daily at 9:00 AM
5. Set action: Start a program
   - Program: `node`
   - Arguments: `"C:\Users\w\.antigravity\extensions\scripts\blog-automation\dist\generateDailyBlog.js"`
   - Start in: `C:\Users\w\.antigravity\extensions`
6. Set environment variable:
   - In the "General" tab of the task, check "Run whether user is logged in or not"
   - Set up the environment variable in the Run field:
   ```
   cmd.exe /c "set ANTHROPIC_API_KEY=your-key-here && node C:\Users\w\.antigravity\extensions\scripts\blog-automation\dist\generateDailyBlog.js"
   ```

### Option 2: Node-cron (In-App Scheduling)

Create a `scheduler.ts` file:
```typescript
import cron from 'node-cron';
import { execSync } from 'child_process';

// Run every day at 9:00 AM
cron.schedule('0 9 * * *', () => {
  console.log('Running daily blog generator...');
  try {
    execSync('npm run generate', { cwd: __dirname });
  } catch (error) {
    console.error('Blog generation failed:', error);
  }
});

console.log('Blog scheduler started. Running daily at 9:00 AM');
```

### Option 3: Linux/Mac Cron

Edit your crontab:
```bash
crontab -e
```

Add this line:
```bash
0 9 * * * cd /path/to/project/scripts/blog-automation && ANTHROPIC_API_KEY=your-key-here npm run generate >> /var/log/blog-generator.log 2>&1
```

## Blog Content Directory Structure

The generator expects this directory structure:
```
src/
├── content/
│   ├── blog/
│   │   ├── blog-post-slug-1/
│   │   │   ├── metadata.json
│   │   │   └── content.md
│   │   ├── blog-post-slug-2/
│   │   │   ├── metadata.json
│   │   │   └── content.md
│   └── blog-index.json
```

If these directories don't exist, update the paths in `generateDailyBlog.ts`.

## Configuration

### Customize Keywords
Edit `BLOG_TEMPLATES` array in `generateDailyBlog.ts`:

```typescript
const BLOG_TEMPLATES = [
  {
    keyword: "your custom keyword",
    category: "Category Name",
    relatedTools: ["tool1", "tool2"],
    description: "Description of what this post covers",
  },
  // Add more templates...
];
```

### Customize Schedule
Change the cron expression:
- `0 9 * * *` = Every day at 9:00 AM
- `0 18 * * *` = Every day at 6:00 PM
- `0 9 * * 1-5` = Weekdays only
- `0 9 1 * *` = First day of month

### Customize Publishing Time
Current posting topics rotate through 8 different keywords. Posts are published in this order:
1. How to merge PDF files
2. Compress PDF without losing quality
3. Remove background from image AI
4. Best free PDF tools
5. PDF merger online free
6. Image compression tool free
7. Background remover online
8. Split PDF online

Then the cycle repeats.

## Monitoring & Logging

### View Generation Logs
Windows Task Scheduler logs are in Event Viewer under:
Windows Logs → Application

### Manual Generation
To manually trigger a post:
```bash
npm run generate
```

### Check Blog Index
The blog index is updated automatically and saved to `src/content/blog-index.json`

## Troubleshooting

### "ANTHROPIC_API_KEY not set"
Make sure you've set the environment variable correctly. Restart your terminal/IDE for changes to take effect.

### "Cannot find module '@anthropic-ai/sdk'"
Run `npm install` in the blog-automation directory.

### "Blog directory not found"
Update the paths in `generateDailyBlog.ts` to match your project structure.

### Blog posts not being created
- Check that the task is running (Windows Task Scheduler → History tab)
- Check logs for error messages
- Manually run `npm run generate` to test
- Verify API key is valid

### Posts being generated but not published
- Check that blog content directory exists
- Verify directory permissions
- Check logs for path errors

## Performance

- Generation time: ~30-60 seconds per post
- API cost: ~$0.15-0.30 per post (depending on token usage)
- Daily cost estimate: ~$4.50-9.00/month for daily posts
- Storage: ~50KB per post (metadata + content)

## What Gets Generated

Each daily post includes:
- SEO-optimized title targeting main keyword
- H2 headings for all sections
- Introduction with keyword hook
- Use Cases section (4-5 scenarios)
- Step-by-Step Guide
- Pro Tips section
- FAQ section (8-10 questions)
- Conclusion with CTA
- Internal links to related tools
- Meta description (155-160 characters)
- Reading time estimate
- Full markdown formatting

## Next Steps

1. ✅ Install and test the generator
2. ✅ Set up scheduling (choose your preferred method)
3. ✅ Create blog content directory structure
4. ✅ Verify first automated post is generated
5. ✅ Monitor for 1 week to ensure consistency
6. ✅ Adjust keywords or timing as needed

## Expected Results

- **Month 1:** 30 new blog posts (~4,500-6,000 words of new content daily)
- **Month 2:** 60 new blog posts total, 8 keywords ranking
- **Month 3:** 90+ new blog posts, 15+ keywords in top 10

This consistent, automated content strategy should drive significant organic traffic growth within 90 days.

## Support

If you encounter issues:
1. Check that ANTHROPIC_API_KEY is set correctly
2. Verify directory structure matches expected paths
3. Run `npm run generate` manually to test
4. Check console output for specific error messages
5. Review logs in Event Viewer (Windows) or system logs (Linux/Mac)

