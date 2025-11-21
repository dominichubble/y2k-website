# CMS Setup Instructions

## 🎉 Your CMS is Ready!

I've set up **Decap CMS** for your portfolio. Here's how to use it:

## 📝 What You Can Edit

Your CMS at `/admin` lets you manage:

✅ **Profile** - Personal info, bio, social links, profile image
✅ **Experience** - Add/edit work history, internships, roles
✅ **Projects** - Manage portfolio projects, tech stack, links
✅ **Skills** - Technical & soft skills, achievements
✅ **Blog** - Write and publish blog posts with markdown

## 🚀 Setup Steps

### Option 1: Deploy to Netlify (Recommended - 5 minutes)

1. **Deploy to Netlify**
   ```bash
   # If not already deployed, push to GitHub first
   git add .
   git commit -m "Add Decap CMS"
   git push
   ```

2. **Enable Netlify Identity**
   - Go to your Netlify dashboard
   - Navigate to: Site Settings → Identity → Enable Identity
   - Settings → Registration → Invite only (recommended)
   - Services → Enable Git Gateway

3. **Invite Yourself**
   - Identity tab → Invite users
   - Enter your email
   - Check email and set password

4. **Access CMS**
   - Visit: `https://yourdomain.com/admin`
   - Login with your email/password
   - Start editing! 🎨

### Option 2: Local Development (For Testing)

1. **Install Decap CMS Proxy**
   ```bash
   npm install -g decap-server
   ```

2. **Update config.yml** (uncomment line 5):
   ```yaml
   local_backend: true
   ```

3. **Run proxy server**:
   ```bash
   npx decap-server
   ```

4. **Start your dev server**:
   ```bash
   npm run dev
   ```

5. **Access**: `http://localhost:5173/admin`

## 📚 How to Use the CMS

### Editing Content
1. Navigate to `/admin`
2. Login
3. Select a collection (Profile, Experience, Projects, etc.)
4. Click on an entry to edit
5. Make your changes
6. Click "Save" (saves as draft)
7. Click "Publish" to commit to GitHub

### Adding New Items
- **New Experience**: Experience → Click "New Experience"
- **New Project**: Projects → Click "New Project"  
- **New Blog Post**: Blog → Click "New Post"

### Rich Text Editing
- Blog posts support full markdown
- Live preview available
- Insert images, code blocks, links

### Media Management
- Upload images via the media library
- Images saved to `public/assets/`
- Automatically optimized paths

## 🎨 Features

✨ **Auto-save** - Drafts saved automatically
✨ **Preview** - See changes before publishing
✨ **Version Control** - All changes committed to Git
✨ **Media Library** - Centralized image management
✨ **Markdown Editor** - Rich text with preview
✨ **Validation** - Required fields enforced
✨ **Search** - Find content quickly

## 🔒 Security

- **Invite-only** access (recommended setting)
- **Git-based** - All changes tracked
- **No database** - Files are source of truth
- **Netlify Identity** - Secure authentication

## 📖 Common Tasks

### Change Profile Picture
1. Go to Profile → Personal Information
2. Click "Profile Image"
3. Upload new image
4. Save & Publish

### Add New Job
1. Go to Experience
2. Click "New Experience"
3. Fill in all fields
4. Set "Present" for current roles
5. Save & Publish

### Write Blog Post
1. Go to Blog
2. Click "New Post"
3. Write in markdown
4. Add tags and category
5. Set featured if top post
6. Preview before publishing

## 🛠️ Customization

The CMS config is at: `public/admin/config.yml`

You can customize:
- Field labels and hints
- Required fields
- Dropdown options
- Validation rules
- Widget types

## 📱 Mobile Access

The CMS works on mobile devices:
- Responsive interface
- Edit on-the-go
- Upload photos directly

## ⚙️ Next Steps

1. Deploy to Netlify
2. Enable Identity & Git Gateway
3. Invite yourself as admin
4. Login and test editing
5. Publish your first change!

## 🆘 Need Help?

- **CMS not loading?** Check browser console
- **Can't login?** Verify Identity is enabled in Netlify
- **Changes not showing?** Clear cache and rebuild
- **Git Gateway error?** Re-enable in Netlify settings

Enjoy your new CMS! 🚀
