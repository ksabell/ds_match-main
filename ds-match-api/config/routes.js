/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /login': 'AdminController.login',
  'POST /login': 'AdminController.login',
  'PUT /login': 'AdminController.login',

  'GET /accountMatch': 'MatchController.getAccountMatch',
  'GET /primaryDesc': 'MatchController.getPrimaryDesc',
  'GET /matched': 'MatchController.getMatched',
  'GET /nonMatch': 'MatchController.getNonMatch',
  'GET /primary': 'MatchController.getPrimary',
  'GET /noMatch': 'MatchController.getNoMatch',

  'POST /updateAccountMatch': 'MatchController.updateAccountMatch',
  'POST /selectedItemsMerge': 'MatchController.selectedItemsMerge',
  'POST /removeMatch': 'MatchController.removeMatch',

  'POST /matchgroup': 'MatchController.getMatchGroup'

};
