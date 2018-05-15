/*
 * Copyright 2017 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// require the composer module
const composer = require('mycomposer')

//define composition with managed_action
const composition = composer.sequence(
        composer.managed_action('compose-test/action_1'),
        composer.managed_action('compose-test/action_2'),
        composer.managed_action('compose-test/action_3')
        )

// instantiate OpenWhisk client
const wsk = composer.openwhisk({ ignore_certs: true })

// deploy composition
wsk.compositions.deploy(composer.composition('compose-test/compose_managed_functions', composition)).then(() => {console.log('deploy done');}) 


//customer code define function flow :

/*
const composition =  composer.if (
    	composer.managed_action('compose-test/action_1'),
    	composer.sequence(
    		composer.managed_action('compose-test/action_2'),
    		composer.managed_action('compose-test/action_3')
    	),
    	composer.managed_action('compose-test/action_4')
    )
*/

/*
const composition = composer.sequence(
        composer.managed_action('compose-test/action_1'),
        composer.managed_action('compose-test/action_2'),
        composer.managed_action('compose-test/action_3'),
)
*/

/*
will equal to :

const composition = composer.sequence(
    composer.try(
        composer.action('compose-test/action_1'),
        composer.action('compose-test/incidentErrorHandler')), 
    composer.try(
        composer.action('compose-test/action_2'),
        composer.action('compose-test/incidentErrorHandler'))
)

will be encoded into :
const composition = {
    "type": "sequence",
    "components": [{
        "type": "try",
        "body": {
            "type": "action",
            "name": "/_/compose-test/action_1"
        },
        "handler": {
            "type": "action",
            "name": "/_/compose-test/incidentErrorHandler"
        }
    }, {
        "type": "try",
        "body": {
            "type": "action",
            "name": "/_/compose-test/action_2"
        },
        "handler": {
            "type": "action",
            "name": "/_/compose-test/incidentErrorHandler"
        }
    }]
}
*/
/*
// define the composition
const composition = composer.sequence(
    composer.try(
        composer.action('compose-test/action_1'),
        composer.action('compose-test/errorhandler_1')), 
    composer.try(
        composer.action('compose-test/action_1'),
        composer.action('compose-test/errorhandler_1'))
)
*/



//wsk.compositions.deploy(composer.composition('compose-test/node-compose', composition)) // deploy composition
//    .then(() => wsk.actions.invoke({ name: 'compose-test/node-compose', params: { noerror: '1' }, blocking: true })) // invoke composition
//    .then(({ response }) => console.log(JSON.stringify(response.result, null, 4)), console.error)

//const obj = wsk.compositions.composer.encode(composer.composition('compose-test/compose_managed_actions', composition)) // deploy composition
//console.log(JSON.stringify(obj, null, 4));