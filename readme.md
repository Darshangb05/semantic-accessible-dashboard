# Architecture

## Project

Accessible E-Commerce Store is a client-side production capstone
that combines semantic HTML, responsive CSS, JavaScript modules,
REST API integration and persistent browser state.

## Architecture

```text
Browser
   |
   v
HTML Pages
   |
   v
JavaScript Modules
   |
   +---- API Layer
   |       |
   |       v
   |   Fake Store API
   |
   +---- State Layer
           |
           v
       localStorage
