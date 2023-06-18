// https://web.dev/building-a-theme-switch-component/#javascript
const onClick = () => {
    theme.value = theme.value === 'light'
        ? 'dark'
        : 'light'
    setPreference()
}

const getColorPreference = () => {
    if (localStorage.getItem('theme-preference')) {
        return localStorage.getItem('theme-preference')
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    }
}

const setPreference = () => {
    localStorage.setItem('theme-preference', theme.value)
    reflectPreference()
}

const reflectPreference = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value)
    document.querySelector('.color-scheme-toggle')?.setAttribute('aria-label', theme.value)
    document.querySelector('.color-scheme-toggle img').setAttribute('src', theme.value === 'light' ? './images/icon-moon.svg' :  './images/icon-sun.svg')
}

const theme = {
    value: getColorPreference(),
  }
  
reflectPreference()

window.onload = () => {
    reflectPreference()

    document.querySelector('.color-scheme-toggle').addEventListener('click', onClick)
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches:isDark }) => {
    theme.value = isDark 
        ? 'dark' 
        : 'light'
    setPreference()
})