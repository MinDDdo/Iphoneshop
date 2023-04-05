exports.customer = (err, res) => {
    let msg = '';
    let status = '';
    console.log(err);

    if(err.code === 11000) {
        msg = 'Email has exist';
        status = 'Sign up failed'
    }

    if(err.message === 'Not found account') {
        msg = 'Not found account';
        status = 'Upgate failed'

    }

    if (err.message === 'Email or password invalid') {
        msg = 'Email or password invalid';
        status = 'Login failed'
    }

    if(msg === '' | status === '') {
        msg = 'Something went wrong';
        status = 'Oops!';
    }

    res.status(400).send({
        status: status,
        error: msg
    });
}

exports.product = (err, res) => {
    let msg = 'Oops!';
    let status = 'Something went worng';
    console.log(err);

    if(err.message === 'Not found product') {
        msg: 'Not found product';
        status: 'Delete product falied'
    }

    res.status(400).send({
        status: status,
        message: msg
    });
}

exports.order = (err,res) => {
    let msg = 'Oops!';
    let status = 'Something went worng';
    console.log(err);

    if(err.message === 'Product are not enough') {
        status = 'Create order failed';
    }

    res.status(400).send({
        status: status,
        message: msg
    });


}