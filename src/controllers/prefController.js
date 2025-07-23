exports.darkMode = (req, res) => {
    res.cookie('darkMode', !res.locals.darkMode);
    const referer = req.headers.referer || '/';
    return res.redirect(referer);
};

// exports.language = (req, res) => {

//     const options = [
//         { value: 'pt-br', label: 'Português' },
//         { value: 'en-us', label: 'Inglês' },
//         { value: 'es-sp', label: 'Español' }
//     ];
//     res.render('index', { options }); // Envia para o EJS}

// };