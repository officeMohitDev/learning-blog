export const formateBlogDate = (dateString: string) => {
    const date = new Date(dateString); // Create a Date object from the ISO string

    // Months array for converting month index to month name
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get day, month, and year
    const day = date.getDate(); // Get the day of the month (1-31)
    const monthIndex = date.getMonth(); // Get the month index (0-11)
    const year = date.getFullYear(); // Get the year

    // Format the date string
    const formattedDate = `${day} ${months[monthIndex]} ${year}`;

    return formattedDate;
};