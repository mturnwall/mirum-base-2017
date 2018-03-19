function doSomething() {
    // console.log('Bang Bang Yo!');
}

window.addEventListener('DOMContentLoaded', function domLoad() {
    window.removeEventListener('DOMContentLoaded', domLoad);
    doSomething();
});
document.body.style.backgroundColor = 'blue';

// tell webpack this file is available for HMR
if (module.hot) {
    module.hot.accept();
}
