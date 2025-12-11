# How to Add Your Profile Picture

## Steps to Add Your Profile Picture:

1. **Prepare Your Image:**
   - Use a high-quality square image (recommended: 400x400px or larger)
   - Make sure it's a clear, professional headshot
   - Supported formats: JPG, PNG, WebP

2. **Add to Public Folder:**
   - Navigate to the `public` folder in your project
   - Add your image file and rename it to `profile-picture.jpg`
   - The file path should be: `public/profile-picture.jpg`

3. **Alternative Image Names:**
   If you want to use a different filename, update the `src` attribute in `Hero.js`:
   ```jsx
   <img 
     src="/your-image-name.jpg"  // Change this to your filename
     alt="Anishma RS Profile" 
     className="w-full h-full object-cover rounded-full"
   />
   ```

4. **Image Optimization Tips:**
   - Compress the image to reduce file size (use tools like TinyPNG)
   - Keep file size under 500KB for faster loading
   - Use WebP format for better compression if possible

## Current Setup:
- The component will automatically show your image when you add it
- If the image fails to load, it will fallback to showing "AR" initials
- The image will be automatically cropped to a perfect circle
- It will scale responsively for different screen sizes

## Testing:
1. Add your image to the public folder
2. Refresh your browser
3. Your profile picture should appear in the hero section
4. Test on different screen sizes to ensure it looks good

## Troubleshooting:
- If the image doesn't appear, check the file path and name
- Make sure the image is in the `public` folder, not `src`
- Check the browser console for any error messages
- Ensure the image file is not corrupted

