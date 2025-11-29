# Static Denial Page Variants

This directory contains two variants of the CCA Portal access denial page, both using the GOV.UK Design System.

## 📄 Variant 1: Standard Notification Style
**File**: `index.html`

### Features:
- ✅ Clean, minimal design
- ✅ GOV.UK Notification Banner (grey/neutral)
- ✅ Standard GOV.UK Button
- ✅ Numbered list for instructions
- ✅ Collapsible help section

### Use When:
- You want a professional, understated approach
- The denial is informational rather than urgent
- You prefer standard GOV.UK patterns

### Preview:
```
┌─────────────────────────────────────┐
│ CCA Header                          │
└─────────────────────────────────────┘

  Access Denied

  ┌───────────────────────────────────┐
  │ Important                         │
  │ Your access has been denied       │
  │ because you have one or more      │
  │ tasks due in the CCA Portal.      │
  └───────────────────────────────────┘

  [Go to My Phone Numbers]

  What happens next?
  1. Click the button above...
  2. Complete any outstanding tasks...
  3. Access will be restored...
```

---

## ⚠️ Variant 2: Enhanced Warning Style
**File**: `index-warning-style.html`

### Features:
- ✅ Prominent warning panel with yellow highlight
- ✅ GOV.UK Panel (blue confirmation panel)
- ✅ Large "Start" button with arrow icon
- ✅ GOV.UK Inset Text for support info
- ✅ Detailed contact information in Summary List
- ✅ More visual hierarchy and emphasis

### Use When:
- You want to grab immediate attention
- The action is time-sensitive or urgent
- You need stronger visual cues
- Users frequently miss the denial message

### Preview:
```
┌─────────────────────────────────────┐
│ CCA Header                          │
└─────────────────────────────────────┘

  Action Required
  Access Denied

  ┌───────────────────────────────────┐
  │ ⚠️  You have one or more tasks    │
  │     due in the CCA Portal         │
  │                                   │
  │  Your access has been temporarily │
  │  restricted...                    │
  └───────────────────────────────────┘

  ┌───────────────────────────────────┐
  │        Complete Your Tasks        │
  │                                   │
  │ Access the CCA Portal to view and │
  │ complete your outstanding...      │
  └───────────────────────────────────┘

  [Go to My Phone Numbers →]

  What you need to do
  1. Click the button above...
  2. Review your tasks...
  3. Complete all tasks...
  4. Access restored...
```

---

## Comparison Table

| Feature | Standard | Warning Style |
|---------|----------|---------------|
| **Visual Impact** | Minimal | High |
| **GOV.UK Panel** | No | Yes (blue) |
| **Warning Highlight** | No | Yes (yellow) |
| **Button Style** | Standard | Start (with arrow) |
| **File Size** | ~6KB | ~8KB |
| **Support Details** | Basic | Detailed (hours, summary list) |
| **Urgency Level** | Low-Medium | Medium-High |
| **Best For** | General use | Time-sensitive actions |

---

## Choosing the Right Variant

### Use **Standard** (`index.html`) if:
- ✅ You have a mixed audience with varying tech literacy
- ✅ The denial is routine and not urgent
- ✅ You prefer GOV.UK's default, proven patterns
- ✅ You want the lightest page weight

### Use **Warning Style** (`index-warning-style.html`) if:
- ✅ Users frequently miss or ignore the denial
- ✅ There are serious consequences to not taking action
- ✅ The task is time-sensitive
- ✅ You need stronger visual differentiation from other pages
- ✅ You want to emphasize the importance immediately

---

## Customization Guide

Both variants can be easily customized:

### Change the Message
Both files have clearly marked sections:

```html
<!-- Notification Banner / Warning Panel -->
<p class="govuk-notification-banner__heading">
  Your access has been denied because you have one or more tasks due...
</p>
```

### Change the Button Text
```html
<a href="https://portal.coopalliance.org/my-phone-numbers" ...>
  Go to My Phone Numbers  <!-- Change this text -->
</a>
```

### Change the Button Link
```html
<a href="https://portal.coopalliance.org/my-phone-numbers" ...>
              ↑ Change this URL
```

### Change Colors
For standard variant:
```html
<style>
  .govuk-header {
    background-color: #003078; /* Custom header */
  }
</style>
```

For warning variant - the panel colors are already customized:
```html
<style>
  .warning-panel {
    background-color: #fff7e6;  /* Yellow tint */
    border-left: 5px solid #ffbf47;  /* Yellow border */
  }
</style>
```

---

## A/B Testing Recommendation

If you're unsure which to use, consider A/B testing:

1. **Deploy both versions** to different routes
2. **Track metrics**:
   - Click-through rate on the button
   - Time to task completion
   - Support ticket volume
3. **Measure success** over 2-4 weeks
4. **Choose the winner** based on data

### Suggested Split:
- Standard: 50% of users
- Warning: 50% of users

### Success Metrics:
- Higher click-through rate on "Go to My Phone Numbers"
- Lower bounce rate
- Faster task completion
- Fewer "I didn't see the message" support tickets

---

## Integration Examples

### Cloudflare Workers - Conditional Routing

```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const hasOutstandingTasks = await checkUserTasks(request);

  if (hasOutstandingTasks) {
    const isHighPriority = await checkTaskPriority(request);

    // Serve warning style for high priority
    if (isHighPriority) {
      return new Response(WARNING_STYLE_HTML, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    // Serve standard for normal priority
    return new Response(STANDARD_HTML, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  return fetch(request);
}
```

### Cloudflare Access Policy

```javascript
// In your Access policy
{
  "decision": "non_identity",
  "include": [
    {
      "group": {
        "id": "users-with-outstanding-tasks"
      }
    }
  ],
  "custom_pages": {
    "forbidden": "https://your-domain.com/static-denial-page/index.html"
  }
}
```

---

## Files in This Directory

```
static-denial-page/
├── index.html                    # Standard notification variant
├── index-warning-style.html      # Enhanced warning variant
├── README.md                     # Setup and usage guide
└── VARIANTS.md                   # This file - variant comparison
```

---

## Support

Questions? Contact:
- Email: support@coopalliance.org
- Portal: https://portal.coopalliance.org

Both variants are production-ready and fully accessible! 🎉
