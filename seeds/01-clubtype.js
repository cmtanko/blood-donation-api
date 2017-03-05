exports.seed = function (knex, Promise) {
  var tblName = 'clubtype';

  var rows = [
    { clubtype: 'None' },
    { clubtype: 'Rotary' },
    { clubtype: 'Rotaract' },
    { clubtype: 'Lions' },
    { clubtype: 'Community' }
  ];

  return knex(tblName)
    .del()
    .then(function () {
      return knex.insert(rows).into(tblName);
    });
};
