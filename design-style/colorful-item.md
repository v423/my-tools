Based on the image provided, here is a comprehensive **UI Style Guide**. This design system utilizes a warm, organic color palette mixed with modern, flat UI principles. It balances functionality with a friendly, approachable aesthetic.

-----

# 🎨 Project Style Guide & Design System

## 1\. Overview

  * **Aesthetic:** Warm, Organic, Flat, approachable.
  * **Key Characteristics:** Soft rounded corners, earthy tones (coral/olive), distinct active states, and high legibility.
  * **Use Case:** Suitable for SaaS dashboards, e-commerce user accounts, or lifestyle applications.

-----

## 2\. Color Palette

The system uses a warm background with high-contrast "Coral" for primary actions and "Olive" for secondary/active states.

### Primary Colors

  * **Coral Orange (Primary Action):** `#FF7254`
      * *Usage:* Call-to-action buttons, active toggles, warning alerts, donut chart segments.
  * **Light Coral (Hover/Backgrounds):** `#FF8A70` (Estimated lighter shade)
  * **Deep Olive (Secondary/Active):** `#3A4A40`
      * *Usage:* Active tab backgrounds, dark buttons, toggle switches (off state), text headers.

### Neutral & Surface Colors

  * **Cream Beige (Main Background):** `#F4EFE6`
      * *Usage:* App background, page canvas.
  * **Pure White (Component Surface):** `#FFFFFF`
      * *Usage:* Input fields, card backgrounds, dropdown menus.
  * **Light Gray (Borders/Dividers):** `#E0E0E0`
  * **Dark Gray (Body Text):** `#4A4A4A`

### Status Colors

  * **Success Green:** `#6BAF68` (Visible in the "Success\!" alert).
  * **Warning/Error:** Uses the **Primary Coral** `#FF7254` (The design leans on the primary color for warnings rather than a standard distinct red).

-----

## 3\. Typography

The typography is clean and sans-serif.

  * **Font Family Recommendation:** *Poppins* (for headings) and *Inter* or *DM Sans* (for body).

| Role | Weight | Size (Est) | Usage |
| :--- | :--- | :--- | :--- |
| **Heading 1** | Bold (700) | 32px | Page Titles, Hero text |
| **Heading 2** | SemiBold (600) | 24px | Card Titles, Section Headers |
| **Button Text** | Medium (500) | 14px/16px | Buttons, Tabs, Navigation |
| **Body Regular** | Regular (400) | 14px | General content, Input text |
| **Label/Caption**| Medium (500) | 12px | Form labels, Tooltips, Step indicators |

-----

## 4\. Border Radius System

The design uses three distinct radius tiers to create hierarchy.

  * **`radius-sm` (4px-6px):** Checkboxes, small tags, inner input elements.
  * **`radius-md` (8px-10px):** Buttons, Input fields, Cards (Alerts), Dropdown containers.
  * **`radius-full` (9999px):** Search bars, Pills, Status badges, Toggle switches, Circular avatars.

-----

## 5\. Component Styles

### Buttons

  * **Primary Button:**
      * Background: Coral Orange (`#FF7254`)
      * Text: White
      * Radius: `radius-md`
  * **Secondary/Dark Button:**
      * Background: Deep Olive (`#3A4A40`)
      * Text: White
      * Radius: `radius-md`
  * **Outline/Ghost Button:**
      * Border: 1px solid Coral Orange
      * Text: Coral Orange
      * Background: Transparent

### Inputs & Forms

  * **Default State:** White background, Light Gray border (`1px`), Text Dark Gray.
  * **Active/Focus State:** Border color changes to Coral Orange (`#FF7254`). No heavy glowing ring (flat design).
  * **Search Bar:** Fully rounded (`radius-full`), Left icon, Clean look.
  * **Checkbox/Radio:**
      * Checkbox: Square with `radius-sm`. Checked state is solid Orange with white tick.
      * Radio/Toggle: Pill shape. Active is Orange circle on right.

