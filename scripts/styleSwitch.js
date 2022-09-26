getStyle = (key, def) => {
    if (localStorage.getItem(key)) return localStorage.getItem(key);
    return def;
}

setStyle = (key, val) => {
    localStorage.setItem(key, val);
}

updateStyle = (key, def) => {
    document.firstElementChild.setAttribute(key, getStyle(key, def));
}

toggleStyle = (key, a, b) => {
    let style = getStyle(key, a) == a ? b : a;
    setStyle(key, style);
    updateStyle(key);
}
