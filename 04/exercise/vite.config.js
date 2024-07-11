// vite.config.js
export default {
    // config options
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST')
    },
    build:
    {
        outDir: '..dist',
        emptyOutDir: true,
        sourcemap: true
    },
}