### Navigation (Tabs)

  * **Inactive Tab:** Dark background (`#3A4A40`), White text.
  * **Active Tab:** Coral Orange background (`#FF7254`), White text.
  * *Note:* This reverses the usual pattern (usually active is light), giving the UI a unique heavy-contrast look.

### Progress & Steps

  * **Stepper:** Lines connect circles.
      * *Completed:* Solid circle with checkmark (Green/Orange).
      * *Current:* Solid circle with number.
      * *Future:* Outline circle.
  * **Sliders:** Thin track (Gray/Red striped for unavailable), Solid circle thumb.

-----

## 6\. Shadows & Elevation

The design is predominantly **Flat**. Shadows are used very sparingly.

  * **Base Level:** No shadow.
  * **Dropdowns/Tooltips:** Soft, diffuse shadow to separate from background.
      * `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);`
  * **Cards/Alerts:** Flat color backgrounds, no shadow (relying on color contrast).

-----

## 7\. Animations & Transitions

Since this is a static kit, here are the recommended interactions:

  * **Hover Effects:** Buttons should lighten slightly (10% opacity white overlay) or lift 1px.
  * **Inputs:** Transition `border-color` over `0.2s ease-in-out`.
  * **Toggles:** Smooth slide of the circle knob over `0.3s cubic-bezier`.
  * **Donut Charts:** On load, the stroke should animate (fill) circularly.

-----

## 8\. Opacity & Transparency

  * **Disabled States:** 50% Opacity on the element.
  * **Modals/Overlay:** Dark Olive (`#3A4A40`) at 60% opacity for the backdrop.

-----

## 9\. Common Tailwind CSS Usage

Based on the analysis, here is a mapping to Tailwind utility classes you would frequent in this project:

  * **Colors (Custom Config Required):**
      * `bg-coral-500` (Primary)
      * `bg-olive-800` (Secondary)
      * `bg-cream-100` (Page Bg)
  * **Radius:** `rounded-md` (Buttons), `rounded-full` (Search/Pills).
  * **Flexbox:** `flex items-center justify-between gap-4`.
  * **Typography:** `font-sans text-sm font-medium text-gray-700`.
  * **Inputs:** `border border-gray-300 focus:border-coral-500 focus:ring-0`.

-----

## 10\. Example Component Reference Code

Here is how you would build the **"Success\!" Alert Box** (bottom left of image) and a **Primary Button** using Tailwind CSS.

```html
<div class="bg-[#F4EFE6] p-10 font-sans min-h-[300px] flex flex-col gap-8 items-start">

  <button class="px-6 py-3 bg-[#FF7254] hover:bg-[#ff8a70] text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
    Big button
  </button>

  <div class="w-full max-w-lg bg-[#6BAF68] text-white rounded-lg p-6 relative shadow-md">
    <button class="absolute top-4 right-4 text-white/80 hover:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>

    <h3 class="text-lg font-bold mb-2">Success!</h3>
    
    <p class="text-sm opacity-90 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia, elit sit amet pulvinar convallis, odio quam venenatis dolor.
    </p>
  </div>

  <div class="w-full max-w-xs">
    <label class="block text-xs font-bold text-gray-500 mb-1 ml-1">Search</label>
    <div class="relative">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-[#FF7254]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input type="text" placeholder="Search..." 
        class="w-full py-3 pl-10 pr-4 bg-white border border-transparent rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#FF7254] focus:ring-1 focus:ring-[#FF7254]"
      />
    </div>
  </div>

</div>
```

### Code Implementation Notes:

1.  **Hardcoded Colors:** In a real project, you should add `#FF7254`, `#3A4A40`, etc., to your `tailwind.config.js`.
2.  **Iconography:** The design uses simple line icons. Heroicons or Phosphor Icons would be a good match.
3.  **Typography:** The example assumes the default sans font, but applying `font-family: 'Poppins', sans-serif` would match the image perfectly.

### Next Step

Would you like me to generate a **React/Vue component file** for any specific element in this image (e.g., the "Progress Steps" or the "Donut Chart" section)?