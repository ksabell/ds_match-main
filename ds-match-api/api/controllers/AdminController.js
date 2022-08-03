/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  login: async (req, res) => {
    try {

      if (!req.param('email')) return res.badRequest('Missing Parameter.');
      if (!req.param('password')) return res.badRequest('Missing Parameter.');

      // return res.set({
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      // }).json({ id: 9999 });

      return res.json({id: 99999})

      // let admin = await Admin.findOne({email: req.param('email').toLowerCase()});
      //
      // if (!admin) return res.notFound();
      //
      // await sails.helpers.passwords.checkPassword(req.param('password'), admin.encrypted_password).intercept('incorrect', 'badRequest');
      //
      // return res.json({id: admin.id});
    } catch (e) {
      sails.log.error('[AdminController][login]', e);
      return res.serverError();
    }
  }
};
