let sandbox = require('@architect/sandbox')
let test = require('tape')
let end

test('sandbox.start', async t=> {
  t.plan(1)
  await sandbox.start()
  t.ok(true, 'start the sandbox')
})

// your tests will go here
//http://localhost:3333
test( 'My first test', function( assert ) {
  assert.equal( 2, 2, 'Numbers 1 and 2 are the same' ) ;
  assert.end() ;
} ) ;

test('end', async t=> {
  t.plan(1)
  await sandbox.end()
  t.ok(true, 'shut down sandbox')
})