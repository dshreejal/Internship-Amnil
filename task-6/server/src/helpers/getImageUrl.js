const getImageUrl = (req, imageFileName) => {
    if (imageFileName === undefined) {
        return '';
    }

    if (imageFileName.startsWith('https://') || imageFileName.startsWith('http://')) {
        return imageFileName;
    }

    const url = req.protocol + '://' + req.get('host');
    return url + '/images/' + imageFileName;
}

module.exports = { getImageUrl };
