
const { Service } = require('egg');

/**
 * Test Service
 */
module.exports =  class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
   async sayHi(name ) {
    return `hi, ${name}`;
  }
}
