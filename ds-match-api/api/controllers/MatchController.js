/**
 * MatchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const {query} = require('sails-mysql/helpers/private');

module.exports = {

  getAccountMatch: async (req, res) => {

    try {
      let accountMatch = await sails.sendNativeQuery('SELECT TOP 500 *  FROM [dbo].[Account_Match] order by MatchGroupID desc', []);

      return res.json(accountMatch.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getAccountMatch]', e);
      return res.serverError();
    }
  },

  getPrimaryDesc: async (req, res) => {
    try {
      let primaryDesc = await sails.sendNativeQuery('SELECT TOP 1 PrimaryProfile FROM [dbo].[Account_Match] ORDER BY [PrimaryProfile] desc', []);

      return res.json(primaryDesc.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getPrimaryDesc]', e);
      return res.serverError();

    }
  },

  updateAccountMatch: async (req, res) => {

    try {

      let querySet = [];
      let query = [];

      for (let i = 0; i < req.body.length; i++) {

        let query = `UPDATE [dbo].[Account_Match] SET `;
        let querySet = [];

        let ID = req.body[i].ID;
        let MatchGroupID = req.body[i].MatchGroupID;
        let PrimaryProfileID = req.body[i].PrimaryProfile;

        querySet.push(`MatchGroupID = ${MatchGroupID}`);
        querySet.push(`PrimaryProfile = ${PrimaryProfileID}`);
        query += querySet.join(', ');
        query += ` WHERE ID = '${ID}' ;`;
        await sails.sendNativeQuery(query, []);

        // let User = 'Keo/test';
        // let Action = 'Action/test';
        //
        // let query_log = `INSERT INTO [dbo].[Account_Match_Log]
        //            ([accountMatchId]
        //            ,[user]
        //            ,[action]
        //            ,[matchGroupId])
        //      VALUES
        //            ('${ID}'
        //            ,'${User}'
        //            ,'${Action}'
        //            ,'${MatchGroupID}')`;
        //
        // console.log(query_log);
        // await sails.sendNativeQuery(query_log, []);

      }
     // console.log('Accounts updated:', req.body.length);
      let accountMatch = await sails.sendNativeQuery('SELECT  *  FROM [dbo].[Account_Match] order by MatchGroupID desc', []);
      return res.json(accountMatch.recordset);


    } catch (e) {
      return res.serverError('[MATCH CONTROLLER][ERROR]' + e);
    }
  },

  removeMatch: async (req, res) => {

    try {

      let querySet = [];
      let query = [];

      for (let i = 0; i < req.body.length; i++) {

        let query = `UPDATE [dbo].[Account_Match] SET `;
        let querySet = [];

        let ID = req.body[i].ID;
        let MatchGroupID = null;
        let PrimaryProfileID = null;

        querySet.push(`MatchGroupID = ${MatchGroupID}`);
        querySet.push(`PrimaryProfile = ${PrimaryProfileID}`);
        query += querySet.join(', ');
        query += ` WHERE ID = '${ID}' ;`;
        await sails.sendNativeQuery(query, []);

        // let User = 'Keo/test';
        // let Action = 'Action/test';
        //
        // let query_log = `INSERT INTO [dbo].[Account_Match_Log]
        //            ([accountMatchId]
        //            ,[user]
        //            ,[action]
        //            ,[matchGroupId])
        //      VALUES
        //            ('${ID}'
        //            ,'${User}'
        //            ,'${Action}'
        //            ,'${MatchGroupID}')`;
        //
        // console.log(query_log);
        // await sails.sendNativeQuery(query_log, []);

      }

      let accountMatch = await sails.sendNativeQuery('SELECT  *  FROM [dbo].[Account_Match] order by MatchGroupID desc', []);
      return res.json(accountMatch.recordset);

    } catch (e) {
      return res.serverError('[MATCH CONTROLLER][ERROR]' + e);
    }
  },

  getMatchGroup: async (req, res) => {
    //console.log(req.body[0].MatchGroupID);

    let ID = req.body[0].MatchGroupID;

    try {
      let matchGroup = await sails.sendNativeQuery('SELECT  *  FROM [NedDev].[dbo].[Account_Match] \n' +
        ` WHERE MatchGroupID = '${ID}' ;`, []);
      return res.json(matchGroup.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getMatchGroup]', e);
      return res.serverError();

    }
  },

  getMatched: async (req, res) => {
    try {
      let matched = await sails.sendNativeQuery('SELECT  *  FROM [NedDev].[dbo].[Account_Match] \n' +
        'where PrimaryProfile != \'\' or MatchGroupID != \'\' \n' +
        'order by MatchGroupID desc', []);
      //console.log('getMatched');
      return res.json(matched.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getMatched]', e);
      return res.serverError();

    }
  },

  getNonMatch: async (req, res) => {
    try {
      let nonMatch = await sails.sendNativeQuery('SELECT  *  FROM [NedDev].[dbo].[Account_Match] \n' +
        'where PrimaryProfile != \'\' or PrimaryProfile IS NULL and MatchGroupID IS NULL \n' +
        'order by PrimaryProfile desc', []);
      //console.log('getNonMatch');
      return res.json(nonMatch.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getNonMatch]', e);
      return res.serverError();

    }
  },

  getNoMatch: async (req, res) => {
    try {
      let noMatch = await sails.sendNativeQuery('SELECT  *  FROM [NedDev].[dbo].[Account_Match] \n' +
        ' where PrimaryProfile = \'\' or MatchGroupID = \'\' and PrimaryProfile IS NULL or MatchGroupID IS NULL \n' +
        'order by PrimaryProfile desc', []);
      //console.log('noMatch.recordset');
      //console.log(noMatch.recordset);
      return res.json(noMatch.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getNoMatch]', e);
      return res.serverError();

    }
  },

  getPrimary: async (req, res) => {
    try {
      let primary = await sails.sendNativeQuery('SELECT  *  FROM [NedDev].[dbo].[Account_Match] \n' +
        ' where PrimaryProfile != \'\'', []);
      //console.log('getPrimary');
      return res.json(primary.recordset);

    } catch (e) {
      sails.log.error('[MatchController][getPrimary]', e);
      return res.serverError();

    }
  },

  selectedItemsMerge: async (req, res) => {
    //console.log(req.allParams());
    //console.log(req.param('PrimaryProfile'));

    try {
      let query = `SELECT  *  FROM [NedDev].[dbo].[Account_Match] where  MatchGroupID = `;
      query += req.param('PrimaryProfile');
      //console.log(query);
      let nonMatch = await sails.sendNativeQuery(query, []);
      //console.log(nonMatch);
      return res.json(nonMatch.recordset);

    } catch (e) {
      sails.log.error('[MatchController][selectedItemsMerge]', e);
      return res.serverError();

    }
  }

};
