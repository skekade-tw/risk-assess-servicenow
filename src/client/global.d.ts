// handles importing scss as modules
declare module '*.scss' {
    const content: string
    export default content
}

// handles importing the prebuilt library's css
declare module '*.css'
