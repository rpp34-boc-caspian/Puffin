
export const getDate = (date) => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    var n = date.toLocaleDateString('en-US', options);
    return n;
}

