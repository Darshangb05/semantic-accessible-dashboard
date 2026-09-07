````markdown
# Semantic HTML5 & Accessible Component Architecture

An accessible enterprise dashboard built using semantic HTML5, CSS3 and vanilla JavaScript.

## Project Objective

The goal of this project is to create the structural foundation for an enterprise dashboard while following:

- HTML5 semantic standards
- WCAG 2.1 accessibility principles
- Keyboard accessibility
- Accessible forms
- Accessible tables
- Accessible modal dialogs
- Responsive design
- Maintainable project architecture

## Technologies

- HTML5
- CSS3
- JavaScript
- WCAG 2.1
- WAI-ARIA

## Project Structure

```text
accessible-dashboard/
│
├── index.html
├── users.html
├── reports.html
├── settings.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
└── README.md
````

## Semantic HTML5 Elements

The project uses:

* `<header>`
* `<nav>`
* `<main>`
* `<section>`
* `<article>`
* `<aside>`
* `<footer>`
* `<form>`
* `<fieldset>`
* `<legend>`
* `<table>`
* `<thead>`
* `<tbody>`
* `<th>`
* `<caption>`
* `<dialog>`

## Accessibility Features

### Skip Navigation

A skip link is provided:

```html
<a class="skip-link" href="#main-content">
    Skip to main content
</a>
```

This allows keyboard users to bypass repeated navigation.

### Navigation

Navigation landmarks use accessible labels:

```html
<nav aria-label="Primary navigation">
```

and:

```html
<nav aria-label="Sidebar navigation">
```

### Current Page

The current navigation item uses:

```html
aria-current="page"
```

### Forms

Every major form control has an associated `<label>`.

Example:

```html
<label for="email">
    Email address
</label>

<input
    id="email"
    name="email"
    type="email"
    required
    autocomplete="email">
```

### Form Grouping

Related controls are grouped using:

```html
<fieldset>
    <legend>Personal information</legend>
</fieldset>
```

### Tables

Tables use:

```html
<caption>
```

and scoped header cells:

```html
<th scope="col">
```

### Modal Dialog

The project uses the native HTML5 dialog element:

```html
<dialog
    aria-labelledby="modal-title">
```

The modal can be closed using:

* Close button
* Cancel button
* Escape key

### Keyboard Accessibility

All interactive controls are native:

* `<button>`
* `<a>`
* `<input>`
* `<select>`
* `<textarea>`

This provides native keyboard interaction.

### Focus Indicator

The CSS provides a visible focus indicator:

```css
:focus-visible {
    outline: 3px solid #f59e0b;
    outline-offset: 3px;
}
```

### Responsive Design

The dashboard adapts to:

* Desktop
* Tablet
* Mobile

## Running the Project

No build tools are required.

Open:

```text
index.html
```

in a modern browser.

For a better development experience, use VS Code with Live Server.

## Accessibility Testing

The project should be tested using:

1. W3C HTML Validator
2. Lighthouse
3. Keyboard-only navigation
4. Screen reader testing
5. Browser accessibility tree

## Keyboard Test

Use:

```text
Tab
Shift + Tab
Enter
Space
Escape
```

Verify that every interactive component can be operated without a mouse.

## W3C Validation

Open the W3C HTML Validator:

https://validator.w3.org/

Validate each HTML page:

* index.html
* users.html
* reports.html
* settings.html

The goal is zero HTML syntax errors.

## Accessibility Checklist

* [x] Semantic HTML5
* [x] `<header>`
* [x] `<nav>`
* [x] `<main>`
* [x] `<section>`
* [x] `<article>`
* [x] `<aside>`
* [x] `<footer>`
* [x] Accessible tables
* [x] Table captions
* [x] Form labels
* [x] Fieldsets
* [x] Legends
* [x] Required validation
* [x] Email validation
* [x] Date validation
* [x] Accessible modal
* [x] Keyboard support
* [x] Skip link
* [x] Focus indicators
* [x] Responsive layout
* [x] ARIA navigation labels
* [x] Current navigation state

## Future Improvements

Possible production improvements include:

* Backend authentication
* Database integration
* Server-side form validation
* Real user management
* Pagination
* Sorting
* Advanced filtering
* Screen-reader announcements
* Automated accessibility tests
* Unit tests
* End-to-end tests

```
```
