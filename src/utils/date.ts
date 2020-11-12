/**
 * Format a date object to a proper string that can be accepted by an input component with date type.
 */
export function formatDate(date?: string) {
    if (!date) return null;
    return new Date(date).toISOString().substring(0, 10);
}
