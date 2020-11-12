export default {
  name: 'getPosts',
  request: '{{baseUrl}}/getPosts',
  event: [{
    listen: 'test',
    script: {
      type: 'text/javascript',
      exec: `
          pm.test("Status code is 200", () => {
            pm.expect(pm.response.code).to.eql(200);
          });          
        `,
    },
  }, {
    listen: 'test',
    script: {
      type: 'text/javascript',
      exec: `
          pm.test("Schema is valid", () => {   
            const schema = pm.collectionVariables.get("postSchema");
            pm.expect(tv4.validate(pm.response.json(), schema)).to.be.true;
          });          
        `,
    },
  }, {
    listen: 'test',
    script: {
      type: 'text/javascript',
      exec: `
        pm.test("Response is valid", () => {
          const ONE = 1
          pm.expect(pm.response.json()).to.have.length.gt(ONE)
        })      
        `,
    },
  }],
};
