import _ from 'lodash'
import { Client } from 'pg'

function sqlExceptionPretty(params: { sql: string; error: Error; values?: any[]}) {
  const { sql, error, values } = params

  let message = '' // '================== SQL ERROR ==================\n'
  message += error.message
  message += '\n=================  SQL  =================\n'
  message += sql

  if (!_.isEmpty(values)) {
    message += '\n================ VALUES ================\n'
    message += JSON.stringify(values)
  }

  message += '\n========================================\n'

  console.error(message)
}

function patchQuery(client: Client): void {
  const _query = client.query.bind(client)

  // @ts-ignore
  client.query = function (sql, values, cb) {
    if (_.isFunction(values)) {
      cb = values
      values = []
    }

    return new Promise((resolve, reject) => {
      _query(sql, values, (err, res) => {
        if (cb) cb(err, res)

        if (err) {
          sqlExceptionPretty({ sql, values, error: err })
          return reject(err)
        }

        resolve(res)
      })
    })
  }
}

export default {
  patchQuery,
}
