exports.seed = function (knex, Promise) {
  var tblName = 'sex';

  var rows = [
    { sex: 'Male' },
    { sex: 'Female' }
  ];

  return knex(tblName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tblName);
    });
};
