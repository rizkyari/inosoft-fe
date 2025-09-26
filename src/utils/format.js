export const formatDate = (d) => d || '-';
export const statusVariant = (status) => {
    switch ((status || '').toLowerCase()) {
        case 'open': return 'warning';
        case 'for review': return 'info';
        case 'completed': return 'success';
        default: return 'secondary';
    }
};