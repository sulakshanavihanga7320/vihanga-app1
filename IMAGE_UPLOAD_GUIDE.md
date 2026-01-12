# Profile Image Upload Guide

## How to Upload Your Profile Photo

### Step 1: Navigate to Your Profile
- Click the **user avatar** in the top navigation bar
- Or go to `/profile` directly
- You'll see a "Profile Settings" page

### Step 2: Upload Your Photo
1. Click the **"Upload"** button in the "Profile Photo" section
2. Select an image from your computer
   - **Supported formats:** JPG, PNG, GIF, WebP
   - **Max file size:** 5MB
   - **Best dimensions:** Square image (1:1 ratio) for best results

### Step 3: Save Your Changes
- Click the **"Save Changes"** button at the bottom
- You'll see a **"Profile updated successfully!"** message

### Where Your Photo Appears
Your uploaded profile photo will automatically display in these places:

1. **About Me Section** - Large profile image with gradient overlay
2. **Profile Settings** - Avatar preview at the top
3. **Profile Card** - User avatar badge

## Features

✅ **Instant Updates** - Changes save immediately to localStorage  
✅ **Profile Persistence** - Your photo stays saved even after closing the browser  
✅ **Size Validation** - Automatic validation for file size (max 5MB)  
✅ **Image Optimization** - Photos are converted to base64 for storage  
✅ **Error Handling** - Clear error messages if something goes wrong  

## Tips

- **Square images work best** - They display better in the avatar circles
- **Upload high-quality photos** - Use at least 400x400px for crisp display
- **Keep file size small** - Compress images before uploading for faster load times
- **Replace anytime** - Simply upload a new image to replace the old one

## Technical Details

- Profile photos are stored in **localStorage** under `userProfile` JSON object
- Images are encoded as **base64 data URLs** for browser storage
- Maximum storage size depends on your browser's localStorage limit (~5-10MB per domain)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Image won't upload | Check if file is under 5MB |
| Photo doesn't appear | Click "Save Changes" button |
| File size error | Compress your image and try again |
| Lost my photo | Clear browser cache/cookies can reset it |

---

**Happy uploading!** 📸
