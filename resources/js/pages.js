export const createPages = () => {
    const localPages = import.meta.glob([
        './Pages/**/*.vue',
    ], { eager: true })
    let pages = {}
    Object.entries(localPages).forEach(([path, definition]) => {
        const name = path.replace('./Pages/', '')
            .replace('.vue', '')
        pages[name] = definition.default
    })
    return pages
}
