export default function IdGenerator() {
    return Math.random().toString(16).slice(3)
}