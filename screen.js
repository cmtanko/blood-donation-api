var screen = {
    clear: function () {
        process.stdout.write('\033c');
    },

    write: function (data, mode) {
        var output = data;
        if(mode ==='json'){
            output = JSON.stringify(data, null, 4);
        }

        console.log(output);
    }
};

module.exports = screen;