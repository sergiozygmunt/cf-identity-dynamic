# Static Access Denial Page

A simple, static HTML page using the GOV.UK Design System to display an access denial message for CCA Portal users with outstanding tasks.

## Features

- ✅ **GOV.UK Design System 5.13.0** loaded from private CDN (`govuk.prodcdn.com`)
- ✅ **Fully responsive** - works on mobile, tablet, and desktop
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **No build process** - pure HTML/CSS/JS
- ✅ **Fast loading** - minimal dependencies

## Usage

### Option 1: Standalone Static Page

Simply serve the `index.html` file from any web server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### Option 2: Cloudflare Workers Integration

Add to your Cloudflare Worker to serve this page conditionally:

```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Check if user has outstanding tasks
  const hasOutstandingTasks = await checkUserTasks(request);

  if (hasOutstandingTasks) {
    // Serve the static denial page
    return new Response(DENIAL_PAGE_HTML, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      },
    });
  }

  // Otherwise, allow access
  return fetch(request);
}

const DENIAL_PAGE_HTML = `
<!-- Paste the content of index.html here -->
`;
```

### Option 3: Cloudflare Pages

Deploy directly to Cloudflare Pages:

```bash
wrangler pages deploy static-denial-page --project-name=cca-denial-page
```

## Customization

### Change the Message

Edit the notification banner in `index.html`:

```html
<p class="govuk-notification-banner__heading">
  Your access has been denied because you have one or more tasks due in the CCA Portal.
</p>
```

### Change the Button Link

Update the button href:

```html
<a href="https://portal.coopalliance.org/my-phone-numbers" ...>
  Go to My Phone Numbers
</a>
```

### Change the Logo/Brand

Update the header section:

```html
<span class="govuk-header__logotype-text">CCA</span>
```

Or add a custom logo image:

```html
<img src="your-logo.png" alt="Your Logo" style="height: 40px;">
```

### Add Custom Colors

Add inline styles or a `<style>` block:

```html
<style>
  .govuk-header {
    background-color: #003078; /* Custom header color */
  }

  .govuk-button {
    background-color: #00703c; /* Custom button color */
  }
</style>
```

## Components Used

This page uses the following GOV.UK Design System components:

- **Header** - Top navigation bar
- **Notification Banner** - Alert message (Important role)
- **Button** - Primary call-to-action
- **Section Break** - Visual separator
- **Details** - Collapsible help section
- **Lists** - Numbered and bulleted lists
- **Footer** - Page footer with links

## File Structure

```
static-denial-page/
├── index.html          # Main page
├── README.md          # This file
└── preview.png        # (Optional) Screenshot
```

## Browser Support

Follows GOV.UK Design System browser support:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## Accessibility

This page follows GOV.UK accessibility standards:

- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Color contrast WCAG 2.1 AA compliant

## Testing

Test the page:

1. Open `index.html` in a browser
2. Verify the notification banner displays correctly
3. Test the button link (should go to `https://portal.coopalliance.org/my-phone-numbers`)
4. Test responsive design (resize browser window)
5. Test keyboard navigation (Tab, Enter, Space)
6. Test with screen reader if possible

## CDN Configuration

**GOV.UK Design System Version**: 5.13.0
**CDN URL**: `https://govuk.prodcdn.com/5.13.0/`

Assets loaded:
- CSS: `govuk-frontend-5.13.0.min.css`
- JavaScript: `govuk-frontend-5.13.0.min.js`
- Fonts: GDS Transport (light 400, bold 700)

## Support

For issues or questions:
- Email: support@coopalliance.org
- Portal: https://portal.coopalliance.org

## License

This page template uses the GOV.UK Design System which is available under the MIT License.
