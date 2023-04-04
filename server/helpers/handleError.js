exports.customer = (err, res) => {
    let msg = ''
    console.log(err);

    if(err.code === 11000) {
        msg = 'Email has exist';
    }

    res.status(400).send({
        status: 'Sign up failed',
        error: msg
    });
}