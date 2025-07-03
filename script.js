{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red242\green139\blue64;\red35\green37\blue38;\red219\green219\blue223;
\red134\green196\blue255;\red99\green112\blue125;\red238\green88\blue85;\red91\green165\blue255;}
{\*\expandedcolortbl;;\cssrgb\c96471\c61569\c31373;\cssrgb\c18431\c19216\c20000;\cssrgb\c88627\c88627\c89804;
\cssrgb\c58824\c81569\c100000;\cssrgb\c46275\c51373\c56471;\cssrgb\c95686\c43922\c40392;\cssrgb\c42353\c71373\c100000;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf2 \cb3 \expnd0\expndtw0\kerning0
document\cf4 .addEventListener(\cf5 'DOMContentLoaded'\cf4 , () => \{\
\
    \cf6 // --- Theme Toggling Functionality ---\cf4 \
    \cf7 const\cf4  themeToggle = \cf2 document\cf4 .getElementById(\cf5 'theme-toggle'\cf4 );\
\
    \cf6 // Function to apply the saved theme on page load\cf4 \
    \cf7 const\cf4  applyTheme = () => \{\
        \cf7 const\cf4  savedTheme = \cf2 localStorage\cf4 .getItem(\cf5 'theme'\cf4 );\
        \
        \cf6 // Check for saved theme in localStorage. If none, check OS preference.\cf4 \
        \cf7 if\cf4  (savedTheme === \cf5 'dark'\cf4  || (!savedTheme && \cf2 window\cf4 .matchMedia(\cf5 '(prefers-color-scheme: dark)'\cf4 ).matches)) \{\
            \cf2 document\cf4 .body.classList.add(\cf5 'dark-mode'\cf4 );\
        \} \cf7 else\cf4  \{\
            \cf2 document\cf4 .body.classList.remove(\cf5 'dark-mode'\cf4 );\
        \}\
    \};\
\
    \cf6 // Add click event listener to the toggle button\cf4 \
    themeToggle.addEventListener(\cf5 'click'\cf4 , () => \{\
        \cf2 document\cf4 .body.classList.toggle(\cf5 'dark-mode'\cf4 );\
        \
        \cf6 // Save the user's preference to localStorage\cf4 \
        \cf7 if\cf4  (\cf2 document\cf4 .body.classList.contains(\cf5 'dark-mode'\cf4 )) \{\
            \cf2 localStorage\cf4 .setItem(\cf5 'theme'\cf4 , \cf5 'dark'\cf4 );\
        \} \cf7 else\cf4  \{\
            \cf2 localStorage\cf4 .setItem(\cf5 'theme'\cf4 , \cf5 'light'\cf4 );\
        \}\
    \});\
\
    \cf6 // Apply the theme when the page loads\cf4 \
    applyTheme();\
\
\
    \cf6 // --- Apple-like "Fade on Scroll" Animation ---\cf4 \
    \cf7 const\cf4  revealElements = \cf2 document\cf4 .querySelectorAll(\cf5 '.reveal'\cf4 );\
    \cf7 const\cf4  observer = \cf7 new\cf4  IntersectionObserver((entries) => \{\
        entries.forEach(entry => \{\
            \cf7 if\cf4  (entry.isIntersecting) \{\
                entry.target.classList.add(\cf5 'active'\cf4 );\
                observer.unobserve(entry.target);\
            \}\
        \});\
    \}, \{\
        \cf8 threshold\cf4 : \cf8 0.1\cf4 \
    \});\
\
    revealElements.forEach(el => \{\
        observer.observe(el);\
    \});\
\
\});}