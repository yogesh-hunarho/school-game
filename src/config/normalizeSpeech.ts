export const normalizeSpeech = (text: string) => {
    return text
        .replace(/([.,!?])/g, '$1 ') // smooth micro pauses
        .replace(/\s+/g, ' ')
        .trim()
}
