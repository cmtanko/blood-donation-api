exports.seed = function (knex, Promise) {
  var tblName = 'bloodgroup';

  var rows = [
    { bloodgroup: 'A+' },
    { bloodgroup: 'A-' },
    { bloodgroup: 'B+' },
    { bloodgroup: 'B-' },
    { bloodgroup: 'AB+' },
    { bloodgroup: 'AB-' },
    { bloodgroup: 'O+' },
    { bloodgroup: 'O-' }
  ];

  return knex(tblName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tblName);
    });
};
