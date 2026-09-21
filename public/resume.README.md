# Resume setup (Google Drive — recommended)

The navbar **Resume** button and the ⌘K "Open resume" command both read
`resumeUrl` in `data/profile.ts`, currently a Drive share-link placeholder.

## One-time setup (2 minutes)

1. Upload your resume PDF to Google Drive.
2. Right-click → **Share** → General access → **"Anyone with the link"**
   (role: Viewer).
3. Click **Copy link**. It looks like:
   `https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing`
4. Paste it as `resumeUrl` in `data/profile.ts`. Done.

## Updating your resume later (no portfolio changes)

Do **NOT** upload a new file and paste a new link. Instead:

1. In Drive, right-click the existing resume file → **Manage versions**.
2. **Upload new version** → select the new PDF.

The share link stays byte-identical forever, so the website keeps working
with zero edits or redeploys.

## Why Drive instead of `public/resume.pdf`?

- Update the resume without touching code or redeploying.
- Recruiters get Drive's familiar preview + download UI.
- (Alternative: commit the PDF to `public/resume.pdf` and set
  `resumeUrl: "/resume.pdf"`. Works offline of Google, but every update
  needs a commit + redeploy.)

## Photo or no photo?

No photo. For tech internships/placements, photos add nothing and can
break RWKV parsing or trigger unconscious-bias screening. Keep the resume
one page, text-only, no photo — unless a specific application explicitly
asks for one.
