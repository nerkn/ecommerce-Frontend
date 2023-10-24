
export function newDate() {
    return new Date().toJSON().replaceAll(/[TZ]/g, ' ').substring(0, 19)
}