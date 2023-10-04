const getImageUrl = (req, imageFileName) => {
    const url = req.protocol + '://' + req.get('host');
    return url + '/images/' + imageFileName;
}

module.exports = { getImageUrl };
